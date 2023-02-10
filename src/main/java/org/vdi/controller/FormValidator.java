package org.vdi.controller;

import javax.validation.ConstraintViolation;
import java.util.Set;
import java.util.stream.Collectors;

public class FormValidator {

    private String message;
    private boolean succes;

    public FormValidator(String message) {
        this.message = message;
        this.succes = true;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSucces() {
        return succes;
    }

    public void setSucces(boolean succes) {
        this.succes = succes;
    }

    FormValidator(Set<? extends ConstraintViolation<?>> violations) {
        this.succes = false;
        this.message = violations.stream().map(cv -> cv.getMessage()).collect(Collectors.joining(", "));
    }
}
