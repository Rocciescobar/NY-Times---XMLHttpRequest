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
  console.log(data.response.docs);  
  const articles = data.response.docs;
  
  articles.forEach(element => {
    console.log(element);    
    const title = element.headline.main;
    const byLine = element.byline.original;
    const snippet = element.snippet;
    const webUrl = element.web_url;
    
    responseContainer.innerHTML += `
    <div class="card m-5">
      <div class="card-header">
        <h5>${title}</h5>
        <p class"font-weight-light">${byLine}</p>
      </div>
      <div class="card-body">
        <p class="card-text">${snippet}</p>
        <a href="${webUrl}" target="_blank" class="btn btn-primary">More info</a>
      </div>
    </div>
    `;   
  });
};