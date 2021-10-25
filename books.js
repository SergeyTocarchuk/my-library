const form = document.getElementById('new-book-form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');

let myLibrary = [];

class Book{
  constructor(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
      return (title + ' by ' + author + ', ' + pages + ' pages, ' + status);
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
});

