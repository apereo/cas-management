package org.apereo.cas.mgmt;

import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.domain.RegisteredServiceItem;
import org.apereo.cas.mgmt.util.CasManagementUtils;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.commons.lang3.tuple.Triple;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.LongPoint;
import org.apache.lucene.document.StringField;
import org.apache.lucene.document.TextField;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.BooleanQuery;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.PhraseQuery;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.RegexpQuery;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TermQuery;
import org.apache.lucene.search.TermRangeQuery;
import org.apache.lucene.search.WildcardQuery;
import org.apache.lucene.store.MMapDirectory;
import org.hjson.JsonObject;
import org.hjson.JsonType;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.EnumSet;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Class that allows full text search of services using Apache Lucene.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Slf4j
@RequiredArgsConstructor
@RestController("casSearchController")
@RequestMapping(path = "api/search", produces = MediaType.APPLICATION_JSON_VALUE)
public class LuceneSearch {

    private static final int MAX_RESULTS = 1000;

    private final MgmtManagerFactory mgmtManagerFactory;
    private final CasUserProfileFactory casUserProfileFactory;
    private final CasManagementConfigurationProperties managementProperties;

    /**
     * Searches the current state of the the accessible services to a user from a query string.
     *
     * @param request - the request
     * @param response - the response
     * @param queryString - the query
     * @return - List of RegisteredServiceItem
     * @throws Exception - failed
     */
    @PostMapping
    public List<RegisteredServiceItem> search(final HttpServletRequest request,
                                              final HttpServletResponse response,
                                              final @RequestBody String queryString) throws Exception{
        val casUserProfile = casUserProfileFactory.from(request, response);
        val analyzer = new StandardAnalyzer();
        val query = new QueryParser("body", analyzer).parse(queryString);
        val fields = getFields(query, new ArrayList<String>());
        val manager = (ManagementServicesManager) mgmtManagerFactory.from(request, response);
        val memoryIndex = new MMapDirectory(Paths.get(managementProperties.getLuceneIndexDir() + "/" + casUserProfile.getUsername()));
        val docs = manager.getAllServices().stream()
                .filter(casUserProfile::hasPermission)
                .map(CasManagementUtils::toJson)
                .map(JsonObject::readHjson)
                .map(r -> createDocument(r.asObject(), fields))
                .collect(Collectors.toList());
        writeDocs(analyzer, memoryIndex, docs);
        val results = results(memoryIndex, query).stream()
                .map(d -> d.getField("id"))
                .map(id -> manager.findServiceBy(Long.parseLong(id.stringValue())))
                .map(manager::createServiceItem)
                .collect(Collectors.toList());
        FileUtils.deleteDirectory(memoryIndex.getDirectory().toFile());
        return results;
    }

    /**
     * Creates a {@link Document} to add to the directory for searching.
     *
     * @param json - service as json
     * @param fields - list of fields parsed from query string.
     * @return - the document
     */
    private Document createDocument(final JsonObject json, final ArrayList<String> fields) {
        val document = new Document();
        val id = json.asObject().getLong("id", -1);
        fields.stream()
                .map(f -> createTriple(json.asObject(), f))
                .flatMap(t -> createFields(t).stream())
                .forEach(document::add);
        if (fields.contains("body")) {
            document.add(new TextField("body", json.toString(), Field.Store.NO));
        }
        document.add(new StringField("id", String.valueOf(id), Field.Store.YES));
        return document;
    }

    /**
     * Creates list of {@link Field} to be indexed and added to a {@link Document} from the passed
     * Triple representing a parsed query clause.
     *    left = JsonType - Object type of value in service
     *    middle = Object - value of the field extracted from json.
     *    right - String - field key
     *
     * @param triple - the triple
     * @return - List of Field
     */
    private ArrayList<Field> createFields(final Triple<JsonType, Object, String> triple) {
        val field = triple.getRight();
        val type = triple.getLeft();
        val value = triple.getMiddle();
        val fields = new ArrayList<Field>();
        if (!"body".equals(field)) {
            if (type == JsonType.NUMBER) {
                fields.add(new LongPoint(field, ((Long) value).longValue()));
                fields.add(new StringField(field, String.valueOf(value), Field.Store.NO));
            }
            if (EnumSet.of(JsonType.ARRAY, JsonType.OBJECT, JsonType.BOOLEAN).contains(type)) {
                fields.add(new TextField(field, (String) value, Field.Store.NO));
            }
            if (type == JsonType.STRING) {
                if (field.endsWith("-reg")) {
                    fields.add(new StringField(field.replace("-reg", ""), (String) value, Field.Store.NO));
                } else {
                    fields.add(new TextField(field, (String) value, Field.Store.NO));
                }
            }
        }
        return fields;
    }

