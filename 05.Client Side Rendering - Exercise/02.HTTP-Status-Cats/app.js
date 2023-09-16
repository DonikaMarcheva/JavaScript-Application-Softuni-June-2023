import { html, render } from '../node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';

const root = document.getElementById('allCats');

const catTemplate = html`
<ul>
    ${cats.map(cat => createCatCard(cat))}
</ul>
`
render(catTemplate, root);

function createCatCard(cat) {
    return html`
    <li>
                <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
                <div class="info">
                    <button @click="${showContent}" class="showBtn">Show status code</button>
                    <div class="status" style="display: none" id=${cat.id}>
                        <h4 class="card-title">Status Code: ${cat.statusCode}</h4>
                        <p class="card-text">${cat.statusMessage}</p>
                    </div>
                </div>
            </li>
    `
}

function showContent(e) {
    const contentContainer = e.target.parentElement.querySelector('div');
    const currentState = contentContainer.style.display;

    if (currentState == "block") {
        e.target.textContent = "Show status code";
        contentContainer.style.display = "none";
    } else {
        contentContainer.style.display = "block";
        e.target.textContent = "Hide status code";

    }
    return contentContainer
}

