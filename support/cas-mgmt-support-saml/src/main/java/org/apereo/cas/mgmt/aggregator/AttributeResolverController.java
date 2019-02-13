package org.apereo.cas.mgmt.aggregator;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.file.Files;

/**
 * Created by tschmidt on 6/10/16.
 */
@Controller
public class AttributeResolverController {

    @RequestMapping({"/resolver","/resolver/read"})
    public void Resolver(final HttpServletResponse response) throws Exception {
        FileUtils.sendFile(new File("/ucd/local/shibboleth/attribute-resolver/attribute-resolver.xml"),response);
    }

    @RequestMapping(path="/resolver/save", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void save(@RequestBody RPC rpc) throws Exception {
        File tmp = new File("/ucd/local/shibboleth/attribute-resolver/"+rpc.name);
        tmp.createNewFile();
        FileWriter writer = new FileWriter(tmp);
        writer.write(rpc.file);
        writer.flush();
        writer.close();
    }

}
