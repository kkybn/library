const body = document.querySelector('body');
const container = document.createElement('div');
const modal = document.querySelector('dialog');
const newBtn = document.querySelector('.new-button');
const closeBtn = document.querySelector('.close-button');
const addBtn = document.querySelector('.add-button');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readBox = document.querySelector('#read');
const myLibrary = [];

//////////////////////////// FUNCTIONS //////////////////////////////////

/*function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
};*/

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read
    }
}

function addBookToLib() {
    if (readBox.checked) {
        readBox.value = true
    } else {
        readBox.value = false
    };
    myLibrary.push(new Book(titleInput.value, authorInput.value, pagesInput.value, readBox.value));
};

function displayBooks() {
    for(let item of myLibrary) {
        const card = document.createElement('div');
        const bookTitle = document.createElement('p');
        const bookAuthor = document.createElement('p');
        const bookPages = document.createElement('p');
        const bookRead = document.createElement('p');
        const btnContainer = document.createElement('div');
        const delBtn = document.createElement('button');
        const readBtn = document.createElement('button');

        card.setAttribute('class', 'card');
        btnContainer.setAttribute('class', 'btn-container');
        delBtn.setAttribute('class', 'del-btn');
        readBtn.setAttribute('class', 'read-btn');
        
        container.appendChild(card);
        card.appendChild(bookTitle);
        card.appendChild(bookAuthor);
        card.appendChild(bookPages);
        card.appendChild(bookRead);
        card.appendChild(btnContainer);
        btnContainer.appendChild(delBtn);
        btnContainer.appendChild(readBtn);
        bookTitle.textContent = `Title: ${item.title}`;
        bookAuthor.textContent = `Author: ${item.author}`;
        bookPages.textContent = `Pages: ${item.pages}`;
        if (item.read === true || item.read === 'true') {
            bookRead.textContent = 'Read: Yes';
            readBtn.textContent = 'Unread';
            readBtn.classList.toggle('unread');
            
        } else {
            bookRead.textContent = 'Read: No';
            readBtn.textContent = 'Read';
        };
        
        delBtn.textContent = 'Delete';
        delBtn.addEventListener('click', () => {
            container.removeChild(card);
            myLibrary.splice(myLibrary.indexOf(item), 1);
        });
        
        readBtn.addEventListener('click', () => {
            readBtn.classList.toggle('unread');
            if (readBtn.textContent === 'Read') {
                readBtn.textContent = 'Unread';
                bookRead.textContent = 'Read: Yes';
                item.read = true;
            } else {
                readBtn.textContent = 'Read'
                bookRead.textContent = 'Read: No';
                item.read = false;
            };
        });

    };
};

function removeBooks() {
    while (container.firstChild) {
        container.removeChild(container.lastChild);
      }
};

function clearFields() {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
};
/////////////////////////////////////////////////////////////////////////

container.setAttribute('class', 'container');
body.appendChild(container);

modal.addEventListener('cancel', (event) => {
    event.preventDefault();
});

newBtn.addEventListener('click', () => {
    modal.showModal();
});

closeBtn.addEventListener('click', () => {
    modal.close();
    clearFields();
    readBox.checked = false;
});

addBtn.addEventListener('click', () => {
    if (titleInput.value !== '' && authorInput.value !== '' && (pagesInput.value !== '' && pagesInput.value.match(/^[0-9]*$/))) {
        addBookToLib();
    };
    removeBooks();
    modal.close();
    displayBooks();
    clearFields();
    readBox.checked = false;
});


const sample1 = new Book('The War of the Worlds', 'H.G. Wells', 287, false);
const sample2 = new Book('Annihilation', 'Jeff VanderMeer', 208, true);

myLibrary.push(sample1, sample2);

displayBooks();