    /**
     * Writes the list of {@link Document} to the index for searching.
     *
     * @param analyzer - the analyzer
     * @param memoryIndex - the directory
     * @param docs - List of Document
     */
    @SneakyThrows
    private void writeDocs(final StandardAnalyzer analyzer, final MMapDirectory memoryIndex, final List<Document> docs) {
        val indexWriterConfig = new IndexWriterConfig(analyzer);
        val writer = new IndexWriter(memoryIndex, indexWriterConfig);
        writer.deleteAll();
        for (val doc : docs) {
            writer.addDocument(doc);
        }
        writer.close();
    }

    /**
     * Performs the search of the directory with the passed query and returns a list of {@link Document} representing the
     * results of the search.
     *
     * @param memoryIndex - the Directory
     * @param query - the query
     * @return -List of Document
     */
    @SneakyThrows
    private List<Document> results(final MMapDirectory memoryIndex, final Query query) {
        val indexReader = DirectoryReader.open(memoryIndex);
        val searcher = new IndexSearcher(indexReader);
        return Arrays.stream(searcher.search(query, MAX_RESULTS).scoreDocs)
                .map(s -> pullDoc(searcher, s))
                .collect(Collectors.toList());
    }

    /**
     * Wrapper method that catches exception for pulling {@link Document} from searcher.
     *
     * @param searcher - the searcher
     * @param scoreDoc - the scoredoc
     * @return - Document
     */
    private Document pullDoc(final IndexSearcher searcher, final ScoreDoc scoreDoc) {
        try {
            return searcher.doc(scoreDoc.doc);
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
            return null;
        }
    }

    /**
     * Returns a list of fields to be searched from the parsed query.  Method called recursively if a top level
     * {@link BooleanQuery} is used.
     *
     * @param query - the parsed query
     * @param fields - list to hold fields
     * @return - List of Field
     */
    private ArrayList<String> getFields(final Query query, final ArrayList<String> fields) {
        if (query instanceof BooleanQuery) {
            ((BooleanQuery) query).clauses().forEach(c -> getFields(c.getQuery(), fields));
        }
        if (query instanceof WildcardQuery) {
            fields.add(((WildcardQuery) query).getTerm().field());
            return fields;
        }
        if (query instanceof RegexpQuery) {
            fields.add(((RegexpQuery) query).getField() + "-reg");
            return fields;
        }
        if (query instanceof TermQuery) {
            fields.add(((TermQuery) query).getTerm().field());
            return fields;
        }
        if (query instanceof PhraseQuery) {
            Stream.of(((PhraseQuery) query).getTerms()).forEach(t -> fields.add(t.field()));
            return fields;
        }
        if (query instanceof TermRangeQuery) {
            fields.add(((TermRangeQuery) query).getField());
            return fields;
        }
        return fields;
    }

    /**
     * Wrapper method to create a Triple describing a query clause.
     *
     * @param json - the JsonObject
     * @param field - field key
     * @return - Triple
     */
    private Triple<JsonType, Object, String> createTriple(final JsonObject json, final String field) {
        val pair = getValue(json, field);
        return Triple.of(pair.getLeft(), pair.getRight(), field);
    }

    /**
     * Extracts the value to be searched from the json based on the field key.  The method is called recursively in the
     * case of fields that are nested in json objects.
     *
     * @param json - the json
     * @param field - the field key
     * @return - Pair representing object type and value
     */
    private Pair<JsonType, Object> getValue(final JsonObject json, final String field) {
        val period = field.indexOf('.');
        if (period > -1) {
            val nextObj = json.get(field.substring(0, period)).asObject();
            val nextField = field.substring(period + 1);
            return getValue(nextObj, nextField);
        }
        val tfield = field.replace("-reg", "");
        val myVal = json.get(tfield);
        val type = myVal != null ? myVal.getType() : null;
        if (type == null) {
            return Pair.of(JsonType.NULL, null);
        }
        if (type == JsonType.STRING) {
            return Pair.of(JsonType.STRING, json.getString(tfield, ""));
        }
        if (type == JsonType.BOOLEAN) {
            return Pair.of(JsonType.BOOLEAN, String.valueOf(json.getBoolean(tfield, false)));
        }
        if (type == JsonType.NUMBER) {
            return Pair.of(JsonType.NUMBER, json.getLong(tfield, 0));
        }
        if (type == JsonType.ARRAY) {
            return Pair.of(JsonType.ARRAY, json.get(tfield).asArray().toString());
        }
        if (type == JsonType.OBJECT) {
            return Pair.of(JsonType.OBJECT, json.get(tfield).toString());
        }
        return Pair.of(JsonType.DSF, json.get(tfield));
    }
}
