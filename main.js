const API_KEY = "3168ee9b3c9d45d6b57b5fb04d1b6f37";
let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach((menus) =>
  menus.addEventListener("click", (event) => getNewsByCategory(event))
);

const getLatestNews = async () => {
  const url = new URL(
    `https://sparkling-duckanoo-259e4a.netlify.app/top-headlines?`
  );
  // new URL() 안에 API를 받아오면 알아서 객체로 필요한 요소들을 정리해줌
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log("category", category);
  const url = new URL(
    `https://sparkling-duckanoo-259e4a.netlify.app/top-headlines?&category=${category}`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;

  render();
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  const url = new URL(
    `https://sparkling-duckanoo-259e4a.netlify.app/top-headlines?&q=${keyword}`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;

  render();
  console.log(data);
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">
  <div class="col-lg-4">
    <img
      class="news-img-size"
      src=${news.urlToImage}
      alt=""
    />
  </div>
  <div class="col-lg-8">
    <h2>${news.title}</h2>
    <p>${news.description}</p>
    <div>${news.source.name} * ${news.publishedAt}</div>
  </div>
</div>`
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();
let searchToggleSwitch = false;
const searchToggle = document.getElementById("search-input-toggle");
searchToggle.addEventListener("click", () => {
  let input = document.querySelector(".input-toggle");
  if (searchToggleSwitch == false) {
    input.style.display = "block";
    searchToggleSwitch = true;
  } else {
    input.style.display = "none";
    searchToggleSwitch = false;
  }
  console.log(input);
});
const toggle = document.querySelector(".toggle");
toggle.addEventListener("click", () => {
  document.querySelector(
    ".side-menus-open"
  ).innerHTML = `<section class="menu-container">
  <div class="exit-button">
    <svg
      class="exit-button-click"
      cursor="pointer"
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="currentColor"
      class="bi bi-x-lg"
      viewBox="0 0 16 16"
    >
      <path
        d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
      />
    </svg>
  </div>
  <div class="side-menus">
    <button>Business</button>
    <button>Entertainment</button>
    <button>General</button>
    <button>Health</button>
    <button>Science</button>
    <button>Sports</button>
    <button>Technology</button>
  </div>
</section>`;
  const exitButton = document.querySelector(".exit-button-click");
  exitButton.addEventListener("click", () => {
    document.querySelector(".menu-container").style.display = "none";
  });
  const sideMenus = document.querySelectorAll(".side-menus button");
  sideMenus.forEach((menus) =>
    menus.addEventListener("click", (event) => getNewsByCategory(event))
  );
});
