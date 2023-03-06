/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
const libraryContainer = document.querySelector(".library-container");
const newBookForm = document.querySelector("form");
const displayFormBtn = document.querySelector(".display-form-btn");
const cancelBtn = document.querySelector(".cancel-button");

const myLibrary = [];

// Book constructor
function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

Book.prototype.toggleReadStatus = function () {
  if (this.readStatus) {
    this.readStatus = false;
  } else if (!this.readStatus) {
    this.readStatus = true;
  }
  refreshLibrary();
  displayLibrary();
};

Book.prototype.showReadStatus = function () {
  return this.readStatus ? "Already read" : "Not read";
};

// Add book to myLibrary array
function addBookToLibrary() {
  const bookForm = document.getElementById("book-form");
  const bookTitle = document.getElementById("title").value;
  const bookAuthor = document.getElementById("author").value;
  const numPages = document.getElementById("pages").value;
  const checkboxStat = document.getElementById("read-status").checked;

  myLibrary.push(new Book(bookTitle, bookAuthor, numPages, checkboxStat));

  bookForm.reset();
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

    // Section for the book information and read status
    const infoSection = document.createElement("div");

    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("p");
    const readStatus = document.createElement("p");
    bookAuthor.textContent = `Author: ${book.author}`;
    bookPages.textContent = `Pages: ${book.pages}`;
    readStatus.textContent = `Status: ${book.showReadStatus()}`;

    // Read status toggle button
    const statusButton = document.createElement("button");
    statusButton.classList.add("read-status-toggle");
    statusButton.addEventListener("click", () => {
      book.toggleReadStatus();
    });
    statusButton.textContent = "CHANGE STATUS";

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
      deleteBook(myLibrary.indexOf(book));
    });
    deleteButton.textContent = "DELETE";

    infoSection.appendChild(bookAuthor);
    infoSection.appendChild(bookPages);
    infoSection.appendChild(readStatus);
    infoSection.appendChild(statusButton);
    infoSection.appendChild(deleteButton);

    bookInfoCard.appendChild(titleSection);
    bookInfoCard.appendChild(infoSection);

    libraryContainer.appendChild(bookInfoCard);
  });
}

// Delete book from myLibrary
function deleteBook(bookIndex) {
  myLibrary.splice(bookIndex, 1);
  refreshLibrary();
  displayLibrary();
}

displayFormBtn.addEventListener("click", () => {
  newBookForm.classList.toggle("active");
});

cancelBtn.addEventListener("click", () => {
  newBookForm.classList.toggle("active");
});

newBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
  refreshLibrary();
  displayLibrary();
});
