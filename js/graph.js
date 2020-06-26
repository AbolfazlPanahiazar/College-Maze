class Graph {
  constructor(numberOfVertices) {
    this.numberOfVertices = numberOfVertices;
    this.nodes = ["0"];
    this.AdjList = new Map();
  }
  addVertex(v) {
    this.nodes.push(v);
    this.AdjList.set(v, []);
  }
  addEdge(a, b) {
    this.AdjList.get(a).push(b);
    this.AdjList.get(b).push(a);
  }
  print() {
    const vertices = this.AdjList.keys();
    for (let vertex of vertices) {
      const edgesTo = this.AdjList.get(vertex);
      let conections = "";
      for (let item of edgesTo) {
        conections += item + " ";
      }
      console.log(conections);
    }
  }
}
