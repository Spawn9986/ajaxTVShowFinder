// What do you have?
//   - jQuery to make AJAX requests to an API
//   - jQuery to work with the DOM
//   - Some existing HTML with placeholder information (.result-card)
//   - An API endpoint that has data for me "https://api.tvmaze.com/search/shows?q="
//   - A reference to how to use that API: "https://www.tvmaze.com/api#show-search"

// What do you need?
// When the user clicks the search button, the following needs to happen afterwards:
//     1. I need to take the text they typed in the input box
//     2. I need to get the TV show information based on what the user typed in: "https://api.tvmaze.com/search/shows?q=[SEARCH_STRING]"
//     2. I need to display that information using the .result-card html as a template

// How do you get there?
// I need to use this API endpoint: "https://api.tvmaze.com/search/shows?q="
// I can use the URL bar in my web browser to see what comes back when I visit an end point, e.g."https://api.tvmaze.com/search/shows?q=lost"
// I need to handle a click event on the search button
// I need to get the user information from the input box
// I need to use $.get to make an AJAX request to the endpoint with the user search info, e.g. "https://api.tvmaze.com/search/shows?q=lost"
// I need to use jQuery to recreate the .result-card html and all of it's nested elements
// I need to go through the data sent from the AJAX request and create a result card for each TV show
// I need to add each result card to the #results element.
// var results = JSON.parse(data); // The data comes to us in JSON format, it must be parsed in to a object that we can use

let $searchBar = $("#searchbar");
let $searchButton = $("#submit");

function executeSearch(event) {
  $.get(
    `https://api.tvmaze.com/search/shows?q=` + $searchBar[0].value,
    dataRetrieval
  ); //JQuery get function end.
} //executeSearch func. end.

function dataRetrieval(data) {
  //This function retrieves the API data, with the user's specified search.
  console.log(`User search terms: ` + $searchBar[0].value); //Console log what the user typed in the search bar.
  console.log(`results: `, data); //console log the results, this comes in the form of an ARRAY.

  for (let i = 0; i < data.length; i++) {
    //We can loop through data to extract all of our shows results.
    const currentShow = data[i].show; //We establish a variable to anchor the current show's data as we loop through.THIS IS AN OBJECT.
    console.log(currentShow.name); //This will give us a quick preview of all the results show names.
    let genresArray = currentShow.genres;
    let genresString = genresArray.toString().split(",").join(", ");

    let resultCard = $(
      `<span id="card" class="result-card" style="background-image: url(${currentShow.image.original})"><h3 class="card-title text">${currentShow.name}</h3>
    <h2 class="card-genres text">${genresString}</h2>
    <div class="card-summary">
      <em class="summary text">Summary:</em>
      <em class="text">${currentShow.summary}</em>
    </div>
    <a class="view-show text" href=${currentShow.officialSite}>View Show</a>
    </span>`
    );

    $("#results").append(resultCard);
  } //for loop end.
} //dataRetrievl func. end.

$("#submit").click(executeSearch);
// went to properties in the web dev tools
{
  /* <img id="image" class="card-image" src=${currentShow.image.original}></img> */
}
//TEMPLATE
// <span class="result-card">
// <h3 class="card-title">Breaking Bad</h3>
// <img class="card-image" src="https://static.tvmaze.com/uploads/images/medium_portrait/0/2400.jpg"></ul>
// <h2 class="card-genres">Drama, Crime, Thriller</h2>
// <div class="card-summary">
//   <em>Summary:</em>
//   <p>
//     <b>Breaking Bad</b> follows protagonist Walter White, a chemistry
//     teacher who lives in New Mexico with his wife and teenage son who
//     has cerebral palsy...
//   </p>
// </div>
// <a href="https://www.tvmaze.com/shows/169/breaking-bad">View Show</a>
// </span>

////Steps////
// 1 realized search and button dint work so fixed that by going to into the html
// 2 create event listener for the button
// 2.5 created variables in the js to access the html
// 3 tried typing in the search bar and went to the properties tab inside the web dev tools and found where the text was being outputed
// 4 used the $.get to insert the created variables into our url...bc get request requires url and data as parameters
// 5 the data then returns what the url + whatever the user search inputed
// 6 we realized that each search may return numerous results (i.e., if the user typed "Star Wars" there is more than one Star Wars show and they were returned in the console as an array)
// 7 We created a for loop to iterate over all the results
// 8 the span in the html file showed the example which included everything in the data that we needed
// 9 we created a result card variable for all the span elements in js and put them in the for loop and for each current index element it would create a new span template
// 10 tie span template for each element onto the node through pasting a span tempate into the for loop and doing string interpolation ${sustitution}
// 11 We manipulated the dom through $("#results").append(resultCard); we knew that results was the target bc we could go to the elements use the "windown clicker" clicker option to scroll over
// cont the webpage and see what element referred to the results on the page
// 12 Certain properties within the result card had inner arrays so we had to create inner loops
// 13 base is created now we are going to dress it up through CSS
