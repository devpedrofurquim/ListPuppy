// Importing database from Firebase
import {getDatabase, ref, push, onValue, remove} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';
import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';

// Input field
const inputField = document.getElementById('input-field');
//Button Add
const addBtn = document.getElementById('add-button');
// Ul parent element
let groceriesList = document.getElementById('groceries-list');
const userImg = document.getElementById('user-image');
const menuContainer = document.getElementById('menu');
const mainContainer = document.getElementById('main-container');
// Trashdog parent element
// let trashDog = document.getElementById('drop-target');
// TrashImage child element
// let trashImage = document.getElementById('drop-image');
// Database URL
const appSettings = {
    databaseURL: 'https://playground-44767-default-rtdb.firebaseio.com/',
}
// Initialize app
const app = initializeApp(appSettings);

const database = getDatabase(app);
// Create groceries array
const groceriesInDB = ref(database, "groceries")
// Add button event listener on click
addBtn.addEventListener('click', addValue);

onValue(groceriesInDB, function(snapshot) {

    if (snapshot.exists()) {

        let groceriesArr = Object.entries(snapshot.val());
    
        clearGroceriesEl(groceriesList);
    
        IterateEachItem(groceriesArr);
    } else {
        clearGroceriesEl(groceriesList);
        let message = document.createElement("h3");
        message.append(document.createTextNode("Cart is empty"));
        groceriesList.appendChild(message);
    }

})
// push value to the groceries database
function addValue() {

    let inputValue = inputField.value;

    push(groceriesInDB, inputValue);

    clearInput(inputField);
}
// Clear ul parent element
function clearGroceriesEl(el) {
    el.innerHTML = "";
}
// Clear input
function clearInput(input) {
    input.value = "";
}
// Iterate over each item of the array
function IterateEachItem(arr) {
    for (let i = 0; i < arr.length; i++) {
        let currentItem = arr[i];
        // Append current item to the groceries list
        appendItemTogroceriesList(groceriesList, currentItem);
    }
}

function appendItemTogroceriesList(list, val) {
    let itemID = val[0];
    let itemValue = val[1];
 
    let groceriesItem = document.createElement('li');
    groceriesItem.appendChild(document.createTextNode(itemValue));
    list.appendChild(groceriesItem);

    groceriesItem.setAttribute('id', `${itemID}`);
    groceriesItem.setAttribute('draggable', `${true}`);

    groceriesItem.addEventListener('dragstart', dragStart);

    groceriesItem.addEventListener('dragend', dragEnd);


    // trashImage.addEventListener('dragleave', function(e) {
    //     dragLeave(e);
    // });
    

    function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hidden');
        // trashDog.classList.add('visible');

        // trashImage.addEventListener('dragover', function() {
        //     // trashImage.style.width = "60px";
        // })
    }, 0);
}

// function dragLeave(e) {
//     let itemID = e.dataTransfer.getData('text/plain');

//     let locationInDb = ref(database, `groceries/${itemID}`);
//     remove(locationInDb);

//     trashDog.classList.remove('visible');
// }

function dragEnd() {
    groceriesItem.classList.remove('hidden');
    groceriesItem.classList.add('visible');
    // trashDog.classList.remove('visible');

}

      groceriesItem.addEventListener("dblclick", function() {
        let locationInDb = ref(database, `groceries/${itemID}`);
        remove(locationInDb);
    })

    groceriesItem.addEventListener("mouseover", function() {
        this.style.backgroundColor = '#df1c1c';
        this.style.color = '#FDFDFD';
        groceriesItem.addEventListener("mouseout", function() {
            this.style.backgroundColor = "#FFFDF8";
            this.style.color = '#432000';
        })
    })
}

userImg.addEventListener('click', function() {
    menuContainer.style.visibility = "visible";
    menuContainer.classList.add('menu-fade-in');
    mainContainer.classList.add('opacity-0');
    mainContainer.classList.add('main-fade-in');
    mainContainer.style.cursor = 'pointer';

    mainContainer.addEventListener('click', function() {
    menuContainer.classList.remove('menu-fade-in');
    mainContainer.classList.remove('opacity-0');
    mainContainer.classList.remove('main-fade-in');
    menuContainer.style.visibility = "hidden";
    })

})
