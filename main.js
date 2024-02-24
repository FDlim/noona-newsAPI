const API_KEY = "3168ee9b3c9d45d6b57b5fb04d1b6f37";
let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach((menus) =>
  menus.addEventListener("click", (menus) => getNewsByCategory(menus))
);

// let url = new URL(
//   `https://sparkling-duckanoo-259e4a.netlify.app/top-headlines?`
// );
let url = new URL(
  `https://sparkling-duckanoo-259e4a.netlify.app/top-headlines?`
);
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const gatNews = async () => {
  try {
    url.searchParams.set("page", page); // =>&page=page
    url.searchParams.set("pageSize", pageSize);

    const response = await fetch(url);

    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("NO result for this search");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  // url = new URL(`https://sparkling-duckanoo-259e4a.netlify.app/everything?`);
  url = new URL(`https://sparkling-duckanoo-259e4a.netlify.app/top-headlines?`);
  // new URL() 안에 API를 받아오면 알아서 객체로 필요한 요소들을 정리해줌
  gatNews();
};

const getNewsByCategory = async (event) => {
  page = 1;
  const category = event.target.textContent.toLowerCase();
  url = new URL(
    `https://sparkling-duckanoo-259e4a.netlify.app/top-headlines?&category=${category}`
  );
  gatNews();
};

const getNewsByKeyword = async () => {
  page = 1;
  const keyword = document.getElementById("search-input").value;
  url = new URL(
    `https://sparkling-duckanoo-259e4a.netlify.app/top-headlines?&q=${keyword}`
  );
  gatNews();
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

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div>`;

  document.getElementById("news-board").innerHTML = errorHTML;
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

const paginationRender = () => {
  const totalPages = Math.ceil(totalResults / pageSize);
  const pageGroup = Math.ceil(page / groupSize);
  let lastPage = pageGroup * groupSize;
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }
  const firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  let paginationHTML = `<li class="page-item" onclick="moveToPage(${1})">
  <a class="page-link"  aria-label="Previous">
    <span aria-hidden="true">&laquo;</span>
  </a>
</li><li class="page-item" onclick="moveToPage(${
    page - 1
  })"><a class="page-link" >Previous</a></li>`;
  if (page === 1) {
    paginationHTML = "";
  }

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${
      i === page ? "active" : ""
    }" onclick="moveToPage(${i})"><a class="page-link" >${i}</a></li>`;
  }

  if (page !== totalPages) {
    paginationHTML += `<li class="page-item" onclick="moveToPage(${
      page + 1
    })" > <a class="page-link" " >Next</a></li><li class="page-item" onclick="moveToPage(${totalPages})" >
    <a class="page-link"  aria-label="Next">
      <span aria-hidden="true">&raquo;</span>
    </a>
  </li>`;
  }

  document.querySelector(".pagination").innerHTML = paginationHTML;

  //과제 1페이지일경우 프리비우스 버튼 없애기, 마지막 페이지면 넥스트 버튼 없애기
  //과제 2 >> 버튼 만들어서 가장 마지막 페이지로 이동

  //   <nav aria-label="Page navigation example">
  //   <ul class="pagination">
  //     <li class="page-item"><a class="page-link" href="#">Previous</a></li>
  //     <li class="page-item"><a class="page-link" href="#">1</a></li>
  //     <li class="page-item"><a class="page-link" href="#">2</a></li>
  //     <li class="page-item"><a class="page-link" href="#">3</a></li>
  //     <li class="page-item"><a class="page-link" href="#">Next</a></li>
  //   </ul>
  // </nav>
};

const moveToPage = (pageNum) => {
  console.log("moveToPage", pageNum);
  page = pageNum;
  gatNews();
};
