const users = [
  {
    id: 1,
    firstName: "Алиса",
    lastName: "Иванова",
    userTag: "ai",
    department: "design",
    position: "UI/UX Designer",
    birthday: "1998-04-12",
    phone: "+7 (900) 123-45-67",
    avatar: "https://img.magnific.com/free-photo/portrait-young-pretty-positive-girl-smiling_176420-9609.jpg?semt=ais_hybrid&w=740&q=80"
  },
  {
    id: 2,
    firstName: "Максим",
    lastName: "Соколов",
    userTag: "ms",
    department: "ios",
    position: "Senior iOS Developer",
    birthday: "1995-09-23",
    phone: "+7 (901) 234-56-78",
    avatar: "https://img.magnific.com/free-photo/portrait-interesting-young-man-winter-clothes_158595-914.jpg?semt=ais_hybrid&w=740&q=80"
  },
  {
    id: 3,
    firstName: "Елена",
    lastName: "Смирнова",
    userTag: "es",
    department: "analytics",
    position: "System Analyst",
    birthday: "1997-11-05",
    phone: "+7 (902) 345-67-89",
    avatar: "https://sun9-62.vkuserphoto.ru/s/v1/ig2/tqZ-JKVl_FF5lQ708AvQiMliu5ib-LYkAzRF21oCxwuoCHTchVPLGTxMr0z6zjU7pWTw2tyd51O1k03fVl4sT4vq.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,1080x1440,1280x1707,1440x1920,1920x2560&from=bu&u=RPA12RuNyCLHyd99gMqwUVbxyStBVYwoVp34AgJ7ngA&cs=640x0"
  },
  {
    id: 4,
    firstName: "Дмитрий",
    lastName: "Козлов",
    userTag: "dk",
    department: "android",
    position: "Android Developer",
    birthday: "1996-02-18",
    phone: "+7 (903) 456-78-90",
    avatar: "https://img.magnific.com/premium-photo/portrait-stylish-friendly-handsome-young-man-with-beard-fashionable-winter-black-jacket-black-knitted-hat-vintage-modern-buildings-attractive-fashionable-guy_338491-6385.jpg?semt=ais_hybrid&w=740&q=80"
  },
  {
    id: 5,
    firstName: "Ольга",
    lastName: "Морозова",
    userTag: "om",
    department: "management",
    position: "Product Manager",
    birthday: "1994-07-30",
    phone: "+7 (904) 567-89-01",
    avatar: "https://img.magnific.com/free-photo/portrait-beautiful-young-woman_23-2148856070.jpg?semt=ais_hybrid&w=740&q=80"
  }
];

let currentDept = "all";
let isSorted = false;

const usersListEl = document.getElementById("usersList");
const emptyStateEl = document.getElementById("emptyState");
const searchInputEl = document.getElementById("searchInput");
const sortBtnEl = document.getElementById("sortBtn");
const tabsEl = document.getElementById("departmentTabs");

const modalEl = document.getElementById("userModal");
const modalOverlayEl = document.getElementById("modalOverlay");
const modalCloseEl = document.getElementById("modalClose");
const modalBodyEl = document.getElementById("modalBody");

function renderUsers() {
  const query = searchInputEl.value.toLowerCase().trim();

  let filtered = users.filter((user) => {
    const matchesDept = currentDept === "all" || user.department === currentDept;
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const matchesQuery =
      fullName.includes(query) ||
      user.userTag.toLowerCase().includes(query) ||
      user.position.toLowerCase().includes(query);

    return matchesDept && matchesQuery;
  });

  if (isSorted) {
    filtered.sort((a, b) => a.firstName.localeCompare(b.firstName));
  }

  usersListEl.innerHTML = "";

  if (filtered.length === 0) {
    emptyStateEl.classList.remove("hidden");
    return;
  }

  emptyStateEl.classList.add("hidden");

  filtered.forEach((user) => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
      <img src="${user.avatar}" alt="${user.firstName}" class="user-card__avatar" />
      <div>
        <div class="user-card__name">
          ${user.firstName} ${user.lastName}
          <span class="user-card__tag">${user.userTag}</span>
        </div>
        <div class="user-card__position">${user.position}</div>
      </div>
    `;
    card.addEventListener("click", () => openModal(user));
    usersListEl.appendChild(card);
  });
}

function openModal(user) {
  modalBodyEl.innerHTML = `
    <img src="${user.avatar}" alt="${user.firstName}" class="modal__avatar" />
    <h2>${user.firstName} ${user.lastName} <span class="user-card__tag">${user.userTag}</span></h2>
    <p class="user-card__position">${user.position}</p>
    <div class="modal__info">
      <div><strong>Дата рождения:</strong> ${user.birthday}</div>
      <div><strong>Телефон:</strong> <a href="tel:${user.phone}">${user.phone}</a></div>
    </div>
  `;
  modalEl.classList.remove("hidden");
}

function closeModal() {
  modalEl.classList.add("hidden");
}

searchInputEl.addEventListener("input", renderUsers);

sortBtnEl.addEventListener("click", () => {
  isSorted = !isSorted;
  sortBtnEl.classList.toggle("active", isSorted);
  renderUsers();
});

tabsEl.addEventListener("click", (e) => {
  if (!e.target.classList.contains("tabs__btn")) return;
  document.querySelectorAll(".tabs__btn").forEach((btn) => btn.classList.remove("tabs__btn--active"));
  e.target.classList.add("tabs__btn--active");
  currentDept = e.target.dataset.dept;
  renderUsers();
});

modalCloseEl.addEventListener("click", closeModal);
modalOverlayEl.addEventListener("click", closeModal);

renderUsers();
