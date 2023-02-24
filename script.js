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
  if (selectedRadio[0].checked) {
    return "Read";
  }
  if (selectedRadio[1].checked) {
    return "Not Read";
  }
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
});
