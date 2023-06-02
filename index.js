import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js"

const appSettings = {
    databaseURL:"https://todoapp-4664e-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const todoapp = ref(database, "todo");   //nosql key and value pair

const inputField = document.getElementById("taskin");  //used to fetch from html form
const addtask = document.getElementById("add");
const taskli = document.getElementById("todo-list");

addtask.addEventListener("click", function(){
    let taskval = inputField.value;  //when clicked , it will be saved in the db
    if(taskval!='') {
        push(todoapp, taskval);
        clearInput();
    }
    
})

const clearInput = () => {
    inputField.value = '';   //after submitting once , it will be cleared for the next input
} 

onValue(todoapp, function(snapshot) {   //data in the db at any particular time is snapshot
    if(snapshot.exists()) {
        let items = Object.entries(snapshot.val());
        clearList();
        for(let i=0; i<items.length; i++) {
            let curitem = items[i];
            appendList(curitem);
        }
    }
    else {
        taskli.innerHTML = "No Tasks Found. Get some work..."
    }
});

function clearList() {
    taskli.innerHTML = ""
}

function appendList(inputValue) {
    let itemId = inputValue[0];
    let itemname = inputValue[1];
    console.log(inputValue[0]);
    console.log(inputValue[1]);
    let newEl = document.createElement("li");
    newEl.textContent = itemname;
    taskli.append(newEl);

    newEl.addEventListener("dblclick", function() {
        let location = ref(database, `todo/${itemId}`);
        remove(location);
    });
} 