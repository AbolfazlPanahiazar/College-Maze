// ********** Every node class **********
class Node {
  constructor(number, kind) {
    this.number = number;
    this.kind = kind;
  }
}

// Make table and add vertices
const table = new Graph(81);
for (let i = 1; i <= 81; i++) {
  table.addVertex(new Node(i, "none"));
}

// ********** File reader section **********
document.getElementById("fileInput").addEventListener("change", function () {
  var fr = new FileReader();
  fr.onload = function () {
    console.log(fr.result);
  };

  fr.readAsText(this.files[0]);
});

console.log(table);
