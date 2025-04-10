"use strict";

// Selecting elements
const showForm = document.querySelector(".dark-filled--btn");
const modal = document.querySelector(".modal");
const deleteBtns = document.querySelectorAll(".del-icon");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".btn--close-modal");
const addBirthday = document.querySelector(".btn--add-birthday");
const inputName = document.querySelector(".form--input-name");
const inputDate = document.querySelector(".form--input-date");
const upcomingBday = document.querySelector(".birthday-list");
const todayCard = document.querySelector(".birthday-card--today");
const msg = `<p class="msg">No birthdays to show! Add a friend's birthday.</p>`;

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let birthdayList = [];

const date = new Date();
const todayMonth = date.getMonth();
const today = date.getDate();
const todayYear = date.getFullYear();

// // Notification
// function notifyMe() {
//   if (!window.Notification) {
//     console.log("Browser does not support notifications.");
//   } else {
//     // Check permission before showing notification
//     if (Notification.permission === "granted") {
//       var notify = new Notification("Hi there!", {
//         body: "How are you doing?",
//         icon: "https://bit.ly/2DYqRrh",
//       });
//     } else {
//       // Request permission if not granted
//       Notification.requestPermission().then(function (permission) {
//         if (permission === "granted") {
//           var notify = new Notification("Hi there!", {
//             body: "How are you doing?",
//             icon: "https://bit.ly/2DYqRrh",
//           });
//         } else {
//           console.log("User blocked notifications.");
//         }
//       });
//     }
//   }
// }

// Toggle form
const openForm = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const hideForm = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Render birthdays
const createBirthdayHTML = (fullName, day, month) => `
  <div class="birthday birthday-item">
    <div class="upper">
      <p class="upcoming-name">${fullName}</p>
      <p class="birth-date">🎂 ${day} ${months[month - 1]}</p>
    </div>
    <span class="del-icon">
        <img src="images/del-icon.svg" width="15px" alt="Delete" />
    </span>
  </div>
`;

const renderBirthdayCard = function (fullName, day, month) {
  // prettier-ignore
  upcomingBday.insertAdjacentHTML("afterbegin", createBirthdayHTML(fullName, day, month));

  inputDate.value = inputName.value = "";
  hideForm();

  // check if birthday === today
  if (+day === today && parseInt(month) === todayMonth + 1) {
    const bdayEl = `
    <div class="today-card">
      <h3>${months[month - 1]} ${day}</h3>
      <div class="flex">
        <img
              src="images/birthday-icon.webp"
              alt="birthday icon"
              width="70px"
            />
        <div class="upper">
          <p class="birth-date">Happy Birthday!</p>
          <p class="upcoming-name">${fullName}</p>
        </div>
      </div>
    </div>
    `;

    todayCard.insertAdjacentHTML("afterbegin", bdayEl);
  }
};

// Add a birthday
const addABirthday = function (e) {
  e.preventDefault();

  let fullName = inputName.value;
  let fullDate = inputDate.value;

  if (!fullDate || !fullName) {
    alert("Missing fields!");
    hideForm();
    inputDate.value = inputName.value = "";
    return;
  }

  let [, month, day] = fullDate.split("-");
  month = parseInt(month);
  day = parseInt(day);

  birthdayList.push([fullName, day, month]);

  localStorage.setItem("birthdays", JSON.stringify(birthdayList));

  renderBirthdayCard(fullName, day, month);

  if (upcomingBday.querySelector(".msg")) {
    upcomingBday.querySelector(".msg").remove();
  }
};

// Delete birthday
const deleteBirthday = function (e) {
  const deleteBtn = e.target.closest(".del-icon");
  if (!deleteBtn) return;

  const birthdayItem = deleteBtn.closest(".birthday-item");

  const name = birthdayItem.querySelector(".upcoming-name").textContent;

  birthdayList = birthdayList.filter((b) => b[0] !== name);

  localStorage.setItem("birthdays", JSON.stringify(birthdayList));

  birthdayItem.remove();

  const todayCards = document.querySelectorAll(".today-card");

  todayCards.forEach((card) => {
    const cardName = card.querySelector(".upcoming-name")?.textContent;
    if (cardName === name) card.remove();
  });

  if (birthdayList.length === 0) {
    upcomingBday.innerHTML = msg;
  }
};

// Get from localStorage
const loadSavedBirthdays = function () {
  const saved = JSON.parse(localStorage.getItem("birthdays"));

  if (saved && saved.length > 0) {
    birthdayList = saved;

    birthdayList.forEach(([fullName, day, month]) => {
      renderBirthdayCard(fullName, day, month);
    });
  } else {
    upcomingBday.innerHTML = msg;
  }
};

loadSavedBirthdays();

// Event Listeners
closeBtn.addEventListener("click", hideForm);
showForm.addEventListener("click", openForm);
addBirthday.addEventListener("click", addABirthday);
upcomingBday.addEventListener("click", deleteBirthday);
