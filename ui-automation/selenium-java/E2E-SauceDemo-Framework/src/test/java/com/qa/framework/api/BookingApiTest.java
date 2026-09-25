package com.qa.framework.api;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.util.Map;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

/**
 * API layer against https://restful-booker.herokuapp.com (free public practice API,
 * same CRUD shape as Postman collections you would build at work).
 *
 * Postman is for exploratory and manual API checks; RestAssured covers the automated
 * regression that runs in CI. They are complementary.
 *
 * dependsOnMethods enforces the CRUD order: create -> read -> update -> delete.
 */
public class BookingApiTest {

    private static final String BASE = "https://restful-booker.herokuapp.com";
    private String token;
    private int bookingId;

    @BeforeClass(alwaysRun = true)
    public void setup() {
        RestAssured.baseURI = BASE;
    }

    @Test(groups = {"api", "smoke"}, description = "API-01 Auth returns a token")
    public void createToken() {
        token = given()
                .contentType(ContentType.JSON)
                .body(Map.of("username", "admin", "password", "password123"))
        .when()
                .post("/auth")
        .then()
                .statusCode(200)
                .time(lessThan(5000L))                 // basic performance assertion
                .body("token", notNullValue())
                .extract().path("token");

        Assert.assertFalse(token.isBlank(), "Token was empty");
    }

    @Test(groups = {"api", "smoke"}, dependsOnMethods = "createToken",
          description = "API-02 POST /booking creates a booking and echoes the payload")
    public void createBooking() {
        Map<String, Object> payload = Map.of(
                "firstname", "Priya",
                "lastname", "Sharma",
                "totalprice", 450,
                "depositpaid", true,
                "bookingdates", Map.of("checkin", "2026-01-10", "checkout", "2026-01-15"),
                "additionalneeds", "Breakfast");

        Response response = given()
                .contentType(ContentType.JSON)
                .body(payload)
        .when()
                .post("/booking")
        .then()
                .statusCode(200)
                .body("bookingid", notNullValue())
                .body("booking.firstname", equalTo("Priya"))
                .body("booking.totalprice", equalTo(450))
                .body("booking.bookingdates.checkin", equalTo("2026-01-10"))
                .extract().response();

        bookingId = response.path("bookingid");
    }

    @Test(groups = "api", dependsOnMethods = "createBooking",
          description = "API-03 GET /booking/{id} returns the created record")
    public void getBooking() {
        given()
                .pathParam("id", bookingId)
        .when()
                .get("/booking/{id}")
        .then()
                .statusCode(200)
                .body("firstname", equalTo("Priya"))
                .body("depositpaid", equalTo(true));
    }

    @Test(groups = "api", dependsOnMethods = "createBooking",
          description = "API-04 PUT /booking/{id} updates the record (auth required)")
    public void updateBooking() {
        given()
                .contentType(ContentType.JSON)
                .header("Cookie", "token=" + token)
                .pathParam("id", bookingId)
                .body(Map.of(
                        "firstname", "Priya",
                        "lastname", "Verma",
                        "totalprice", 600,
                        "depositpaid", false,
                        "bookingdates", Map.of("checkin", "2026-01-10", "checkout", "2026-01-18")))
        .when()
                .put("/booking/{id}")
        .then()
                .statusCode(200)
                .body("lastname", equalTo("Verma"))
                .body("totalprice", equalTo(600));
    }

    @Test(groups = "api", dependsOnMethods = "updateBooking",
          description = "API-05 Negative: update without auth is rejected with 403")
    public void updateWithoutTokenIsForbidden() {
        given()
                .contentType(ContentType.JSON)
                .pathParam("id", bookingId)
                .body(Map.of("firstname", "Hacker", "lastname", "X", "totalprice", 1,
                        "depositpaid", false,
                        "bookingdates", Map.of("checkin", "2026-01-10", "checkout", "2026-01-11")))
        .when()
                .put("/booking/{id}")
        .then()
                .statusCode(403);
    }

    @Test(groups = "api", dependsOnMethods = "updateWithoutTokenIsForbidden",
          description = "API-06 DELETE removes the booking and GET then 404s")
    public void deleteBooking() {
        given()
                .header("Cookie", "token=" + token)
                .pathParam("id", bookingId)
        .when()
                .delete("/booking/{id}")
        .then()
                .statusCode(201);   // restful-booker quirk: 201 on delete

        given().pathParam("id", bookingId)
        .when().get("/booking/{id}")
        .then().statusCode(404);
    }
}
