package org.apereo.cas.mgmt.services.web;

import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.util.DefaultRegisteredServiceJsonSerializer;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
public class RegisterController {

    private static final String STATUS = "status";

    /**
     * Mapped method to return the manage.html.
     *
     * @param response - HttpServletResponse
     * @return - ModelAndView
     */
    @GetMapping("/register.html")
    public ModelAndView manage(final HttpServletResponse response) {
        System.out.println("********** In Register Controller ***********");
        final Map<String, Object> model = new HashMap<>();
        model.put(STATUS, HttpServletResponse.SC_OK);
        return new ModelAndView("register", model);
    }

    @PostMapping(value="submit", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> submit(final HttpServletResponse response,
                                         final HttpServletRequest request,
                                         @RequestBody final RegisteredService service) throws Exception {
        DefaultRegisteredServiceJsonSerializer serializer = new DefaultRegisteredServiceJsonSerializer();
        serializer.to(new File("/ucd/local/cas-mgmt-5.2/submitted/service-"+new Date().getTime()+".json"), service);
        return new ResponseEntity<>("Service submitted", HttpStatus.OK);
    }
}
