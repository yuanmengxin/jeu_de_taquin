package insa.rennes.web2;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;


@AutoConfigureMockMvc
@SpringBootTest
class Web2ApplicationTests {

	@Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

	@Test
	void contextLoads() {
	}



    @Test
    void testGetMotif1() throws Exception {
        int[][] expectedResponse = { { 1, 6, 3 }, { 2, 3, 2 } };
        mockMvc.perform(get("/api/motif1"))
               .andExpect(status().isOk())
               .andExpect(content().json(objectMapper.writeValueAsString(expectedResponse)));
    }

    @Test
    void testGetMotif2() throws Exception {
        int[][] expectedResponse = { { 2, 3, 2 }, { 1, 6, 3 } };
        mockMvc.perform(get("/api/motif2"))
               .andExpect(status().isOk())
               .andExpect(content().json(objectMapper.writeValueAsString(expectedResponse)));
    }

    @Test
    void testGetRank1() throws Exception {
        String[][] expectedResponse = {
            { "cheater1", "10" }, { "cheater2", "20" }, 
            { "cheater3", "30" }, { "cheater4", "40" }, 
            { "cheater5", "50" }
        };
        mockMvc.perform(get("/api/rank1"))
               .andExpect(status().isOk())
               .andExpect(content().json(objectMapper.writeValueAsString(expectedResponse)));
    }

    @Test
    void testGetRank2() throws Exception {
        String[][] expectedResponse = {
            { "cheater1", "5" }, { "cheater2", "15" }, 
            { "cheater3", "25" }, { "cheater4", "35" }, 
            { "cheater5", "45" }
        };
        mockMvc.perform(get("/api/rank2"))
               .andExpect(status().isOk())
               .andExpect(content().json(objectMapper.writeValueAsString(expectedResponse)));
    }

    @Test
    void testGetGrid() throws Exception {
        int[][] expectedResponse = { { 1, 2, 3, 4 }, { 5, 6, 1, 5 }, { 6, 4, 0, 4 }, { 6, 1, 3, 2 } };
        mockMvc.perform(get("/api/grid"))
               .andExpect(status().isOk())
               .andExpect(content().json(objectMapper.writeValueAsString(expectedResponse)));
    }

    @Test
    void testGetGridList() throws Exception {
        String[] expectedResponse = { "grid1", "grid2" };
        mockMvc.perform(get("/api/gridlist"))
               .andExpect(status().isOk())
               .andExpect(content().json(objectMapper.writeValueAsString(expectedResponse)));
    }

}
