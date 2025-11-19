// ⭐ Save a note ⭐

const notes = [];

function saveNote(content, id) {
  const date = new Date(); // ⭐ Unique feature: Get the current date and time ⭐
  notes.push({ content: content, id: id, date: date });

  return `Your note: "${content}" has been saved with the ID: ${id}! 🗒️🖋️`;
}

document.getElementById("addNoteButton").addEventListener("click", () => {
  const notesContent = document.getElementById("notesContent").value;
  const notesId = Number(document.getElementById("notesId").value);
  const message = saveNote(notesContent, notesId);

  document.getElementById("saveResult").innerHTML = `<p>${message}</p>`;

  console.log(message);
  console.log(notes);
});

// ⭐ Get a note ⭐

function getNote(id) {
  const numberID = Number(id);

  if (isNaN(numberID) || numberID <= 0) {
    console.log("Error: You must enter a valid ID.");
    return "Please enter a valid ID.";
  }

  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === numberID) {
      console.log(notes[i]);
      return notes[i];
    }
  }

  console.log(`No note found with ID: ${numberID}.`);
  return `No note found with ID: ${numberID}. Please try again.`;
}

document.getElementById("findNoteButton").addEventListener("click", () => {
  const lookingForNotesId = document.getElementById("findNoteId").value;
  const foundMessage = getNote(lookingForNotesId);

  if (typeof foundMessage === "object") {
    document.getElementById(
      "findResult"
    ).innerHTML = `<p>Congratulations! We found your note with ID: ${foundMessage.id}! It has the following content: "${foundMessage.content}" 📄</p>`;
    console.log(`Found note:`, foundMessage);
  } else {
    document.getElementById("findResult").innerHTML = `<p>${foundMessage}</p>`;
    console.log(foundMessage);
  }
});

// ⭐ Log out notes ⭐

function logOutNotesFormatted() {
  const allNotes = document.getElementById("allNotesResult");
  allNotes.innerHTML = "";

  if (notes.length === 0) {
    allNotes.innerHTML = `<p>No notes available. Please add some notes first.</p>`;
    console.log("No notes available. Please add some notes first.");
    return;
  }

  for (let i = 0; i < notes.length; i++) {
    const notesText = `The note with id: ${notes[i].id}, saved on ${notes[
      i
    ].date.toLocaleString()},has the following note text: "${
      notes[i].content
    }".`;
    console.log(notesText);
    allNotes.innerHTML += `<p>${notesText}</p>`;
  }
}

document.getElementById("logNotesButton").addEventListener("click", () => {
  logOutNotesFormatted();
});
