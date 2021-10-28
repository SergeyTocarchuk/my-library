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

    this.bookRead = function() {
      let readText = ''
      if ( this.read === "false" ) {
          readText = 'Not read yet';
      } else {
          readText = 'Read';
      }
      return readText;
  }

    this.info = function() {
      return (title + ' by ' + author + ', ' + pages + ' pages, ' + 'read_status: ' + this.bookRead());
    }
  }
}

function bookReadStatus(){
  return read.value = read.checked;
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
  clearCurrentDisplay();
  for( let i = 0; i < myLibrary.length; i++ ){
    let cardDiv = document.createElement('div'),
        titleDiv = document.createElement('div'),
        contentDiv = document.createElement('div');
    cardDiv.classList.add('card');
    titleDiv.classList.add('card-header');
    titleDiv.innerHTML = `<span>${myLibrary[i].title}</span>`;
    cardDiv.appendChild(titleDiv);
    contentDiv.classList.add('card-body');
    contentDiv.innerHTML = `<span>${myLibrary[i].info()}</span>`;
    cardDiv.appendChild(contentDiv);
    booksDisplay.appendChild(cardDiv);
    // create Delete Button
    const bookDeleteButton = document.createElement('button');
    bookDeleteButton.dataset.index = i;
    bookDeleteButton.textContent = 'Delete';
    bookDeleteButton.id = 'book-delete';
    bookDeleteButton.classList.add('btn');
    bookDeleteButton.classList.add('btn-danger');
    cardDiv.appendChild(bookDeleteButton);
    // create Toggle Button for readStatus
    const toggleButton = document.createElement('button');
    toggleButton.dataset.index = i;
    toggleButton.textContent = 'Mark As Read';
    toggleButton.id = 'read-status';
    toggleButton.classList.add('btn');
    toggleButton.classList.add('btn-success');
    cardDiv.appendChild(toggleButton);
  }
  deleteButton();
  markAsReadButton();
}

function clearCurrentDisplay() {
  let currentDisplay = booksDisplay.lastElementChild;
  while( currentDisplay ){
    booksDisplay.removeChild(currentDisplay);
    currentDisplay = booksDisplay.lastElementChild;
  }
}

function deleteButton(){
  const bookDeleteButton = document.querySelectorAll('#book-delete');
  if( bookDeleteButton ){
    Array.from(bookDeleteButton).forEach(function(book){
      book.addEventListener('click', () => {
      myLibrary.splice(book.dataset.index, 1);
      displayLibrary();
      })
    })
  }
}

function markAsReadButton(){
  const toggleReadStatus = document.querySelectorAll('#read-status');
  Array.from(toggleReadStatus).forEach(function(book){
    book.addEventListener('click', () => {
      let bookId = book.dataset.index;
      if( myLibrary[bookId].read === 'false' ){
      myLibrary[bookId].read = 'true';
      } else {
        myLibrary[bookId].read = 'false';
      }
      displayLibrary();
    })
  })
}