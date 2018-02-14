const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('reponse-container');
let searchedForText;

form.addEventListener('submit', function(e) {
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;
  getNews();
});

function getNews() {
  const articleRequest = new XMLHttpRequest();
  articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=f4d03cf6c59a4024ab3b7b3f9e34ce05`);
  articleRequest.onload = addNews;
  articleRequest.onerror = handleError;
  articleRequest.send();
};

function handleError() {
  console.log('Se ha presentado un error');
};

function addNews() {
  const data = JSON.parse(this.responseText);
  const article = data.response.docs[0];
  const title = article.headline.main;
  const snippet = article.snippet;

  let li = document.createElement('li');
  li.className = 'styleLi';
  li.innerText = snippet;

  responseContainer.appendChild(li);
};