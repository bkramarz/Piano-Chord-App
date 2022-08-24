allNotesJSON = [
  { id: "C3", sharp: "C", flat: "C" },
  { id: "C-3", sharp: "C#", flat: "Db" },
  { id: "D3", sharp: "D", flat: "D" },
  { id: "D-3", sharp: "D#", flat: "Eb" },
  { id: "E3", sharp: "E", flat: "E" },
  { id: "F3", sharp: "F", flat: "F" },
  { id: "F-3", sharp: "F#", flat: "Gb" },
  { id: "G3", sharp: "G", flat: "G" },
  { id: "G-3", sharp: "G#", flat: "Ab" },
  { id: "A4", sharp: "A", flat: "A" },
  { id: "A-4", sharp: "A#", flat: "Bb" },
  { id: "B4", sharp: "B", flat: "B" },
  { id: "C4", sharp: "C", flat: "C" },
  { id: "C-4", sharp: "C#", flat: "Db" },
  { id: "D4", sharp: "D", flat: "D" },
  { id: "D-4", sharp: "D#", flat: "Eb" },
  { id: "E4", sharp: "E", flat: "E" },
  { id: "F4", sharp: "F", flat: "F" },
  { id: "F-4", sharp: "F#", flat: "Gb" },
  { id: "G4", sharp: "G", flat: "G" },
  { id: "G-4", sharp: "G#", flat: "Ab" },
  { id: "A5", sharp: "A", flat: "A" },
  { id: "A-5", sharp: "A#", flat: "Bb" },
  { id: "B5", sharp: "B", flat: "B" },
  { id: "C5", sharp: "C", flat: "C" },
  { id: "C-5", sharp: "C#", flat: "Db" },
  { id: "D5", sharp: "D", flat: "D" },
  { id: "D-5", sharp: "D#", flat: "Eb" },
  { id: "E5", sharp: "E", flat: "E" },
  { id: "F5", sharp: "F", flat: "F" },
  { id: "F-5", sharp: "F#", flat: "Gb" },
  { id: "G5", sharp: "G", flat: "G" },
];

chordSymbols = [
  "maj",
  "min",
  "min",
  "maj",
  "maj",
  "min",
  "dim",
  "maj",
  "min",
  "min",
  "maj",
  "maj",
  "min",
  "dim",
  "maj",
];

//Set starting userKey to 0 (Cmaj), playChords to off, chord display to default "Cmaj", set scale display to Cmaj scale
userKey = 0;
playChords = false;
$("#chord-display").val("Cmaj");
$("#scale-display").val(displayScaleFlat());

function checkSharpOrFlat(userKey) {
  if (
    userKey === 1 ||
    userKey === 3 ||
    userKey === 5 ||
    userKey === 8 ||
    userKey === 10
  ) {
    return "flat";
  } else {
    return "sharp";
  }
}

//Set user selected key.
$("#key-select").on("change", function () {
  userKey = parseInt($("#key-select").val());
  $("#chord-display").val(allNotesJSON[userKey].flat + "maj");
  if (checkSharpOrFlat(userKey) === "flat") {
    $("#scale-display").val(displayScaleFlat());
  } else if (checkSharpOrFlat(userKey) === "sharp") {
    $("#scale-display").val(displayScaleSharp());
  }
});

//Create scale display arrays
function displayScaleFlat(key = userKey) {
  const displayScaleFlat = [
    "  " + allNotesJSON[key].flat + "maj",
    "  " + allNotesJSON[key + 2].flat + "min",
    "  " + allNotesJSON[key + 4].flat + "min",
    "  " + allNotesJSON[key + 5].flat + "maj",
    "  " + allNotesJSON[key + 7].flat + "maj",
    "  " + allNotesJSON[key + 9].flat + "min",
    "  " + allNotesJSON[key + 11].flat + "dim",
    "  " + allNotesJSON[key + 12].flat + "maj" + "  ",
  ];

  return displayScaleFlat;
}

function displayScaleSharp(key = userKey) {
  const displayScaleSharp = [
    "  " + allNotesJSON[key].sharp + "maj",
    "  " + allNotesJSON[key + 2].sharp + "min",
    "  " + allNotesJSON[key + 4].sharp + "min",
    "  " + allNotesJSON[key + 5].sharp + "maj",
    "  " + allNotesJSON[key + 7].sharp + "maj",
    "  " + allNotesJSON[key + 9].sharp + "min",
    "  " + allNotesJSON[key + 11].sharp + "dim",
    "  " + allNotesJSON[key + 12].sharp + "maj" + "  ",
  ];

  return displayScaleSharp;
}

//Turn chords off or on
$("#chords").change(function () {
  if ($(this).is(":checked")) {
    playChords = true;
  } else {
    playChords = false;
  }
});

