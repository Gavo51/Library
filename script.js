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
  console.log(myLibrary);
  // creates a new book card for each book object in myLibrary array
  myLibrary.forEach((book) => {
    const bookInfoCard = document.createElement("div");
    const bookInfoList = document.createElement("ul");

    const bookData = [book.title, book.author, book.pages];

    bookData.forEach((property) => {
      const listItem = document.createElement("li");
      listItem.textContent = property;
      bookInfoList.appendChild(listItem);
    });

    // create read/not read toggle button
    const readButton = document.createElement("button");
    readButton.addEventListener("click", () => {});
    readButton.textContent = book.read;

    // create delete button
    const deleteButton = document.createElement("button");
    deleteButton.addEventListener("click", () => {
      deleteBook(myLibrary.indexOf(book));
    });
    deleteButton.textContent = "DELETE";

    bookInfoCard.appendChild(bookInfoList);
    bookInfoCard.appendChild(readButton);
    bookInfoCard.appendChild(deleteButton);
    libraryContainer.appendChild(bookInfoCard);
  });
}

// Delete book from myLibrary
function deleteBook(bookIndex) {
  myLibrary.splice(bookIndex, 2);
  refreshLibrary();
  displayLibrary();
}

newBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
  refreshLibrary();
  displayLibrary();
});
