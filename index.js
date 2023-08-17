import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-8d208-default-rtdb.firebaseio.com"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const listInDB = ref(database, "mylist")


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const listEl = document.getElementById("my-list")


addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(listInDB, inputValue)
    clearInputFieldEl()
   
})
onValue(listInDB, function(snapshot) {
 
    
   if (snapshot.exists()) {
        let snapshotData = Object.entries(snapshot.val())
        clearListEl()
    for (let i =0; i < snapshotData.length; i++) {
        let currentItem = snapshotData[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        
       appendItemToShoppingListEl(currentItem)
      }
   }  else {
    listEl.innerHTML = "No items";
    listEl.classList.add("empty")
    }
})
function clearListEl () {
    listEl.innerHTML = ""
}
function clearInputFieldEl() {
    inputFieldEl.value = ""
}
function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function() {
       let exactLocationOfItemInDB = ref(database, `mylist/${itemID}`)
       remove(exactLocationOfItemInDB)
    
    })

    listEl.append(newEl)
}