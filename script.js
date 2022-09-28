const modal = document.getElementById('form-modal');
const addBtn = document.getElementById('add-btn');
const closeBtn = document.getElementsByClassName('close')[0];
const statusBtn = document.getElementById('status-btn');
const submitBtn = document.getElementById('submit-btn');
const booksZone = document.getElementById('books-zone');
var bookTitle = '-';
var bookAuthor = '-';
var bookPages = '0';
var bookStatus = 'Not Read';
let myLibrary = [];

function Book(name, author, pages, status){
    this.title = name;
    this.author = author;
    this.pagesnum = pages;
    this.status = status
}

function getValues(){
    bookTitle = document.getElementById('book-title').value;
    bookAuthor = document.getElementById('book-author').value;
    bookPages = document.getElementById('book-pages').value;
    bookStatus = document.getElementById('status-btn').innerHTML;
}

function clearForm(){
    document.getElementById('book-title').value = '';
    document.getElementById('book-author').value = '';
    document.getElementById('book-pages').value = '';
    statusBtn.innerHTML = 'Not Read';
    statusBtn.classList.remove('read');
}

function addToLibrary(){
    myLibrary.push(new Book(bookTitle, bookAuthor, bookPages, bookStatus));
}

function addBookCard(){
        let newCard = document.createElement('div');
        let imgDiv = document.createElement('div');
        let infoDiv = document.createElement('div');
        let textDiv = document.createElement('div');
        let buttonsDiv = document.createElement('div');
        let newTitle = document.createElement('p');
        let newAuthor = document.createElement('p');
        let newPages = document.createElement('p');
        let newStatus = document.createElement('button');
        let bookImage = document.createElement('img');
        let removeBtn = document.createElement('img');

        bookImage.src = "./book-cover.jpg";
        removeBtn.src = "./dustbin.png"
        bookImage.classList.add('book-cover');
        newTitle.textContent = `Title: ${bookTitle}`;
        newAuthor.textContent = `Author: ${bookAuthor}`;
        newPages.textContent = `Nr. of Pages: ${bookPages}`;
        newStatus.innerHTML = bookStatus;
        newStatus.classList.add('status-btn');
        newStatus.classList.add('unread');

        if(!myLibrary.some(book => book.title === bookTitle)){
            imgDiv.appendChild(bookImage);
            textDiv.appendChild(newTitle);
            textDiv.appendChild(newAuthor);
            textDiv.appendChild(newPages);
            buttonsDiv.appendChild(newStatus);
            buttonsDiv.appendChild(removeBtn);
    
            if(bookStatus === 'Read'){
                newStatus.classList.add('read')
            }
    
            newStatus.addEventListener('click', () => {
                if (newStatus.innerHTML === 'Not Read'){
                    newStatus.innerHTML = 'Read'
                }
                else{
                    newStatus.innerHTML = 'Not Read'
                }
                newStatus.classList.toggle('read')
            })

            removeBtn.addEventListener('click', () => {
                myLibrary.splice(newCard.arrayIndex, 1);
                document.getElementById('books-zone').removeChild(newCard);
            })
            
            removeBtn.setAttribute('id', 'remove-btn');
            imgDiv.setAttribute('id', 'bookImage');
            newCard.setAttribute('id', 'book-card');
            newCard.setAttribute('arrayIndex', myLibrary.length);
            infoDiv.setAttribute('id', 'bookInfo');
            textDiv.setAttribute('id', 'infoText')
            buttonsDiv.setAttribute('id', 'buttons');
            infoDiv.appendChild(textDiv);
            infoDiv.appendChild(buttonsDiv);
            newCard.appendChild(imgDiv);
            newCard.appendChild(infoDiv);
            booksZone.appendChild(newCard);
            }
            
            else{
                alert('Book already in library');
                myLibrary.splice(newCard.arrayIndex, 1);
            }
        }
       

addBtn.addEventListener('click', () => {
    modal.style.display = 'block'
})

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    clearForm();
})

statusBtn.addEventListener('click', () => {
    if (statusBtn.innerHTML === 'Not Read'){
        statusBtn.innerHTML = 'Read'
    }
    else{
        statusBtn.innerHTML = 'Not Read'
    }

    statusBtn.classList.toggle('read')
})

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    getValues();
    clearForm();
    modal.style.display = 'none';
    addBookCard();
    addToLibrary();
})