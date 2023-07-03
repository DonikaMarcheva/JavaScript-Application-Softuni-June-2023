function attachEvents() {
    document.getElementById('refresh').addEventListener('click', load);
    document.getElementById('submit').addEventListener('click', onSubmit)
    load();
}
const list = document.getElementById('messages');
const authorInput = document.querySelector('[name="author"]');
const contentInput = document.querySelector('[name="content"]');

async function onSubmit() {
    const author = authorInput.value;
    const content = contentInput.value;

    const result= await createMessage({ author,content });

    contentInput.value='';
    list.value+=`\n${author}: ${content}`;
}

async function load() {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const response = await fetch(url);
    const data = await response.json();

    const messages = Object.values(data);
    list.value = messages.map(x => `${x.author}: ${x.content}`).join('\n');
}

async function createMessage(message) {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    }
    const response = await fetch(url, options);
    const result = await response.json();

    return result;
}
attachEvents();