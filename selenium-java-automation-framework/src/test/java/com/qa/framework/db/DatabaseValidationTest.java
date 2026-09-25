package com.qa.framework.db;

import com.qa.framework.utils.DBUtils;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.util.List;
import java.util.Map;

/**
 * Backend data-integrity checks. Runs against in-memory H2 so it works on any machine;
 * point db.url at MySQL/Postgres and the same SQL runs unchanged.
 *
 * The story to tell in interview: UI says the order was placed, API returned 200 -
 * but did the row actually land in the DB with the right status and amount? That gap
 * is where real defects hide, and it is why the JD asks for SQL.
 */
public class DatabaseValidationTest {

    @BeforeClass(alwaysRun = true)
    public void seedSchema() {
        DBUtils.update("DROP TABLE IF EXISTS order_items");
        DBUtils.update("DROP TABLE IF EXISTS orders");
        DBUtils.update("DROP TABLE IF EXISTS customers");

        DBUtils.update("""
                CREATE TABLE customers (
                  customer_id INT PRIMARY KEY,
                  email       VARCHAR(120) NOT NULL UNIQUE,
                  full_name   VARCHAR(120) NOT NULL,
                  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP)""");

        DBUtils.update("""
                CREATE TABLE orders (
                  order_id    INT PRIMARY KEY,
                  customer_id INT NOT NULL REFERENCES customers(customer_id),
                  status      VARCHAR(20) NOT NULL,
                  total_amount DECIMAL(10,2) NOT NULL)""");

        DBUtils.update("""
                CREATE TABLE order_items (
                  item_id   INT PRIMARY KEY,
                  order_id  INT NOT NULL REFERENCES orders(order_id),
                  product   VARCHAR(80) NOT NULL,
                  qty       INT NOT NULL,
                  unit_price DECIMAL(10,2) NOT NULL)""");

        DBUtils.update("INSERT INTO customers VALUES (1,'priya@test.com','Priya Sharma',CURRENT_TIMESTAMP)");
        DBUtils.update("INSERT INTO customers VALUES (2,'raj@test.com','Raj Kumar',CURRENT_TIMESTAMP)");
        DBUtils.update("INSERT INTO orders VALUES (1001,1,'CONFIRMED',45.97)");
        DBUtils.update("INSERT INTO orders VALUES (1002,2,'PENDING',9.99)");
        DBUtils.update("INSERT INTO order_items VALUES (1,1001,'Sauce Labs Backpack',1,29.99)");
        DBUtils.update("INSERT INTO order_items VALUES (2,1001,'Sauce Labs Bike Light',1,9.99)");
        DBUtils.update("INSERT INTO order_items VALUES (3,1001,'Sauce Labs Onesie',1,5.99)");
        DBUtils.update("INSERT INTO order_items VALUES (4,1002,'Sauce Labs Bike Light',1,9.99)");
    }

    @Test(groups = {"db", "regression"}, description = "DB-01 Order row exists with correct status")
    public void orderIsPersistedWithCorrectStatus() {
        List<Map<String, Object>> rows = DBUtils.query(
                "SELECT status, total_amount FROM orders WHERE order_id = ?", 1001);

        Assert.assertEquals(rows.size(), 1, "Expected exactly one order row");
        Assert.assertEquals(rows.get(0).get("STATUS"), "CONFIRMED");
    }

    /** JOIN + aggregate: header total must equal the sum of its line items. */
    @Test(groups = {"db", "regression"}, description = "DB-02 Order total matches sum of line items")
    public void orderTotalMatchesLineItems() {
        Object lineSum = DBUtils.scalar("""
                SELECT SUM(qty * unit_price)
                FROM order_items
                WHERE order_id = ?""", 1001);

        Object header = DBUtils.scalar("SELECT total_amount FROM orders WHERE order_id = ?", 1001);

        Assert.assertEquals(
                Double.parseDouble(lineSum.toString()),
                Double.parseDouble(header.toString()),
                0.01,
                "Order header total does not match its line items - data integrity defect");
    }

    /** Orphan check: every order must point at a real customer. */
    @Test(groups = "db", description = "DB-03 No orphaned orders")
    public void noOrphanedOrders() {
        Object orphans = DBUtils.scalar("""
                SELECT COUNT(*)
                FROM orders o
                LEFT JOIN customers c ON o.customer_id = c.customer_id
                WHERE c.customer_id IS NULL""");

        Assert.assertEquals(Integer.parseInt(orphans.toString()), 0, "Found orphaned orders");
    }

    /** Duplicate detection with GROUP BY / HAVING - a guaranteed SQL interview question. */
    @Test(groups = "db", description = "DB-04 No duplicate customer emails")
    public void noDuplicateEmails() {
        List<Map<String, Object>> dupes = DBUtils.query("""
                SELECT email, COUNT(*) AS cnt
                FROM customers
                GROUP BY email
                HAVING COUNT(*) > 1""");

        Assert.assertTrue(dupes.isEmpty(), "Duplicate emails found: " + dupes);
    }

    /** Second-highest value without LIMIT - the classic whiteboard question. */
    @Test(groups = "db", description = "DB-05 Second highest order value query")
    public void secondHighestOrderValue() {
        Object second = DBUtils.scalar("""
                SELECT MAX(total_amount)
                FROM orders
                WHERE total_amount < (SELECT MAX(total_amount) FROM orders)""");

        Assert.assertEquals(Double.parseDouble(second.toString()), 9.99, 0.01);
    }
}
