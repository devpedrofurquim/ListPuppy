import {getDatabase, ref, push, onValue, remove} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';
import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';

const inputField = document.getElementById('input-field');
const addBtn = document.getElementById('add-button');
let groceriesList = document.getElementById('groceries-list');


const appSettings = {
    databaseURL: 'https://playground-44767-default-rtdb.firebaseio.com/',
}

const app = initializeApp(appSettings);

const database = getDatabase(app);

const groceriesInDB = ref(database, "groceries")

addBtn.addEventListener('click', addValue);

onValue(groceriesInDB, function(snapshot) {

    if (snapshot.exists()) {

        let groceriesArr = Object.entries(snapshot.val());

        // console.log(snapshot.val())
    
        clearGroceriesEl(groceriesList);
    
        IterateEachItem(groceriesArr);
    } else {
        clearGroceriesEl(groceriesList);
        let message = document.createElement("h3");
        message.append(document.createTextNode("Cart is empty"));
        groceriesList.appendChild(message);
    }

})

function addValue() {

    let inputValue = inputField.value;

    push(groceriesInDB, inputValue);

    clearInput(inputField);
}

function clearGroceriesEl(el) {
    el.innerHTML = "";
}

function clearInput(input) {
    input.value = "";
}

function IterateEachItem(arr) {
    for (let i = 0; i < arr.length; i++) {
        let currentItem = arr[i];

        appendItemTogroceriesList(groceriesList, currentItem);

    }
}

function appendItemTogroceriesList(list, val) {
    let itemID = val[0];
    let itemValue = val[1];
 
    let groceriesItem = document.createElement('li');
    groceriesItem.appendChild(document.createTextNode(itemValue));
    list.appendChild(groceriesItem);

    groceriesItem.addEventListener("dblclick", function() {
        let locationInDb = ref(database, `groceries/${itemID}`);
        remove(locationInDb);
    })

    groceriesItem.addEventListener("mouseover", function() {
        this.style.backgroundColor = '#A78BCB';
        groceriesItem.addEventListener("mouseout", function() {
            this.style.backgroundColor = "#FFFDF8";
        })
    })
}