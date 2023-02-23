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

/* const book1 = new Book("Harry Potter", "J.K Rowling", 600, "read");
const book2 = new Book("The Hobbit", "J.R.R Tolkien", 300, "read"); */

// Add book to myLibrary array
function addBookToLibrary() {
  const bookTitle = document.getElementById("title").value;
  const bookAuthor = document.getElementById("author").value;
  const numPages = document.getElementById("pages").value;
  const readStatus = document.getElementsByName("read_status").value;

  myLibrary.push(new Book(bookTitle, bookAuthor, numPages, readStatus));
}

// Clear the library container every time a new book is added to myLibrary
function clearLibrary() {
  while (libraryContainer.firstChild) {
    libraryContainer.removeChild(libraryContainer.lastChild);
  }
}

function displayLibrary() {
  myLibrary.forEach((book) => {
    const bookInfoCard = document.createElement("div");
    const bookInfoList = document.createElement("ul");

    Object.values(book).forEach((value) => {
      const listItem = document.createElement("li");
      listItem.textContent = value;
      bookInfoList.appendChild(listItem);
    });

    bookInfoCard.appendChild(bookInfoList);
    libraryContainer.appendChild(bookInfoCard);
  });
}

newBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary();
  clearLibrary();
  displayLibrary();
  console.log(myLibrary);
});
