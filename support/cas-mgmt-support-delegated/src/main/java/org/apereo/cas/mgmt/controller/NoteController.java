package org.apereo.cas.mgmt.controller;

import org.apereo.cas.mgmt.GitUtil;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.domain.CNote;
import org.apereo.cas.mgmt.factory.RepositoryFactory;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.val;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;

import java.util.Date;

/**
 * Controller for handling note requests.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@RestController("noteController")
@RequestMapping(path = "api/note", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor

public class NoteController {

    private final RepositoryFactory repositoryFactory;

    /**
     * Method will return all notes that have been added to a submit request.
     *
     * @param response - HttpServletResponse
     * @param id       - id of note
     */
    @GetMapping("/{id}")
    @SneakyThrows
    public void getNotes(final HttpServletResponse response, @PathVariable final String id) {
        try (GitUtil git = repositoryFactory.masterRepository()) {
            val note = git.note(id);
            if (note != null) {
                git.writeNote(note, response.getOutputStream());
            }
        }
    }

    /**
     * Method will add the supplied note from the client to the submit request in the repo.
     *
     * @param authentication - the user
     * @param cnote          - CNote
     */
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    @SneakyThrows
    public void addNote(final Authentication authentication,
                        @RequestBody final CNote cnote) {
        val user = CasUserProfile.from(authentication);
        try (GitUtil git = repositoryFactory.masterRepository()) {
            val com = git.getCommit(cnote.getId());
            val msg = user.getId() + " - " + new Date() + " : \n    "
                      + cnote.getText().replaceAll("\\n", "\n    ");
            git.appendNote(com, msg);
        }
    }
}
