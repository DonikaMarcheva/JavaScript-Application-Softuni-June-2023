async function solution() {
    let mainSection = document.getElementById('main');
    let url = 'http://localhost:3030/jsonstore/advanced/articles/list';
    let response = await fetch(url);
    let data = await response.json();
    data.forEach(element => {
        // let dataArr=Object.entries(element);
        let id = element['_id'];
        let title = element['title'];
        let divHTML = divCreator(title, id);
        mainSection.appendChild(divHTML);
    });
    function divCreator(title, id) {
        let accordeonDiv = createElements('div');
        accordeonDiv.classList.add('accordion');
        let headDiv = createElements('div');
        headDiv.classList.add('head');
        let titleSpan = createElements('span', title);
        let moreButon = createElements('button', 'More');
        moreButon.classList.add('button');
        moreButon.id = id;
        moreButon.addEventListener('click', more);
        headDiv.appendChild(titleSpan);
        headDiv.appendChild(moreButon);
        accordeonDiv.appendChild(headDiv);
        return accordeonDiv;
    }
    async function more(e) {
        let button = e.target;
        let id = button.id;
        let url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;
        let response = await fetch(url);
        let data = await response.json();
        let text = data.content;
        if (button.textContent === 'More') {
            let htmlExtraDiv = extraDivCreator(text);
            button.parentElement.parentElement.appendChild(htmlExtraDiv);
            let extraDivEl = button.parentElement.parentElement.querySelector('.extra');
            extraDivEl.style.display = 'block';
            button.textContent = 'Less';
        } else {
            button.textContent = 'More';
            let extraDivEl = button.parentElement.parentElement.querySelector('.extra');
            console.log(extraDivEl);
            extraDivEl.style.display = 'none';
        }
    }
    function extraDivCreator(text) {
        let extraDiv = createElements('div');
        extraDiv.classList.add('extra');
        extraDiv.style.display = 'none';
        let paragraphEl = createElements('p', text);
        extraDiv.appendChild(paragraphEl);
        return extraDiv;
    }
    function createElements(tagname, content) {
        let el = document.createElement(`${tagname}`);
        if (content) {
            el.textContent = content;
        }
        return el;
    }
}
solution();
