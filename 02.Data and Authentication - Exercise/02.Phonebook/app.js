function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', load);
    document.getElementById('btnCreate').addEventListener('click', create);

}
const personInput = document.getElementById('person');
const phoneInput = document.getElementById('phone');
const phoneBookUl = document.getElementById('phonebook');


async function create() {
    const person = personInput.value;
    const phone = phoneInput.value;
    await createData({ person, phone });
    phoneBookUl.replaceChildren();
    load();
    personInput.value = '';
    phoneInput.value = '';
}

async function load() {
    let phoneBookData = await getPhones();
    phoneBookData.forEach(element => {
        const contactDetail = document.createElement('li');
        contactDetail.textContent = `${element.person}: ${element.phone}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.setAttribute('id', element._id);
        deleteButton.addEventListener('click', deleteEl)
        contactDetail.append(deleteButton);
        phoneBookUl.append(contactDetail);

    });
}
async function deleteEl(e) {
    const id = e.target.getAttribute('id');
    await deleteContact(id);
    e.target.parentElement.remove();
}

async function deleteContact(id) {
    const url = `http://localhost:3030/jsonstore/phonebook/${id}`;
    const response = await fetch(url, {
        method: 'delete'
    });
    const result = response.json();

    return result;
}

async function createData(message) {
    const url = ' http://localhost:3030/jsonstore/phonebook';
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'aplication/json'
        },
        body: JSON.stringify(message)
    }
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
}
async function getPhones() {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const res = await fetch(url);
    const data = await res.json();
    const phoneData = Object.values(data);

    return phoneData;
}

attachEvents();