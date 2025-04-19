const form = document.getElementById("studentForm");
const table = document.querySelector("#studentTable tbody");

let students = [];
let editIndex = -1;

loadData();
showStudents();

form.onsubmit = function (e) {
  e.preventDefault();

  let name = document.getElementById("name").value.trim();
  let id = document.getElementById("studentId").value.trim();
  let st_class = document.getElementById("class").value.trim();
  let contact = document.getElementById("contact").value.trim();

  if (!name || !id || !st_class || !contact) {
    alert("All fields are required.");
    return;
  }

  if (!/^[A-Za-z\s]+$/.test(name)) {
    alert("Name must contain only letters.");
    return;
  }

  if (!/^\d+$/.test(id) || !/^\d{10}$/.test(contact)) {
    alert("ID and Contact must be numbers. Contact must be 10 digits.");
    return;
  }

  let student = `${name}|${id}|${st_class}|${contact}`;

  if (editIndex === -1) {
    students.push(student);
  } else {
    students[editIndex] = student;
    editIndex = -1;
  }

  saveData();
  showStudents();
  form.reset();
};

function showStudents() {
  table.innerHTML = "";
  students.forEach((s, i) => {
    let [name, id, st_class, contact] = s.split("|");
    table.innerHTML += `
      <tr>
        <td>${name}</td>
        <td>${id}</td>
        <td>${st_class}</td>
        <td>${contact}</td>
        <td>
          <button class="edit-btn" onclick="editStudent(${i})">Edit</button>
          <button class="delete-btn" onclick="deleteStudent(${i})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function editStudent(i) {
  let [name, id, st_class, contact] = students[i].split("|");
  document.getElementById("name").value = name;
  document.getElementById("studentId").value = id;
  document.getElementById("st_class").value = st_class;
  document.getElementById("contact").value = contact;
  editIndex = i;
}

function deleteStudent(i) {
  if (confirm("Delete this student?")) {
    students.splice(i, 1);
    saveData();
    showStudents();
  }
}

function saveData() {
  localStorage.setItem("students", students.join(";"));
}

function loadData() {
  let data = localStorage.getItem("students");
  if (data) {
    students = data.split(";");
  }
}

window.editStudent = editStudent;
window.deleteStudent = deleteStudent;
