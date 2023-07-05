const tbody = document.querySelector('tbody');
document.querySelector('form').addEventListener('submit', onSubmit);
document.getElementById('loadBooks').addEventListener('click', loadBooks);


async function onSubmit(e) {
    const book = getValues(e);
    if(book.author==='' || book.title===''){
        return;
    }
    await post(book);
}

async function loadBooks() {
    tbody.replaceChildren();
    await createTr();
}

async function editBook(e){
    const formH3Element=document.querySelector('form h3');
    formH3Element.textContent='Edit FORM';
    const titleInput=document.querySelector('form input[name="title"]');
    const authorInput=document.querySelector('form input[name="author"]');
    const id=e.target.dataset.id;
    const books=await load();
    const searchedBook=Object.values(books).find(book=>book._id===id);
    const title=searchedBook.title;
    const author=searchedBook.author;
    titleInput.value=title;
    authorInput.value=author; 
    const book={ author, title };
    await update(id,book);    
}

async function deleteTr(e){
    const id=e.target.dataset.id;
    console.log(e.target);
    await deleteBook(id);
    e.target.parentElement.parentElement.remove();
}

function getValues(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let title = data.get('title');
    let author = data.get('author');
    e.currentTarget.reset();
    const book = { author, title }
    return book;
}

async function createTr() {
    const booksObj = await load();
    const books = Object.entries(booksObj);
    books.forEach(book => {
        const title = book[1].title;
        const author = book[1].author;
        const id = book[0];
        console.log(id);
        const tr = document.createElement('tr');
        const tdTitle = document.createElement('td');
        tdTitle.textContent = title;
        const tdAuthor = document.createElement('td');
        tdAuthor.textContent = author;
        const tdButtons = document.createElement('td');
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.setAttribute('data-id', id);
        editBtn.addEventListener('click',editBook);
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.setAttribute('data-id', id);
        deleteBtn.addEventListener('click',deleteTr);
        tdButtons.append(editBtn);
        tdButtons.append(deleteBtn);
        tr.append(tdTitle);
        tr.append(tdAuthor);
        tr.append(tdButtons);
        tbody.append(tr);
        return tbody;
    });
}

async function load() {
    const url = 'http://localhost:3030/jsonstore/collections/books';
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
async function post(book) {
    const url = 'http://localhost:3030/jsonstore/collections/books';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    }
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
}
async function deleteBook(id) {
    const url = `http://localhost:3030/jsonstore/collections/books/${id}`;
    const options = {
        method: 'DELETE'
    }
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
}
async function update(id, book) {
    const url = `http://localhost:3030/jsonstore/collections/books/${id}`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    }
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
}
