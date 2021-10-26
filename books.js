const form = document.getElementById('new-book-form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');
const booksDisplay = document.getElementById('books-display');

let myLibrary = [];

class Book{
  constructor(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
      return (title + ' by ' + author + ', ' + pages + ' pages, ' + read);
    }
  }
}

function addBookToLibrary(book){
  myLibrary.push(book);
  console.log(myLibrary);
}

form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const newBook = new Book(title.value, author.value,pages.value, read.value);
  addBookToLibrary(newBook);
  displayLibrary();
});

function displayLibrary() {
  for( let i = 0; i < myLibrary.length; i++ ){
    let cardDiv = document.createElement('div'),
        titleDiv = document.createElement('div'),
        contentDiv = document.createElement('div');
    cardDiv.classList.add('card');
    titleDiv.classList.add('card-header');
    cardDiv.innerHTML = `<span>${myLibrary[i].title}</span>`;
    cardDiv.appendChild(titleDiv);
    contentDiv.classList.add('card-body');
    contentDiv.innerHTML = `<span>${myLibrary[i].info()}</span>`;
    cardDiv.appendChild(contentDiv);
    booksDisplay.appendChild(cardDiv);
  }
}