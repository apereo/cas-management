package org.apereo.cas.mgmt.aggregator;

import net.shibboleth.metadata.Item;
import net.shibboleth.metadata.pipeline.Pipeline;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.w3c.dom.Element;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.LineNumberReader;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.HashMap;

import static java.util.stream.Collectors.toList;

/**
 * Created by tschmidt on 6/10/16.
 */
@Controller
public class AttributeFilterController {

    @Autowired
    @Qualifier("filter")
    Pipeline<Element> pipeline;

    @RequestMapping("/filter")
    public void Filter(final HttpServletResponse response) throws Exception {
        pipeline.execute(new ArrayList<Item<Element>>());
        FileUtils.sendFile(new File("/var/tmp/attribute-filter.xml"),response);
    }

    @RequestMapping("/filter/list")
    public void list(final HttpServletResponse response) throws Exception {
        JsonViewUtils.render(Files.list(new File("/ucd/local/shibboleth/attribute-filter").toPath())
                        .map(f -> {HashMap<String,String> map = new HashMap<>();
                                   map.put("name",f.getFileName().toString());
                                   return map;})
                        .collect(toList()),
                response);
    }

    @RequestMapping("/filter/read")
    public void read(final HttpServletResponse response, String file) throws Exception {
        FileUtils.sendFile(new File("/ucd/local/shibboleth/attribute-filter/"+file),response);
    }

    @RequestMapping(path="/filter/save", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void save(@RequestBody RPC rpc) throws Exception {
        File tmp = new File("/ucd/local/shibboleth/attribute-filter/"+rpc.name);
        tmp.createNewFile();
        FileWriter writer = new FileWriter(tmp);
        writer.write(rpc.file);
        writer.flush();
        writer.close();
    }
}
