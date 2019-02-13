package org.apereo.cas.mgmt.aggregator;

import net.shibboleth.metadata.Item;
import net.shibboleth.metadata.pipeline.Pipeline;
import org.apache.http.*;
import org.apache.http.params.HttpParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.expression.ExpressionException;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.w3c.dom.Element;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URL;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;

import org.json.JSONArray;
import org.json.JSONObject;

import static java.util.stream.Collectors.toList;

import static java.util.Arrays.asList;

/**
 * Created by tschmidt on 5/13/16.
 */
@Controller
public class MetadataController {

    @Autowired
    @Qualifier("metadata")
    Pipeline<Element> pipeline;

    @RequestMapping("/metadata")
    public void metadata(final HttpServletResponse response) throws Exception {
        pipeline.execute(new ArrayList<Item<Element>>());
        FileUtils.sendFile(new File("/var/tmp/metadata.xml"),response);
    }

    @RequestMapping("/metadata/list")
    public void list(final HttpServletResponse response) throws Exception {
        JsonViewUtils.render(Files.list(new File("/ucd/local/shibboleth/metadata").toPath())
                                  .map(f -> {HashMap<String,String> map = new HashMap<String,String>();
                                             map.put("name",f.getFileName().toString());
                                             return map;})
                                  .collect(toList()),
                             response);

    }

    @RequestMapping("/metadata/read")
    public void read(final HttpServletResponse response, String file) throws Exception {
        FileUtils.sendFile(new File("/ucd/local/shibboleth/metadata/"+file),response);
    }

    @RequestMapping("/metadata/retrieve")
    public void retrieve(final HttpServletResponse response, String spUrl) throws Exception {
        URL url = new URL(spUrl);
        BufferedReader in = new BufferedReader(
                new InputStreamReader(url.openStream()));

        PrintWriter writer = response.getWriter();
        in.lines().forEach(l -> writer.write(l + "\n"));
        in.close();
        response.setStatus(HttpServletResponse.SC_OK);
        writer.flush();
        writer.close();
    }

    @RequestMapping(path="/metadata/save", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void save(final HttpServletResponse response, @RequestBody RPC rpc) throws Exception {
        File tmp = new File("/ucd/local/shibboleth/metadata/"+rpc.name);
        tmp.createNewFile();
        FileWriter writer = new FileWriter(tmp);
        writer.write(rpc.file);
        writer.flush();
        writer.close();
        response.setStatus(HttpServletResponse.SC_OK);
    }

    private class Metadata {
        String name;

        public Metadata(String name) {
            this.name = name;
        }
    }
 }
