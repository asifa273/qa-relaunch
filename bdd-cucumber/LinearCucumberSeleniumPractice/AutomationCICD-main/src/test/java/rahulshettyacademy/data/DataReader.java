package rahulshettyacademy.data;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class DataReader {

	public List<HashMap<String, String>> getJsonDataToMap() throws IOException {

		// read json to string
		String jsonContent = Files.readString(Paths.get(System.getProperty("user.dir"), "src", "test", "java",
				"rahulshettyacademy", "data", "PurchaseOrder.json"), StandardCharsets.UTF_8);

		// string to hashmap jackson databind
		ObjectMapper mapper = new ObjectMapper();
		List<HashMap<String, String>> data = mapper.readValue(jsonContent,
				new TypeReference<List<HashMap<String, String>>>() {});
		return data;

	}

}
