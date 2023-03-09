package org.vdi;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;

@QuarkusTest
public class TestAccueil {

    @Test
    public void testAccueilEndpoint() {
        given()
                .when().get("/accueil")
                .then()
                .statusCode(200);
    }

    @Test
    public void testAccueilTable() {
        given()
                .when().get("/accueil/accueiltable")
                .then()
                .statusCode(200);
    }
}
