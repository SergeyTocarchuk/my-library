const form = document.getElementById('new-book-form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');
const booksDisplay = document.getElementById('books-display');

// add addEventListener to navbar anchors
const showMyLibrary = document.getElementById('my-library');
showMyLibrary.addEventListener('click', displayLibrary);

const showBooks = document.getElementById('show-books');
showBooks.addEventListener('click', displayLibrary);

const addBook = document.getElementById('add-book');
addBook.addEventListener('click', displayForm);

let myLibrary = JSON.parse(window.localStorage.getItem("localStorageBooks"));

class Book{
  constructor(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function bookRead() {
  let readText = ''
  if ( this.read === "false" ) {
      readText = 'Not read yet';
  } else {
      readText = 'Read';
  }
  return readText;
}

function bookReadStatus(){
  return read.value = read.checked;
}

function addBookToLocalStorage(book) {
  if (myLibrary != null){
    myLibrary.push(book);
    window.localStorage.setItem("localStorageBooks", JSON.stringify(myLibrary));
  } else {
    myLibrary = [];
    myLibrary.push(book);
    window.localStorage.setItem("localStorageBooks", JSON.stringify(myLibrary));
  }
  console.log(myLibrary);
  displayLibrary();
}

function displayForm(){
  let titleDiv = document.createElement('div'),
      authorDiv = document.createElement('div'),
      pagesDiv = document.createElement('div'),
      readStatusDiv = document.createElement('div'),
      submitFormButton = document.createElement('div');
  titleDiv.classList.add('form-floating');
  titleDiv.classList.add('mb-3');
  titleDiv.innerHTML = `<input type="text" class="form-control" id="title" name="title" required>
                        <label for="title">Title</label>`;
  form.appendChild(titleDiv);
  authorDiv.classList.add('form-floating');
  authorDiv.classList.add('mb-3');
  authorDiv.innerHTML = `<input type="text" class="form-control" id="author" name="author" required>
                        <label for="author">Author</label>`;
  form.appendChild(authorDiv);
  pagesDiv.classList.add('form-floating');
  pagesDiv.classList.add('mb-3');
  pagesDiv.innerHTML = `<input type="number" class="form-control" id="pages" name="pages" required>
                        <label for="pages">pages</label>`;
  form.appendChild(pagesDiv);
  readStatusDiv.classList.add('form-check');
  readStatusDiv.classList.add('mb-3');
  readStatusDiv.innerHTML = `<input class="form-check-input" type="checkbox" id="read" name="read" value="false" onclick="bookReadStatus()">
                             <label class="form-check-label" for="read">
                             Read
                             </label>`;
  form.appendChild(readStatusDiv);
  submitFormButton.classList.add('form-check');
  submitFormButton.innerHTML = `<button type="submit" class="btn btn-warning">Submit</button>`;
  form.appendChild(submitFormButton);
}

form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const newBook = new Book(title.value, author.value, pages.value, read.value);
  addBookToLocalStorage(newBook);
});

function displayLibrary() {
  clearCurrentDisplay();
  for( let i = 0; i < myLibrary.length; i++ ){
    let cardDiv = document.createElement('div'),
        titleDiv = document.createElement('div'),
        contentDiv = document.createElement('div'),
        controlsDiv = document.createElement('div');
    cardDiv.classList.add('card');
    titleDiv.classList.add('card-header');
    titleDiv.innerHTML = `<span>${myLibrary[i].title}</span>`;
    cardDiv.appendChild(titleDiv);
    contentDiv.classList.add('card-body');
    contentDiv.innerHTML = `<span>Author: <b>${myLibrary[i].author}</b></span><br>
                            <span>pages: <b>${myLibrary[i].pages}</b></span><br>
                            <span>read_status: <b>${(myLibrary[i].read === 'false') ? 'Not read yet' : 'Already read'}</b></span><br>`;
    cardDiv.appendChild(contentDiv);
    booksDisplay.appendChild(cardDiv);
    // create Delete Button
    const bookDeleteButton = document.createElement('button');
    bookDeleteButton.dataset.index = i;
    bookDeleteButton.textContent = 'Delete';
    bookDeleteButton.id = 'book-delete';
    bookDeleteButton.classList.add('btn');
    bookDeleteButton.classList.add('btn-danger');
    bookDeleteButton.classList.add('btn-sm');
    controlsDiv.appendChild(bookDeleteButton);
    // create Toggle Button for readStatus
    const toggleButton = document.createElement('button');
    toggleButton.dataset.index = i;
    toggleButton.textContent = 'Mark As Read';
    toggleButton.id = 'read-status';
    toggleButton.classList.add('btn');
    toggleButton.classList.add('btn-success');
    toggleButton.classList.add('btn-sm');
    controlsDiv.appendChild(toggleButton);
    // wrap buttons into div element for further styling
    controlsDiv.classList.add('controls');
    cardDiv.appendChild(controlsDiv);
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