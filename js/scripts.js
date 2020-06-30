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

// Deep clone of objects
function deepCloneObjects(first, second) {
  for (key in second) {
    if (typeof second[key] === "object") {
      first[key] = {};
      deepCloneObjects(first[key], second[key]);
    } else {
      first[key] = second[key];
    }
  }
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
$("#startButton").click(async (e) => {
  e.preventDefault();
  if (maze.nodes[1].kind == "none") {
    await Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please upload maze file!",
    });
  } else {
    // getting family numbers
    await Swal.fire({
      input: "number",
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
              maze: {},
            };
            deepCloneObjects(family[i].maze, maze);
            familyTemp.splice(j, 1);
            break;
          }
        }
      }
      $("#goButton").text(`Go ${family[whoseTurn].name}`);
    });

    // scroll down to menu
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $("#menu").offset().top,
      },
      1000
    );
  }
});

// render maze function
function renderMaze(theMaze) {
  for (let i = 1; i <= 81; i++) {
    if (theMaze.nodes[i].kind == "#") {
      $(`#b${i}`).css("background-image", "url(./images/wall.jpg)");
    } else if (theMaze.nodes[i].kind == "M") {
      $(`#b${i}`).css("background-image", "url(./images/mouse.png)");
    } else if (theMaze.nodes[i].kind == "C") {
      $(`#b${i}`).css("background-image", "url(./images/cheese.png)");
    } else if (theMaze.nodes[i].kind == "+") {
      $(`#b${i}`).css("background-image", "url()");
    }
  }
}

// turn thing
let whoseTurn = 0;

