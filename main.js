const API_KEY = "3168ee9b3c9d45d6b57b5fb04d1b6f37";
let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach((menus) =>
  menus.addEventListener("click", (event) => getNewsByCategory(event))
);

const getLatestNews = async () => {
  const url = new URL(
    `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?`
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
    `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?&category=${category}`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;

  render();
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  const url = new URL(
    `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?&q=${keyword}`
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
