package org.vdi;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;

@QuarkusTest
public class TestIncident {
    @Test
    public void testGetAllIncidents() {
        given()
                .when().get("/incidents")
                .then()
                .statusCode(200);
    }
    @Test
    public void testGetReseauForm() {
        given()
                .when().get("/incidents/reseau")
                .then()
                .statusCode(200);
    }
    @Test
    public void testGetServiceForm() {
        given()
                .when().get("/incidents/service")
                .then()
                .statusCode(200);
    }
}
