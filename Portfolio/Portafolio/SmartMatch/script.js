document.addEventListener("DOMContentLoaded", function () {
  function generate() {
  const students = [
    "Mehrnoosh",
    "Maria",
    "Oumaima",
    "Yiting",
    "Sunitha",
    "Sukhwinder",
    "Prachi",
    "Busra",
    "Paloma",
    "Annamani",
    "Sravani",
    "Natalia",
    "Fatima",
    "Tejaswini",
    "Fulya",
    "Gloryfel",
  ];

  const teachers = [
    "Henderson",
    "Tifana",
    "Iga",
    "Engiber",
    "Kumaran",
    "Lukáš",
    "Tim",
  ];

  students.push("Matilde");
  teachers.push("Carlos");

  students.sort(() => Math.random() - 0.5);
  teachers.sort(() => Math.random() - 0.5);

  const result = students.map((student, index) => {
    return {
      student,
      teacher: teachers[index % teachers.length],
    };
  });

  const list = document.getElementById("result");
  list.innerHTML = "";

  result.forEach((pair) => {
    const item = document.createElement("li");
    item.textContent = `${pair.student} - ${pair.teacher}`;
    list.appendChild(item);
  });
}

  const button = document.getElementById("match-btn");
  button.addEventListener("click", generate);
});
