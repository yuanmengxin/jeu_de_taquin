package insa.rennes.web2;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
class ListController {
    ListController() { }
    int[][] res = new int[][] { { 1, 2, 3, 4 }, { 5, 6, 1, 5 }, { 6, 4, 0, 4 }, { 6, 1, 3, 2 } };
    int[][] res1 = new int[][] { { 1, 6, 3 }, { 2, 3, 2 } };
    int[][] res2 = new int[][] { { 2, 3, 2 }, { 1, 6, 3 } };
    String[] list = new String[] { "grid1", "grid2" };
    String[][] r1 = { { "cheater1", "10" }, { "cheater2", "20" }, { "cheater3", "30" }, { "cheater4", "40" }, { "cheater5", "50" } };
    String[][] r2 = { { "cheater1", "5" }, { "cheater2", "15" }, { "cheater3", "25" }, { "cheater4", "35" }, { "cheater5", "45" } };


    @GetMapping("api/motif1")
    public int[][] getMotif1() {
        return res1;
    }

    @GetMapping("api/motif2")
    public int[][] getMotif2() {
        return res2;
    }

    @GetMapping("api/rank1")
    public String[][] getrank1() {
        return r1;
    }

    @GetMapping("api/rank2")
    public String[][] getrank2() {
        return r2;
    }

    @GetMapping("api/grid")
    public int[][] getGrid() {
        return res;
    }

    @GetMapping("api/gridlist")
    public String[] getlist() {
        return list;
    }
}