//Create scales
function createScales(key) {
  const newScale = [
    allNotesJSON[key],
    allNotesJSON[key + 2],
    allNotesJSON[key + 4],
    allNotesJSON[key + 5],
    allNotesJSON[key + 7],
    allNotesJSON[key + 9],
    allNotesJSON[key + 11],
    allNotesJSON[key + 12],
  ];

  const octaveTwo = [
    allNotesJSON[key + 14],
    allNotesJSON[key + 16],
    allNotesJSON[key + 17],
    allNotesJSON[key + 19],
    allNotesJSON[key + 21],
    allNotesJSON[key + 23],
    allNotesJSON[key + 24],
  ];

  //Put octaves together
  const twoOctaveScale = newScale.concat(octaveTwo);
  //Return scales
  if (direction === "up") {
    return twoOctaveScale;
  } else if (direction === "down") {
    newScale.reverse();
    octaveTwo.reverse();
    twoOctaveScale.reverse();
    return twoOctaveScale;
  } else {
    return twoOctaveScale;
  }
}

//Play up major scale
function majorScale(key = userKey, direction) {
  //Create two octaves in selected key
  const twoOctaveScale = createScales(key);

  if (direction === "up") {
    chordNames = chordSymbols;
  } else if (direction === "down") {
    chordNames = chordSymbols.slice().reverse();
  }

  //Go through scale
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      //Set three and five notes for up scale
      let iii = i + 2;
      let v = i + 4;

      //Set three and five notes for down scale
      if (direction === "down") {
        i = i + 7;
        iii = iii + 3;
        v = v - 1;
      }

      //Play mp3notes
      new Audio("mp3notes/" + twoOctaveScale[i].id + ".mp3").play();
      animateKey(twoOctaveScale[i].id);
      if (checkSharpOrFlat(userKey) === "flat") {
        $("#chord-display").val(twoOctaveScale[i].flat);
      } else if (checkSharpOrFlat(userKey) === "sharp") {
        $("#chord-display").val(twoOctaveScale[i].sharp);
      }
      if (playChords === true) {
        new Audio("mp3notes/" + twoOctaveScale[iii].id + ".mp3").play();
        animateKey(twoOctaveScale[iii].id);
        new Audio("mp3notes/" + twoOctaveScale[v].id + ".mp3").play();
        animateKey(twoOctaveScale[v].id);
        if (checkSharpOrFlat(userKey) === "flat") {
          $("#chord-display").val(twoOctaveScale[i].flat + chordNames[i]);
        } else if (checkSharpOrFlat(userKey) === "sharp") {
          $("#chord-display").val(twoOctaveScale[i].sharp + chordNames[i]);
        }
      }
    }, i * 500);
  }
}

//Detect if "Scale up" button is clicked
$(".scale-up").click(() => {
  majorScale(userKey, (direction = "up"));
});

//Detect if "Scale down" button is clicked
$(".scale-down").click(() => {
  majorScale(userKey, (direction = "down"));
});

//Play individual keys using keyboard
document.addEventListener("keydown", (event) => {
  playSound(event.key);
});

//Play keys using mouse
$(".white-key, .black-key").click(function () {
  var sound = new Audio("mp3notes/" + this.id + ".mp3");
  sound.play();
});

//Play keys using keyboard
function playSound(keyPressed) {
  switch (keyPressed) {
    case "1":
      playChord(0);
      break;
    case "2":
      playChord(1);
      break;
    case "3":
      playChord(2);
      break;
    case "4":
      playChord(3);
      break;
    case "5":
      playChord(4);
      break;
    case "6":
      playChord(5);
      break;
    case "7":
      playChord(6);
      break;
    case "ArrowRight":
      majorScale(userKey, (direction = "up"));
      break;
    case "ArrowLeft":
      majorScale(userKey, (direction = "down"));
      break;
    default:
      console.log(keyPressed);
  }
}

//Add animation to key
function animateKey(keyID) {
  $("#" + keyID).addClass("played");
  setTimeout(function () {
    $("#" + keyID).removeClass("played");
  }, 200);
}

//Detect if chord buttons are pressed and play chords
$('[name="chordI"]').click(function () {
  playChord(0);
});

$('[name="chordii"]').click(function () {
  playChord(1);
});

$('[name="chordiii"]').click(function () {
  playChord(2);
});

$('[name="chordIV"]').click(function () {
  playChord(3);
});

$('[name="chordV"]').click(function () {
  playChord(4);
});

$('[name="chordvi"]').click(function () {
  playChord(5);
});

$('[name="chordvii"]').click(function () {
  playChord(6);
});

//Play chord function
function playChord(value) {
  twoOctaveScale = createScales(userKey, (direction = "up"));
  new Audio("mp3notes/" + twoOctaveScale[value].id + ".mp3").play();
  animateKey(twoOctaveScale[value].id);
  new Audio("mp3notes/" + twoOctaveScale[value + 2].id + ".mp3").play();
  animateKey(twoOctaveScale[value + 2].id);
  new Audio("mp3notes/" + twoOctaveScale[value + 4].id + ".mp3").play();
  animateKey(twoOctaveScale[value + 4].id);
  if (checkSharpOrFlat(userKey) === "flat") {
    $("#chord-display").val(twoOctaveScale[value].flat + chordSymbols[value]);
  } else if (checkSharpOrFlat(userKey) === "sharp") {
    $("#chord-display").val(twoOctaveScale[value].sharp + chordSymbols[value]);
  }
}
