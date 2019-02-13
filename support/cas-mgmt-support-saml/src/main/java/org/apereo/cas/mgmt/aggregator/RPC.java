package org.apereo.cas.mgmt.aggregator;

import java.io.Serializable;

/**
 * Created by tschmidt on 6/27/16.
 */
public class RPC implements Serializable {
    public String name;
    public String file;

    public RPC() {

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }
}
