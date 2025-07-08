const bookshelf = document.querySelector(".bookshelf")
const newButton = document.querySelector("#newButton");
const form = document.querySelector("#bookForm");

const myLibrary = [];

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

Book.prototype.getInfo = function() {
    return `${this.title}, ${this.author}, ${this.pages}, ${this.read}`;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read)
    newBook.id = crypto.randomUUID()
    myLibrary.push(newBook);
}

addBookToLibrary('The Hobbit', 'JK Tolkin', '1240', 'not read yet')
addBookToLibrary('Lord of the Rings', 'JK Tolkin', '5215', 'not read yet')
addBookToLibrary('Maze Runner', 'Someone', '951', 'not read yet')
addBookToLibrary('Maze Runner', 'Someone', '951', 'not read yet')

const displayBooks = () => {
    myLibrary.forEach((book) => {
        const newBook = document.createElement("div");
        newBook.id = book.id;
        newBook.classList.add('book');
        newBook.innerHTML = `
        <p class="info" id="title">${book.title}</p>
        <p class="info" id="author">${book.author}</p>
        <p class="info" id="pages">${book.pages}</p>
        <p class="info" id="read">${book.read}</p>
        <button class="deleteButton" id="${book.id}">Delete</button>`;
        bookshelf.appendChild(newBook);
    });
    // Add event listeners to all delete buttons
    const deleteButtons = document.querySelectorAll('.deleteButton');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookId = this.getAttribute('id');
            // Remove book from myLibrary
            const index = myLibrary.findIndex(book => book.id === bookId);
            if (index !== -1) {
                myLibrary.splice(index, 1);
            }
            // Clear and redisplay books
            bookshelf.innerHTML = '';
            displayBooks();
        });
    });
}

// Open modal
function openModal() {
  document.getElementById('modal').style.display = 'flex';
}
// Close modal
function closeModal() {
  document.getElementById('modal').style.display = 'none';
    form.reset(); // Reset the form fields
}
document.getElementById('closeModal').onclick = closeModal;
// Optional: close modal when clicking outside content
window.onclick = function(event) {
  if (event.target == document.getElementById('modal')) {
    form.reset(); // Reset the form fields
    closeModal();
  }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked ? 'read' : 'not read yet';

    addBookToLibrary(title, author, pages, read);
    bookshelf.innerHTML = ''; // Clear the bookshelf
    displayBooks(); // Redisplay the books
    closeModal(); // Close the modal after adding the book
});

newButton.addEventListener("click", openModal);

displayBooks();