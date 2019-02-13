package org.apereo.cas.mgmt.aggregator;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.PrintWriter;
import java.nio.file.Files;

/**
 * Created by tschmidt on 6/17/16.
 */
public class FileUtils {

    public static void sendFile(final File out, final HttpServletResponse response) throws Exception {
        PrintWriter writer = response.getWriter();
        Files.lines(out.toPath()).forEach(l -> writer.write(l+"\n"));
        response.setStatus(HttpServletResponse.SC_OK);
        response.setDateHeader("Last-Modified",out.lastModified());
    }
}
