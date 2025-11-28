const class07Students = [];

function addStudentToClass(studentName, class07Students) {
  if (studentName === "") {
    return "⚠️ You must enter a name to add a student! ⚠️";
  }

  if (class07Students.includes(studentName)) {
    return `⚠️ Student ${studentName} is already in the class. ⚠️`;
  }

  if (studentName === "Queen") {
    class07Students.push(studentName);
    return (
      `Student ${studentName} has been added.` +
      " " +
      "👑 Welcome, Queen! You have been added to the class. 👑"
    );
  }

  if (class07Students.length >= 6) {
    return "⚠️ Cannot add more students to class 07. ⚠️";
  }

  class07Students.push(studentName);
  return (
    `Student ${studentName} has been added.` +
    " " +
    "You can add more students to class 07! 😊"
  );
}

function getNumberOfStudents() {
  class07Students.length;
  return `Total students in the class: ${class07Students.length}.`;
}

const inputField = document.getElementById("studentName");
const addButton = document.getElementById("addStudentButton");
const list = document.getElementById("studentList");
const result = document.getElementById("studentManagerApp");

addButton.addEventListener("click", () => {
  const studentName = inputField.value.trim();
  const studentManagerApp = addStudentToClass(studentName, class07Students);

  result.innerHTML = `<p>${studentManagerApp}</p><p>Total students: ${getNumberOfStudents()}</p>`;

  list.innerHTML = "";
  class07Students.forEach((student) => {
    const listItem = document.createElement("li");
    listItem.textContent = student;
    list.appendChild(listItem);
  });

  inputField.value = "";
});
