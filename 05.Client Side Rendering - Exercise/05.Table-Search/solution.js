import { html,nothing,render } from '../node_modules/lit-html/lit-html.js';

const root=document.getElementsByTagName('tbody')[0];
const url='http://localhost:3030/jsonstore/advanced/table';

function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);
   
   onLoadContent();
   
   async function onLoadContent(text){
      const response= await fetch(url);
      const data=await response.json();
      
      const students=Object.values(data).map(s=>createTrTemplate(s,text));
      render(students,root);
   }

   function createTrTemplate(studentData,text){
      const studentDataValues=Object.values(studentData).splice(0,4);
      const match=studentDataValues
      .map(el=>el.toLowerCase())
      .find(el=>el.includes(text));
      return html `
       <tr class = "${match?"select":nothing}">
                <td>${studentData.firstName} ${studentData.lastName}</td>
                <td>${studentData.email}</td>
                <td>${studentData.course}</td>
            </tr>
            <tr>
      `
   }

   function onClick() {
      debugger
      const textField=document.getElementById('searchField');
      const text=textField.value.toLowerCase();
      onLoadContent(text);
      textField.value="";
   }
}
solve()





//=> 100/100 in judge but for me is the same but longest <===

// import { html, nothing, render } from "../node_modules/lit-html/lit-html.js";
// window.addEventListener("load", solve);

// // const root=document.getElementsByTagName('tbody')[0];

// async function solve() {
//   const url = "http://localhost:3030/jsonstore/advanced/table";

//   document.querySelector("#searchBtn").addEventListener("click", onClick);
//   const root = document.querySelector("tbody");
//   //   onLoadContent();

//   async function onLoadContent() {
//     const response = await fetch(url);
//     const data = await response.json();

//     //  const students = Object.values(data).map((s) => createTrTemplate(s, text));
//     //  render(students, root);

//     return [...Object.values(data)];
//   }

//   let result = await onLoadContent();

//   const createTrTemplate = (student) => html` <td>
//       ${student.firstName} ${student.lastName}
//     </td>
//     <td>${student.email}</td>
//     <td>${student.course}</td>`;

//   render(
//     result.map(
//       (student) =>
//         html`<tr>
//           ${createTrTemplate(student)}
//         </tr>`
//     ),
//     root
//   );

//   //   function createTrTemplate(studentData, text) {
//   //     const studentDataValues = Object.values(studentData).splice(0, 4);
//   //     const match = studentDataValues
//   //       .map((el) => el.toLowerCase())
//   //       .find((el) => el.includes(text));
//   //     return html`
//   //       <tr class="${match ? "select" : nothing}">
//   //         <td>${studentData.firstName} ${studentData.lastName}</td>
//   //         <td>${studentData.email}</td>
//   //         <td>${studentData.course}</td>
//   //       </tr>
//   //       <tr></tr>
//   //     `;
//   //   }

//   async function onClick() {
//     let textField = document.getElementById("searchField");
//     let text = textField.value.toLocaleLowerCase();

//     const students = root.children;

//     for (const student of students) {
//       student.classList.remove("select");
//       textField.value = "";

//       const studentChildren = student.children;
//       for (let row of studentChildren) {
//         let rowTextContent = row.textContent.toLocaleLowerCase();
//         if (rowTextContent.includes(text)) {
//           student.classList.add("select");
//         }
//       }
//     }
//   }

//   //   function onClick() {
//   //     debugger;
//   //     const textField = document.getElementById("searchField");
//   //     const text = textField.value.toLowerCase();
//   //     if (text === "") {
//   //       return;
//   //     }
//   //     onLoadContent(text);
//   //     textField.value = "";
//   //   }
// }

