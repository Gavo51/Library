/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
const libraryContainer = document.querySelector(".library-container");
const newBookForm = document.querySelector("form");
const addBookBtn = document.querySelector(".add-book-btn");

const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  if (this.read === "READ") {
    this.read = "NOT READ";
  } else if (this.read === "NOT READ") {
    this.read = "READ";
  }
  refreshLibrary();
  displayLibrary();
};

// Add book to myLibrary array
function addBookToLibrary() {
  const bookTitle = document.getElementById("title").value;
  const bookAuthor = document.getElementById("author").value;
  const numPages = document.getElementById("pages").value;
  const radioCheck = document.getElementsByName("read_status");

  myLibrary.push(
    new Book(bookTitle, bookAuthor, numPages, checkIfRead(radioCheck))
  );
}

// Clear the library container every time a new book is added to myLibrary
function refreshLibrary() {
  while (libraryContainer.firstChild) {
    libraryContainer.removeChild(libraryContainer.lastChild);
  }
}

function displayLibrary() {
  // creates a new book card for each book object in myLibrary array
  myLibrary.forEach((book) => {
    const bookInfoCard = document.createElement("div");
    bookInfoCard.classList.add("book-card");

    // Section for book title
    const titleSection = document.createElement("div");

    const bookTitle = document.createElement("h1");
    bookTitle.textContent = book.title;

    titleSection.appendChild(bookTitle);

    // Section for the book information, read status and delete button
    const infoSection = document.createElement("div");

    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("p");
    bookAuthor.textContent = `Author: ${book.author}`;
    bookPages.textContent = `Pages: ${book.pages}`;

    // Read status toggle button
    const readButton = document.createElement("button");
    readButton.classList.add("read-status-toggle");
    readButton.addEventListener("click", () => {
      book.toggleRead();
    });
    readButton.textContent = book.read;

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
      deleteBook(myLibrary.indexOf(book));
    });
    deleteButton.textContent = "DELETE";

    infoSection.appendChild(bookAuthor);
    infoSection.appendChild(bookPages);
    infoSection.appendChild(readButton);
    infoSection.appendChild(deleteButton);

    bookInfoCard.appendChild(titleSection);
    bookInfoCard.appendChild(infoSection);

    libraryContainer.appendChild(bookInfoCard);
  });
}

function checkIfRead(selectedRadio) {
  return selectedRadio[0].checked ? "READ" : "NOT READ";
}

// Delete book from myLibrary
function deleteBook(bookIndex) {
  myLibrary.splice(bookIndex, 1);
  refreshLibrary();
  displayLibrary();
}

addBookBtn.addEventListener("click", () => {
  newBookForm.classList.toggle("active");
});

newBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
  refreshLibrary();
  displayLibrary();
});
