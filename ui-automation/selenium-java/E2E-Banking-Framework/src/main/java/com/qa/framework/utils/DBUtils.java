package com.qa.framework.utils;

import com.qa.framework.config.ConfigReader;

import java.sql.*;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * JDBC helper for database validation - the JD line "Perform database validation by
 * writing and executing SQL queries to ensure data integrity."
 *
 * try-with-resources closes Connection/Statement/ResultSet automatically. Leaking
 * connections in a long CI run will exhaust the pool; interviewers do ask.
 */
public final class DBUtils {

    private DBUtils() { }

    public static Connection connect() throws SQLException {
        return DriverManager.getConnection(
                ConfigReader.get("db.url", "jdbc:h2:mem:qadb;DB_CLOSE_DELAY=-1"),
                ConfigReader.get("db.user", "sa"),
                ConfigReader.get("db.password", ""));
    }

    /** Returns rows as a list of column->value maps. Good enough for assertions. */
    public static List<Map<String, Object>> query(String sql, Object... params) {
        List<Map<String, Object>> rows = new ArrayList<>();
        try (Connection conn = connect();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            bind(ps, params);
            try (ResultSet rs = ps.executeQuery()) {
                ResultSetMetaData meta = rs.getMetaData();
                int cols = meta.getColumnCount();
                while (rs.next()) {
                    Map<String, Object> row = new LinkedHashMap<>();
                    for (int i = 1; i <= cols; i++) {
                        row.put(meta.getColumnLabel(i).toUpperCase(), rs.getObject(i));
                    }
                    rows.add(row);
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Query failed: " + sql, e);
        }
        return rows;
    }

    public static Object scalar(String sql, Object... params) {
        List<Map<String, Object>> rows = query(sql, params);
        if (rows.isEmpty()) return null;
        return rows.get(0).values().iterator().next();
    }

    public static int update(String sql, Object... params) {
        try (Connection conn = connect();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            bind(ps, params);
            return ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Update failed: " + sql, e);
        }
    }

    /** PreparedStatement + bound params, never string concatenation - SQL injection safe. */
    private static void bind(PreparedStatement ps, Object... params) throws SQLException {
        for (int i = 0; i < params.length; i++) {
            ps.setObject(i + 1, params[i]);
        }
    }
}
