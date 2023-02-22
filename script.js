const displayContainer = document.querySelector(".library-container");

const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const book1 = new Book("Harry Potter", "J.K Rowling", 600, "read");
const book2 = new Book("The Hobbit", "J.R.R Tolkien", 300, "read");

// Add book to myLibrary array
function addBookToLibrary() {
  myLibrary.push(book1);
  myLibrary.push(book2);
}

function displayLibrary() {
  myLibrary.forEach((book) => {
    const bookInfoCard = document.createElement("div");
    const bookInfoList = document.createElement("ul");

    Object.keys(book).forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = book[item];
      bookInfoList.appendChild(listItem);
    });

    bookInfoCard.appendChild(bookInfoList);
    displayContainer.appendChild(bookInfoCard);
  });
}

addBookToLibrary();
displayLibrary();
