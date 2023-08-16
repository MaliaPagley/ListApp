import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
    let snapshotData =Object.values(snapshot.val())
    clearListEl()
    listEl.innerHTML =""
   
  for (let i =0; i < snapshotData.length; i++) {
   appendItemToShoppingListEl(snapshotData[i])
  }

})
function clearListEl () {
    listEl.innerHTML = ""
}
function clearInputFieldEl() {
    inputFieldEl.value = ""
}
function appendItemToShoppingListEl(itemValue) {
    listEl.innerHTML += `<li>${itemValue}</li>`
}