// Take each page
const home = document.querySelector("#homePage"),
  notePage = document.querySelector(".container-dua");

// Take each button
const addNote = document.querySelector(".btnAdd"),
  backHome = document.querySelector(".backToMenu"),
  save = document.querySelector(".save");

// Creates an array to collect all the notes
const notes = [];

// Make variabel for edit fitur
let editNote = false,
  editId;

//   Take save teks
const teksSave = document.querySelector("#spanSave");

// To show date now
const showDate = document.querySelector("#time");

// Takes the name of the month according to the index
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// To take date now
const dates = new Date(),
  date = dates.getDate(),
  month = months[dates.getMonth()],
  year = dates.getFullYear();

showDate.innerHTML = `${date} ${month} | `;

// Take all input in note page
const inputTitle = document.querySelector("#titleNote"),
  inputNote = document.querySelector("#areaNote");

// Show how many letters in input note
inputNote.addEventListener("keyup", function () {
  const txt = this.value.replace(/\s+/g, "");
  document.querySelector("#char").innerHTML = txt.length;
});

// Show note to home page
function showNote() {
  const containerNote = document.querySelector(".notes-container");
  containerNote.innerHTML = "";
  notes.forEach((note, index) => {
    let noteUser = `<div class="notes-list">
                    <h1 class="judul">${note.title}</h1>
                    <p class="isi-note">${note.description}
                    </p>
                    <div class="sampah">
                      <i class="fa-solid fa-pen-to-square edit" onclick="editList(${index}, '${note.title}' , '${note.description}')"></i>
                      <i class="fa-solid fa-trash-can " onclick="deleteList(${index})"></i>
                    </div>
                    <span class="date">${note.date}</span>
                  </div>`;
    containerNote.insertAdjacentHTML("afterbegin", noteUser);
  });
}

// remove note
function deleteList(id) {
  console.log(id);
  Swal.fire({
    title: "Are you sure?",
    text: "You want to delete this note",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      notes.splice(id, 1);
      showNote();
      Swal.fire("Deleted!", "Your note has been deleted.", "success");
    }
  });
}

// Edit note
function editList(id, tle, des) {
  addNote.click();
  editId = id;
  editNote = true;
  inputTitle.value = tle;
  inputNote.value = des;
  console.log(id, tle, des);
}

// If add button click
addNote.addEventListener("click", function () {
  home.classList.add("hidden");
  notePage.classList.remove("hidden");
});

// If  button back click
backHome.addEventListener("click", function (e) {
  e.preventDefault();
  home.classList.remove("hidden");
  notePage.classList.add("hidden");
});

// Function clear all input
function clearInput() {
  document.querySelector("#titleNote").value = "";
  document.querySelector("#areaNote").value = "";
  document.querySelector("#char").innerHTML = "0";
}

save.addEventListener("click", function (e) {
  e.preventDefault();

  const titleValue = inputTitle.value,
    noteValue = inputNote.value;
  const noteInfo = {
    title: titleValue,
    description: noteValue,
    date: `${date} ${month}, ${year}`,
  };

  if (titleValue !== "" || noteValue !== "") {
    if (!editNote) {
      notes.push(noteInfo);
      const Tost = Swal.mixin({
        toast: true,
        position: "top-start",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
        timerProgressBar: true,
        didOpen: (tost) => {
          tost.addEventListener("mouseenter", Swal.stopTimer);
          tost.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Tost.fire({
        icon: "success",
        title: "Note added successfully",
      });
    } else {
      editNote = false;
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Update note successfully",
      });
      notes[editId] = noteInfo;
    }
    clearInput();
    backHome.click();
    showNote();
  }
});