// game start function
function startGame(member) {
  $(document).off();
  let steps = 0;
  let mousePosition;
  // get mouseaand cheese position in maze
  for (let i = 1; i <= 81; i++) {
    if (member.maze.nodes[i].kind == "M") mousePosition = i;
  }
  // start
  let start = new Date();
  $(document).keydown(async function (event) {
    if (event.keyCode != 65 && event.keyCode != 83 && event.keyCode != 68 && event.keyCode != 87) {
      //
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Yous pressed an wrong key!",
      });
      member.points = "unfinished";
      whoseTurn++;
      // check if all done or not
      if (whoseTurn == family.length) {
        $("#goButton").hide();
        // scroll down to menu
        $([document.documentElement, document.body]).animate(
          {
            scrollTop: $("#menu").offset().top,
          },
          1000
        );
      } else {
        $("#goButton").text(`Go ${family[whoseTurn].name}`);
        // scroll down to menu
        $([document.documentElement, document.body]).animate(
          {
            scrollTop: $("#menu").offset().top,
          },
          1000
        );
      }
    } else if (event.keyCode == 87) {
      // W
      if (maze.AdjList.get(maze.nodes[mousePosition]).includes(maze.nodes[mousePosition - 9])) {
        steps++;
        if (maze.nodes[mousePosition - 9].kind == "C") {
          member.maze.nodes[mousePosition].kind = "+";
          member.maze.nodes[mousePosition - 9].kind = "M";
          mousePosition -= 9;
          await Swal.fire("Congrag...", `${member.name}, you finished the game`, "success");
          whoseTurn++;
          let time = new Date() - start;
          member.points = time * steps;
          // game finished
          if (whoseTurn == family.length) {
            $("#goButton").hide();
            // scroll down to menu
            $([document.documentElement, document.body]).animate(
              {
                scrollTop: $("#menu").offset().top,
              },
              1000
            );
          } else {
            $("#goButton").text(`Go ${family[whoseTurn].name}`);
            // scroll down to menu
            $([document.documentElement, document.body]).animate(
              {
                scrollTop: $("#menu").offset().top,
              },
              1000
            );
          }
        } else if (maze.nodes[mousePosition - 9].kind == "+") {
          member.maze.nodes[mousePosition].kind = "+";
          member.maze.nodes[mousePosition - 9].kind = "M";
          mousePosition -= 9;
          renderMaze(member.maze);
        }
      }
    } else if (event.keyCode == 83) {
      // S
      if (maze.AdjList.get(maze.nodes[mousePosition]).includes(maze.nodes[mousePosition + 9])) {
        steps++;
        if (maze.nodes[mousePosition + 9].kind == "C") {
          member.maze.nodes[mousePosition].kind = "+";
          member.maze.nodes[mousePosition + 9].kind = "M";
          mousePosition += 9;
          await Swal.fire("Congrag...", `${member.name}, you finished the game`, "success");
          whoseTurn++;
          let time = new Date() - start;
          member.points = time * steps;
          // game finished
          if (whoseTurn == family.length) {
            $("#goButton").hide();
            // scroll down to menu
            $([document.documentElement, document.body]).animate(
              {
                scrollTop: $("#menu").offset().top,
              },
              1000
            );
          } else {
            $("#goButton").text(`Go ${family[whoseTurn].name}`);
            // scroll down to menu
            $([document.documentElement, document.body]).animate(
              {
                scrollTop: $("#menu").offset().top,
              },
              1000
            );
          }
        } else if (maze.nodes[mousePosition + 9].kind == "+") {
          member.maze.nodes[mousePosition].kind = "+";
          member.maze.nodes[mousePosition + 9].kind = "M";
          mousePosition += 9;
          renderMaze(member.maze);
        }
      }
    } else if (event.keyCode == 65) {
      // A
      if (maze.AdjList.get(maze.nodes[mousePosition]).includes(maze.nodes[mousePosition - 1])) {
        steps++;
        if (maze.nodes[mousePosition - 1].kind == "C") {
          member.maze.nodes[mousePosition].kind = "+";
          member.maze.nodes[mousePosition - 1].kind = "M";
          mousePosition--;
          await Swal.fire("Congrag...", `${member.name}, you finished the game`, "success");
          whoseTurn++;
          let time = new Date() - start;
          member.points = time * steps;
          // game finished
          if (whoseTurn == family.length) {
            $("#goButton").hide();
            // scroll down to menu
            $([document.documentElement, document.body]).animate(
              {
                scrollTop: $("#menu").offset().top,
              },
              1000
            );
          } else {
            $("#goButton").text(`Go ${family[whoseTurn].name}`);
            // scroll down to menu
            $([document.documentElement, document.body]).animate(
              {
                scrollTop: $("#menu").offset().top,
              },
              1000
            );
          }
        } else if (maze.nodes[mousePosition - 1].kind == "+") {
          member.maze.nodes[mousePosition].kind = "+";
          member.maze.nodes[mousePosition - 1].kind = "M";
          mousePosition--;
          renderMaze(member.maze);
        }
      }
    } else if (event.keyCode == 68) {
      // D
      if (maze.AdjList.get(maze.nodes[mousePosition]).includes(maze.nodes[mousePosition + 1])) {
        steps++;
        if (maze.nodes[mousePosition + 1].kind == "C") {
          member.maze.nodes[mousePosition].kind = "+";
          member.maze.nodes[mousePosition + 1].kind = "M";
          mousePosition++;
          await Swal.fire("Congrag...", `${member.name}, you finished the game`, "success");
          whoseTurn++;
          let time = new Date() - start;
          member.points = time * steps;
          // game finished
          if (whoseTurn == family.length) {
            $("#goButton").hide();
            // scroll down to menu
            $([document.documentElement, document.body]).animate(
              {
                scrollTop: $("#menu").offset().top,
              },
              1000
            );
          } else {
            $("#goButton").text(`Go ${family[whoseTurn].name}`);
            // scroll down to menu
            $([document.documentElement, document.body]).animate(
              {
                scrollTop: $("#menu").offset().top,
              },
              1000
            );
          }
        } else if (maze.nodes[mousePosition + 1].kind == "+") {
          member.maze.nodes[mousePosition].kind = "+";
          member.maze.nodes[mousePosition + 1].kind = "M";
          mousePosition++;
          renderMaze(member.maze);
        }
      }
    }
  });
}

// go button event listenet
$("#goButton").click(() => {
  renderMaze(family[whoseTurn].maze);
  // scroll down to game
  $([document.documentElement, document.body]).animate(
    {
      scrollTop: $("#game").offset().top,
    },
    1000
  );
  startGame(family[whoseTurn]);
});

// ********** leader bord button **********
$("#leaderBoard").click(async function () {
  let html = family.reduce((sum, item, index) => {
    return sum + `<tr><td>${item.name}</td><td> : </td><td>${item.points}</td></tr><br/>`;
  }, "");
  await Swal.fire({
    title: "<strong>Leader board</strong>",
    icon: "info",
    html: html,
    focusConfirm: false,
    confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
    confirmButtonAriaLabel: "Thumbs up, great!",
    cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
    cancelButtonAriaLabel: "Thumbs down",
  });
  // check for laste winner
  let smallet = Infinity;
  let numberW;
  if (whoseTurn == family.length) {
    for (let i = 0; i < family.length; i++) {
      if (typeof family[i].points == "number" && family[i].points < smallet) {
        smallet = family[i].points;
        numberW = i;
      } else if (typeof family[i].points == "string") {
      }
    }
  }

  if (smallet == Infinity) {
    await Swal.fire({
      icon: "info",
      title: "No one won!",
      showConfirmButton: false,
    });
  } else {
    await Swal.fire({
      icon: "success",
      title: `${family[numberW].name} Won the game`,
      showConfirmButton: false,
    });
  }
});
