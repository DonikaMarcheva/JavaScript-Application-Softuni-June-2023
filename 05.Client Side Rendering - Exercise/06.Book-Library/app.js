import { html, render } from "../node_modules/lit-html/lit-html.js";
import { get, post, del, put } from "./api.js";

const root = document.querySelector('body');

window.addEventListener('load', onLoad);

function onLoad() {
    const loadBookEl = html`<button id="loadBooks">LOAD ALL BOOKS</button>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
</tbody>
</table>
    `;
    render(loadBookEl, root);
    document.getElementById('loadBooks').addEventListener('click', loadBooks);
}

async function loadBooks() {
    const elements = html`
    <button id="loadBooks" @click="${loadBooks}">LOAD ALL BOOKS</button>
    <table>
        <thead>
    <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Action</th>
    </tr>
    </thead>
    <tbody>
</tbody>
</table>
<form id="add-form" >
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input @click="${addBook}" type="submit" value="Submit">
    </form>
    <form id="edit-form">
        <input type="hidden" name="id">
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Save">
    </form>
    `
    render(elements, root);
    document.getElementById('edit-form').style.display="none";
    document.getElementById('add-form').style.display="block";

    const tbody=document.querySelector('tbody');

    const data = await get('jsonstore/collections/books');
    const books = Object.values(data).map(book => createBookInfo(book));
    render(books, tbody)
}

function createBookInfo(book) {
    const trElement = html`
    <tr data-id="${book._id}">
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>
            <button @click="${editBook}">Edit</button>
            <button @click="${deleteBook}">Delete</button>
        </td>
    </tr>
    `
    return trElement;
}

async function addBook(e){
e.preventDefault();
const form=e.target.parentElement;
const formData=new FormData(form);
const title= formData.get('title');
const author=formData.get('author');
if(!title || !author){
    alert ('Emty field!');
    return;
}
const data= {author,title};
const result= await post('jsonstore/collections/books',data);
form.reset();
return result;
}

function editBook(e){
    const trElement=e.target.parentElement.parentElement;
    const id=trElement.dataset.id;
    const tdElements=trElement.children;
    const title=tdElements[0].textContent;
    const author=tdElements[1].textContent;
   
    const addForm=document.getElementById('add-form');
    addForm.style.display="none";
    const editForm=document.getElementById('edit-form');
    editForm.style.display="block";
    editForm.setAttribute('data-id',id);
    const titleField=editForm.querySelector('[name="title"]');
    titleField.value=title;
    const authorField=editForm.querySelector('[name="author"]');
    authorField.value=author;
    editForm.addEventListener('submit',saveChanges);
    trElement.remove();
}
async function saveChanges(e){
    e.preventDefault();
    const form=e.target;
    const formData=new FormData(form)
    const title=formData.get('title');
    const author=formData.get('author');
    const id=form.dataset.id;
    await put(`jsonstore/collections/books/${id}`,{author,title});
    form.removeAttribute('data-id');
    form.reset();
}

async function deleteBook(e){
    const trElement=e.target.parentElement.parentElement;
    const id=trElement.dataset.id;
    await del(`jsonstore/collections/books/${id}`);
    trElement
    trElement.remove();
}
