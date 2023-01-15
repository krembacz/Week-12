//Assigning variables from elements in the DOM 
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let errorMsg = document.getElementById("err");
let author = document.getElementById("authorInput");
let date = document.getElementById("dateInput");
let textArea = document.getElementById("textArea");
let cards = document.getElementById("saved");
let add = document.getElementById("add");


//On form submission, page does NOT reload, and formVal() function is invoked. 
form.addEventListener("submit", (e) => {
    e.preventDefault();
    formVal();
});


//Validation- determines if input will be accepted or not. If input is blank, error message. 
let formVal = () => {
    if (textInput.value === "") {
        console.log("Could not save entry")
        errorMsg.innerText = "Title cannot be blank";
    }
    else {
        console.log("Book has been submitted")
        errorMsg.innerText = "";
        dataPass();
        add.setAttribute("data-bs-dismiss", "modal")
        add.click();

        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })();
    }
};


//assigning empty variable to put in the input data 
let data = {};


//function that will add input into the created data variable 
let dataPass = () => {
    data["title"] = textInput.value.trim();
    data["author"] = authorInput.value.trim();
    data["date"] = dateInput.value;
    data["notes"] = textArea.value.trim();

    createCards();
};


//when the input is passed into data var, cards with info formatted via html is added to div id
let createCards = () => {
    cards.innerHTML += `
        <div id="individual" class="card">
            <span>${data.title}</span>
            <p>${data.author}</p>
            <span>${data.date}</span>
            <p>${data.notes}</p>

            <span class="options">
            <i onClick="editEntry(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick="deleteBook(this)" class="fas fa-trash"></i>
            </span>
        </div>
    `;

    resetForms();
};


//Once card in DOM has been created, this func. resets the modal forms 
let resetForms = () => {
    textInput.value = "";
    authorInput.value = "";
    dateInput.value = "";
    textArea.value = "";
};


//targeting parent of parent element to connect previous input, modal accepts updated input 
let editEntry = (e) => {
    let selectedBook = e.parentElement.parentElement;

    textInput.value = selectedBook.children[0].innerHTML;
    authorInput.value = selectedBook.children[1].innerHTML;
    dateInput.value = selectedBook.children[2].innerHTML;
    textArea.value = selectedBook.children[3].innerHTML;

    selectedBook.remove();
};


//removes parent of parent element (invidiaul card div)
let deleteBook = (e) => {
    e.parentElement.parentElement.remove();
};


