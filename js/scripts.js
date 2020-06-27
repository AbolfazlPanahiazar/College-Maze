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
    // Add edges
    for (let i = 1; i <= 81; i++) {
      if (maze.nodes[i].kind != "#") {
        if (i == 1) {
          if (maze.nodes[i + 1].kind != "#") maze.addEdge(maze.nodes[i], maze.nodes[i + 1]);
          if (maze.nodes[i + 9].kind != "#") maze.addEdge(maze.nodes[i], maze.nodes[i + 9]);
        } else if (i >= 2 && i <= 8) {
          // if (maze.nodes[i - 1].kind != "#") maze.addEdge(maze.nodes[i], maze.nodes[i - 1]);
          if (maze.nodes[i + 1].kind != "#") maze.addEdge(maze.nodes[i], maze.nodes[i + 1]);
          if (maze.nodes[i + 9].kind != "#") maze.addEdge(maze.nodes[i], maze.nodes[i + 9]);
        } else if (i == 9) {
          // if (maze.nodes[i - 1].kind != "#") maze.addEdge(maze.nodes[i], maze.nodes[i - 1]);
          if (maze.nodes[i + 9].kind != "#") maze.addEdge(maze.nodes[i], maze.nodes[i + 9]);
        } else if (i == 10 || i == 19 || i == 28 || i == 37 || i == 46 || i == 55 || i == 64) {
          // if (maze.nodes[i - 9].kind != "#") maze.addEdge(maze.nodes[i], maze.nodes[i - 9]);
          if (maze.nodes[i + 1].kind != "#") maze.addEdge(maze.nodes[i], maze.nodes[i + 1]);
          if (maze.nodes[i + 9].kind != "#") maze.addEdge(maze.nodes[i], maze.nodes[i + 9]);
        } else if (i == 18 || i == 27 || i == 36 || i == 45 || i == 54 || i == 63 || i == 72) {
          // if (maze.nodes[i - 9].kind != "#") maze.addEdge(maze.nodes[i], maze.nodes[i - 9]);
          // if (maze.nodes[i - 1].kind != "#") maze.addEdge(maze.nodes[i], maze.nodes[i - 1]);
          if (maze.nodes[i + 9].kind != "#") maze.addEdge(maze.nodes[i], maze.nodes[i + 9]);
        } else if (i == 73) {
          // if (maze.nodes[i - 9].kind != "#") maze.addEdge(maze.nodes[i], maze.nodes[i - 9]);
          if (maze.nodes[i + 1].kind != "#") maze.addEdge(maze.nodes[i], maze.nodes[i + 1]);
        } else if (i >= 74 && i <= 80) {
          // if (maze.nodes[i - 9].kind != "#") maze.addEdge(maze.nodes[i], maze.nodes[i - 9]);
          // if (maze.nodes[i - 1].kind != "#") maze.addEdge(maze.nodes[i], maze.nodes[i - 1]);
          if (maze.nodes[i + 1].kind != "#") maze.addEdge(maze.nodes[i], maze.nodes[i + 1]);
        } else if (i == 81) {
          // if (maze.nodes[i - 9].kind != "#") maze.addEdge(maze.nodes[i], maze.nodes[i - 9]);
          // if (maze.nodes[i - 1].kind != "#") maze.addEdge(maze.nodes[i], maze.nodes[i - 1]);
        } else {
          // if (maze.nodes[i - 9].kind != "#") maze.addEdge(maze.nodes[i], maze.nodes[i - 9]);
          // if (maze.nodes[i - 1].kind != "#") maze.addEdge(maze.nodes[i], maze.nodes[i - 1]);
          if (maze.nodes[i + 1].kind != "#") maze.addEdge(maze.nodes[i], maze.nodes[i + 1]);
          if (maze.nodes[i + 9].kind != "#") maze.addEdge(maze.nodes[i], maze.nodes[i + 9]);
        }
      }
    }
  };
  fr.readAsText(this.files[0]);
});

//********** Start button **********
let familyTemp = [];
let familyAges = new MinHeap();
let family = [];
$("#startButton").click((e) => {
  e.preventDefault();
  if (maze.nodes[1].kind == "none") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please upload maze file!",
    });
  } else {
    // scroll down to menu
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $(".menu").offset().top,
      },
      1000
    );
    // getting family numbers
    Swal.fire({
      input: "text",
      confirmButtonText: "Next &rarr;",
      showCancelButton: true,
      title: "How many are you?",
    }).then(async (result) => {
      let number = +result.value;
      // get family name and numbers
      for (let i = 0; i < number; i++) {
        await Swal.mixin({
          input: "text",
          confirmButtonText: "Next &rarr;",
          progressSteps: ["1", "2"],
        })
          .queue([
            {
              title: `Enter name of ${i + 1} person`,
            },
            `Enter age of ${i + 1} person`,
          ])
          .then((result) => {
            // push every family member into data structures
            let temp = result.value;
            familyTemp.push(temp);
            familyAges.insert(+temp[1]);
          });
      }
      // sort the heap
      familyAges = familyAges.sort();
      // Place family in final sorted array
      for (let i = 0; i < familyAges.length; i++) {
        for (let j = 0; j < familyTemp.length; j++) {
          if (familyAges[i] == familyTemp[j][1]) {
            family[i] = {
              name: familyTemp[j][0],
              age: familyTemp[j][1],
              points: Infinity,
            };
            familyTemp.splice(j, 1);
            break;
          }
        }
      }
    });
  }
});
