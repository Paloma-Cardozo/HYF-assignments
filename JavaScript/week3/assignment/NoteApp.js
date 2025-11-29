// ⭐ Save a note ⭐

const notes = [];

function saveNote(content, id) {
  const numberID = Number(id);

  if (isNaN(numberID) || numberID <= 0) {
    alert("Please enter a valid ID greater than 0");
    return "Error: Invalid ID";
  }

  const existingNote = notes.find((note) => note.id === numberID);

  if (existingNote) {
    alert(
      `A note with ID ${numberID} already exists. Please use a different ID.`
    );
    return "Error: Duplicate ID";
  }

  const date = new Date(); // ⭐ Unique feature: Get the current date and time ⭐
  notes.push({ content: content, id: numberID, date: date });

  return `Your note: "${content}" has been saved with the ID: ${numberID}! 🗒️🖋️`;
}

document.getElementById("addNoteButton").addEventListener("click", () => {
  const notesContent = document.getElementById("notesContent").value;
  const notesId = document.getElementById("notesId").value;
  const message = saveNote(notesContent, notesId);

  document.getElementById("saveResult").innerHTML = `<p>${message}</p>`;

  document.getElementById("notesContent").value = "";
  document.getElementById("notesId").value = "";

  console.log(notes);
});

// ⭐ Get a note ⭐

function getNote(id) {
  const numberID = Number(id);

  if (isNaN(numberID) || numberID <= 0) {
    alert("Please enter a valid ID");
    return "Error: Invalid ID";
  }

  const existingNote = notes.find((note) => note.id === numberID);

  if (existingNote) {
    return existingNote;
  }

  return `No note found with ID: ${numberID}. Please try again.`;
}

document.getElementById("findNoteButton").addEventListener("click", () => {
  const lookingForNotesId = document.getElementById("findNoteId").value;
  const foundMessage = getNote(lookingForNotesId);

  if (typeof foundMessage === "object") {
    document.getElementById(
      "findResult"
    ).innerHTML = `<p>Congratulations! We found your note with ID: ${foundMessage.id}! It has the following content: "${foundMessage.content}" 📄</p>`;
  } else {
    document.getElementById("findResult").innerHTML = `<p>${foundMessage}</p>`;
  }
});

// ⭐ Log out notes ⭐

function logOutNotesFormatted() {
  const allNotes = document.getElementById("allNotesResult");
  allNotes.innerHTML = "";

  if (notes.length === 0) {
    allNotes.innerHTML = `<p>No notes available. Please add some notes first.</p>`;
    return;
  }

  notes.forEach((note) => {
    const notesText = `The note with ID: ${
      note.id
    }, saved on ${note.date.toLocaleString()}, has the following content: "${
      note.content
    }".`;
    allNotes.innerHTML += `<p>${notesText}</p>`;
  });
}

document.getElementById("logNotesButton").addEventListener("click", () => {
  logOutNotesFormatted();
});
