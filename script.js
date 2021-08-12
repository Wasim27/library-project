const formContainer = document.getElementById("container")
const bookShelf = document.getElementById("bookshelf")
const form = document.getElementById("form")
const addBtn = document.getElementById("add-btn")
const closeBtn = document.getElementById("close-btn")
const removeBtn = document.getElementById("remove-btn")
let formOpen = false;
let books = JSON.parse(localStorage.getItem("books")) || [];

addBtn.addEventListener("click", openForm)
closeBtn.addEventListener("click", closeForm)
form.addEventListener("submit", (e, i) => {
  e.preventDefault();
  addBook(i)
})

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function openForm() {
  formContainer.style.transform = "scale(1)"
  formOpen = true;
}

function closeForm() {
  formContainer.style.transform = "scale(0)"
  form.reset();
  formOpen = false;
}

function addBook(i) {
  let newBook = document.createElement("div");
  newBook.classList.add("book-card")
  newBook.setAttribute("data-index", `${i}`)

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").value;

  const newTitle = document.createElement("h2");
  newTitle.innerHTML = `Title: <br> ${title}`;

  const newAuthor = document.createElement("h2");
  newAuthor.innerHTML = `Author: <br> ${author}`;

  const newPages = document.createElement("h2");
  newPages.innerHTML = `Pages: <br> ${pages}`;

  let newRead = document.createElement("button");
  newRead.classList.add("read-btn")
  if(document.getElementById("read").checked) {
    newRead.innerHTML = "Finished";
  } else {
    newRead.innerHTML = "Not Finished"
  }

  let removeBook = document.createElement("button");
  removeBook.classList.add("remove-btn");
  removeBook.innerHTML = "Remove Book"

  const book = new Book(title, author, pages, read)
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));

  newBook.appendChild(newTitle)
  newBook.appendChild(newAuthor)
  newBook.appendChild(newPages)
  newBook.appendChild(newRead)
  newBook.appendChild(removeBook)
  bookShelf.appendChild(newBook);
  closeForm();

  newRead.addEventListener("click", () => {
    if(newRead.innerHTML === "Finished") {
      newRead.innerHTML = "Not Finished"
      books[i].read = false
      localStorage.setItem("books", JSON.stringify(books));
    } else {
      newRead.innerHTML = "Finished"
      books[i].read = true
      localStorage.setItem("books", JSON.stringify(books));
    }
  })

  removeBook.addEventListener("click", () => {
    bookShelf.removeChild(newBook);
    books.splice(newBook, 1)
    localStorage.setItem("books", JSON.stringify(books));
  })
}

function getBooks() {
  books.forEach(function (book, i) {
    let newBook = document.createElement("div");
    newBook.classList.add("book-card")
    newBook.setAttribute("data-index", `${i}`)

    const newTitle = document.createElement("h2");
    newTitle.innerHTML = `Title: <br> ${book.title}`;

    const newAuthor = document.createElement("h2");
    newAuthor.innerHTML = `Author: <br> ${book.author}`;

    const newPages = document.createElement("h2");
    newPages.innerHTML = `Pages: <br> ${book.pages}`;

    let newRead = document.createElement("button");
    newRead.classList.add("read-btn")
    if(books[i].read === true) {
      newRead.innerHTML = "Finished";
    } else {
      newRead.innerHTML = "Not Finished"
    }

    let removeBook = document.createElement("button");
    removeBook.classList.add("remove-btn");
    removeBook.innerHTML = "Remove Book"

    newBook.appendChild(newTitle)
    newBook.appendChild(newAuthor)
    newBook.appendChild(newPages)
    newBook.appendChild(newRead)
    newBook.appendChild(removeBook)
    bookShelf.appendChild(newBook);

    newRead.addEventListener("click", () => {
      if(newRead.innerHTML === "Finished") {
        newRead.innerHTML = "Not Finished"
        books[i].read = false
        localStorage.setItem("books", JSON.stringify(books));
      } else {
        newRead.innerHTML = "Finished"
        books[i].read = true
        localStorage.setItem("books", JSON.stringify(books));
      }
    })

    removeBook.addEventListener("click", () => {
      bookShelf.removeChild(newBook);
      books.splice(newBook, 1)
      localStorage.setItem("books", JSON.stringify(books));
    })
  })
}

getBooks();
