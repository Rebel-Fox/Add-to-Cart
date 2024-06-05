import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import {getDatabase, ref, push,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings={
    projectId:"Realtime Database",
    databaseURL:"https://realtime-database-d3c36-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app=initializeApp(appSettings)
const database=getDatabase(app)
const shoppingListinDB=ref(database,"shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl=document.getElementById("shopping-list")


addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(shoppingListinDB,inputValue)
    clearInputFieldEl()
})

onValue(shoppingListinDB,function(snapshot){
    if(snapshot.exists()){
    let itemsArray=Object.entries(snapshot.val())

    clearShoppingListEl()
    for(let i=0;i<itemsArray.length;i++){
        let currentItem=itemsArray[i]
        let currentItemId=currentItem[0]
        let currentItemValue=currentItem[1]
        appendItemToShoppingListEl(currentItem)
    }} else{
        shoppingListEl.innerHTML="No items to display ... yet!"
    }
})

function clearShoppingListEl(){
    shoppingListEl.innerHTML=""
}

function clearInputFieldEl(){
    inputFieldEl.value=''
}

function appendItemToShoppingListEl(item){
    // shoppingListEl.innerHTML +=`<li> ${itemValue}</li>`
    let itemId=item[0]
    let itemValue=item[1]
    
    let newEl=document.createElement("li")
    newEl.textContent = itemValue
    
    newEl.addEventListener("dblclick",function(){
        let exactLocationOfItemInDB=ref(database,`shoppingList/${itemId}`)
        remove(exactLocationOfItemInDB)
    })

    shoppingListEl.append(newEl)
}