package org.vdi.idgenerator;

import java.io.Serializable;

public class CustomId implements Serializable {
    private String prefix;
    private int number;

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }
}
