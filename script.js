document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('.grid-container')
    const booksTable = document.querySelector('.books');
    const addBookBtn = document.querySelector('.add');

    const myLibrary = [
        new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, true),
        new Book('1984', 'George Orwell', 328, false)
    ];
    
    function Book(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.info = function() {
            const readYet = this.read ? 'read' : 'not read yet';
            return `${this.name} by ${this.author}, ${this.pages} pages, ${readYet}`
        };
        this.markAsRead = function() { this.read = !this.read };
    }

    const getFormData = (form) => {
        const formData = new FormData(form);

        return {
            title: formData.get('title'),
            author: formData.get('author'),
            pages: formData.get('pages'),
            read: formData.get('read') === 'on'
        };
    };
    const addBook = () => {
        const existingForm = document.querySelector('#add-book');
        if (existingForm) existingForm.remove();

        const addBookForm = document.createElement('form');
        addBookForm.id = 'add-book';

        const titleInput = document.createElement('input');
        titleInput.id = 'title';
        titleInput.name = 'title';
        titleInput.type = 'text';
        titleInput.placeholder = 'Title';

        const authorInput = document.createElement('input');
        authorInput.id = 'author';
        authorInput.name = 'author';
        authorInput.type = 'text';
        authorInput.placeholder = 'Author';

        const pagesInput = document.createElement('input');
        pagesInput.id = 'pages';
        pagesInput.name = 'pages';
        pagesInput.type = 'number';
        pagesInput.placeholder = 'Pages';

        const readInput = document.createElement('input');
        readInput.id = 'read';
        readInput.name = 'read';
        readInput.type = 'checkbox';

        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.id = 'submit';
        submitBtn.textContent = 'Add Book';

        addBookForm.appendChild(titleInput);
        addBookForm.appendChild(authorInput);
        addBookForm.appendChild(pagesInput);
        addBookForm.appendChild(readInput);
        addBookForm.appendChild(submitBtn);

        gridContainer.insertBefore(addBookForm, addBookBtn);

        addBookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const book = getFormData(addBookForm);
            addBookToLibrary(book.title, book.author, book.pages, book.read);
            displayBooks();
            addBookForm.remove();
        });
    };

    const removeBook = (index) => {
        myLibrary.splice(index, 1);
        displayBooks();
    };

    const displayBooks = () => {
        booksTable.innerHTML = '';
        myLibrary.forEach((book, index) => {
            const properties = ['title', 'author', 'pages', 'read'];
            const data = [book.title, book.author, book.pages, book.read ? 'Yes' : 'No'].map((content, i) => {
                const div = document.createElement('div');
                div.textContent = content;
                div.classList.add('row');
                div.classList.add(properties[i]);
                div.dataset.index = index;

                if (properties[i] === 'read') {
                    div.classList.add('read-flash');
                    div.addEventListener('click', () => {
                        myLibrary[index].markAsRead();
                        div.textContent = myLibrary[index].read ? 'Yes' : 'No';
                        div.classList.add('active');
                        setTimeout(() => {
                            div.classList.remove('active');
                        }, 300);
                    });
                }

                return div;
            });

            data.forEach(div => booksTable.appendChild(div));
            const removeDiv = document.createElement('div');
            removeDiv.classList.add('row');
            const removeBtn = document.createElement('button');
            removeBtn.id = 'remove-book';
            removeBtn.textContent = 'Remove';
            removeDiv.appendChild(removeBtn);
            booksTable.appendChild(removeDiv);

            removeBtn.addEventListener('click', () => {
                removeBook(index);
            })
        })
    };

    function addBookToLibrary(title, author, pages, read) {
        const newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);
    }

    addBookBtn.addEventListener('click', () => {
        addBook();
    })

displayBooks();

});
