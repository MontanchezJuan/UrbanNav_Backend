package com.urbanNav.security.Models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document()
public class Permission {
    @Id
    private String _id;
    private String route;
    private String method;
    private String description;

    public Permission() {
    }

    public Permission(String route, String method, String description) {
        this.route = route;
        this.method = method;
        this.description = description;
    }

    public String get_id() {
        return _id;
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
