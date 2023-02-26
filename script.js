const libraryContainer = document.querySelector(".library-container");
const newBookForm = document.querySelector("form");

const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function checkIfRead(selectedRadio) {
  return selectedRadio[0].checked ? "Read" : "Not read";
}

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
    const bookInfoList = document.createElement("ul");

    const bookData = [book.title, book.author, book.pages];

    bookData.forEach((element) => {
      const listItem = document.createElement("li");
      listItem.textContent = element;
      bookInfoList.appendChild(listItem);
    });

    const readButton = document.createElement("button");
    readButton.textContent = book.read;

    bookInfoCard.appendChild(bookInfoList);
    bookInfoCard.appendChild(readButton);
    libraryContainer.appendChild(bookInfoCard);
  });
}

newBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary();
  refreshLibrary();
  displayLibrary();
});
