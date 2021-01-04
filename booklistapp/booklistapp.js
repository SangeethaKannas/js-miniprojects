class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class BooksUI {
    static displayBooks () {

        const storedBooks = [
            {
                title: 'You Dont Know JS',
                author: 'Kyle Simpson',
                isbn: '1231234'
            },
            {
                title: 'Eloquent Javascript',
                author: 'Jane Doe',
                isbn: '45-23-ABCD-234'
            }
        ];

        const books = storedBooks
        books.forEach(book => BooksUI.addBookToList(book))
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list')

        const row = document.createElement('tr')
        row.innerHTML = `<td>${book.title}</td>
            <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td><a href="#" class="btn btn-danger btn-sm-delete">X</a></td>`
        list.appendChild(row);
    }

    static clearFields() {
        document.querySelector('#title').value = ''
        document.querySelector('#author').value = ''
        document.querySelector('#isbn').value = ''
    }

    static deleteBook(e1) {
        if(e1.classList.contains('btn-sm-delete')) {
            e1.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div')
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container')
        const form = document.querySelector('#book-form')
        container.insertBefore(div, form)

        //Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000)
    }

}

class Storage {
    static getBooks() {
        return JSON.parse( localStorage.getItem('books') || [] )
    }

    static addBook(book) {
        const books = Storage.getBooks()
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(isbn) {
        const books = Storage.getBooks()
        books.remove(
            books.find(book => book.isbn === isbn)
        )
        localStorage.setItem('books', JSON.stringify(books))
    }

}

//EVent : Display Books
document.addEventListener('DOMContentLoaded', function init() {
    BooksUI.displayBooks();

    //Event Add a Book
    document.querySelector("#book-form").addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.querySelector('#title').value
        const author = document.querySelector('#author').value
        const isbn = document.querySelector('#isbn').value

        if(title === '' || author === '' || isbn === '') {
            BooksUI.showAlert('Please fill in all fields', 'danger')
        } else {
            const book = new Book(title, author, isbn)
            BooksUI.addBookToList(book)
            Storage.addBook(book)
            BooksUI.showAlert('Book Added', 'success');
            BooksUI.clearFields();
        }
    });

    //Event Remove a book

    document.querySelector('#book-list').addEventListener('click', (e) => {
        e.preventDefault();

        BooksUI.deleteBook(e.target);
        Storage.removeBook(book);
        BooksUI.showAlert('Book Removed', 'success');
    });
})
