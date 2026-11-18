const events = [
    { id: 1, title: "24-Hr Hackathon", category: "coding", time: "Dec 12, 9:00 AM" },
    { id: 2, title: "UI/UX Sprint", category: "design", time: "Dec 12, 2:00 PM" },
    { id: 3, title: "AI & Future Keynote", category: "talks", time: "Dec 13, 11:00 AM" }
];

const listEl = document.getElementById("event-list");
const filterBtns = document.querySelectorAll(".filter-btn");
const modal = document.getElementById("reg-modal");
const modalTitle = document.getElementById("modal-title");
const regForm = document.getElementById("reg-form");
const closeModalBtn = document.getElementById("close-modal");

let selectedEvent = "";

function renderEvents(category = "all") {
    const filtered = category === "all"
        ? events
        : events.filter((ev) => ev.category === category);

    listEl.innerHTML = filtered.map((ev) => `
    <article class="card">
      <div>
        <h3>${ev.title}</h3>
        <p>${ev.time}</p>
      </div>
      <button onclick="openRegister('${ev.title}')">Register</button>
    </article>
  `).join("");
}

window.openRegister = function (title) {
    selectedEvent = title;
    modalTitle.textContent = `Register: ${title}`;
    modal.showModal();
};

filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderEvents(btn.dataset.category);
    });
});

closeModalBtn.addEventListener("click", () => modal.close());

regForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("student-name").value.trim();
    alert(`Registered ${name} for ${selectedEvent}!`);
    regForm.reset();
    modal.close();
});

renderEvents();