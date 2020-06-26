// ********** Every node class **********
class Node {
  constructor(number, kind) {
    this.number = number;
    this.kind = kind;
  }
}

// Make maze and add vertices
const maze = new Graph(81);
for (let i = 1; i <= 81; i++) {
  maze.addVertex(new Node(i, "none"));
}

//********** File reader section **********
document.getElementById("fileInput").addEventListener("change", function () {
  var fr = new FileReader();
  fr.onload = function () {
    let inFile = fr.result;
    inFile = inFile.replace(/\r?\n|/g, "");
    inFile = inFile.split("");
    inFile.unshift("0");
    // Add kinds
    for (let i = 1; i <= 81; i++) {
      maze.nodes[i].kind = inFile[i];
    }
  };
  fr.readAsText(this.files[0]);
});
