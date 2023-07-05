const table = document.querySelector('#results tbody');
const url = 'http://localhost:3030/jsonstore/collections/students';
const firstNameInput = document.querySelector('[name="firstName"]');
const lastNameInput = document.querySelector('[name="lastName"]');
const facultyNumberInput = document.querySelector('[name="facultyNumber"]');
const gradeInput = document.querySelector('[name="grade"]');

function solve() {
    displayElements();
    document.getElementById('submit').addEventListener('click',submit);

}
solve()
async function submit(e){
    e.preventDefault();
    if(firstNameInput.value ==='' && lastNameInput.value==='' && facultyNumberInput.value===''&&gradeInput.value==='' ){
        return;
    }
    table.replaceChildren();
    let firstName=firstNameInput.value;
    let lastName=lastNameInput.value;
    let facultyNumber=facultyNumberInput.value;
    let grade=gradeInput.value;
    await postElements({ firstName, lastName, facultyNumber, grade });
    await displayElements();
    firstName='';
    lastName='';
    facultyNumber='';
    grade='';

}
async function postElements(message) {
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'aplication/json'
        },
        body: JSON.stringify(message)
    }
    const response=await fetch(url,options);
    const result=await response.json();

    return result;
}

async function displayElements() {
    const response = await fetch(url);
    const data = await response.json();
    const students = Object.values(data);
    students.forEach(student => {
        const tr = document.createElement('tr');
        const tdFirstName = document.createElement('td');
        tdFirstName.textContent = student.firstName;
        const tdLastName = document.createElement('td');
        tdLastName.textContent = student.lastName;
        const tdFNumber = document.createElement('td');
        tdFNumber.textContent = student.facultyNumber;
        const tdGrade = document.createElement('td');
        tdGrade.textContent = student.grade;
        tr.append(tdFirstName);
        tr.append(tdLastName);
        tr.append(tdFNumber);
        tr.append(tdGrade);
        table.append(tr);
    });
    return table;
}