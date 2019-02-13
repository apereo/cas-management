package org.apereo.cas.mgmt.aggregator;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;

/**
 * Created by tschmidt on 6/13/16.
 */
@Controller
public class RelyingPartyController {

    @RequestMapping({"/relying","relying/read"})
    public void relying(final HttpServletResponse response) throws Exception {
        FileUtils.sendFile(new File("/ucd/local/shibboleth/relying-party/relying-party.xml"), response);
    }

    @RequestMapping(path="/relying/save", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void save(@RequestBody RPC rpc) throws Exception {
        File tmp = new File("/ucd/local/shibboleth/relying-party/relying-party.xml");
        tmp.createNewFile();
        FileWriter writer = new FileWriter(tmp);
        writer.write(rpc.file);
        writer.flush();
        writer.close();
    }
}
