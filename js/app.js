/*
 * Js-Bookmarker
 * version: 1.0.0
 * By: Elias Abdurrahman
 * date: july 8, 2019
 */
var nav = document.querySelectorAll(".bookmarker-nav li");
var activePage = 0;
var bookmarkerBody = document.getElementById("bookmarkerBody");
var data = [];
document.addEventListener('DOMContentLoaded', runform());


if(localStorage.getItem("bookmarker_data")){
    data = JSON.parse(localStorage.getItem("bookmarker_data"));
}else{
    var datax = [];

    localStorage.setItem("bookmarker_data", JSON.stringify(datax));
    data = JSON.parse(localStorage.getItem("bookmarker_data"));
}

nav[activePage].className="activ-bm";

function runform(){
    bookmarkerBody.innerHTML =
    `
    <div class="bookmarker-form">
        <p class="input-error" id="inputError"><p>
        <label>website name</label>
        <input type="text" id="webName">
        <br><br>
        <label>website URL</label>
        <input type="text" id="webUrl">
        <button type="button" onclick="addWebsite()">Add</button>
    </div><br>
    `;
}
function runDisplay(){
    bookmarkerBody.innerHTML="";
    for(var i = data.length -1; i > -1; i--){
        bookmarkerBody.innerHTML +=
        `
        <div class="bookmarker-show">
            <br>
            <div class="bookmarker-show-item">
            <span onclick="removeSite(${data[i].id}, ${i})">x</span>
            <h4><a href="${data[i].link}" target="_blank ">${data[i].name}</a></h4>
            <i>${data[i].link}</i>
            </div>
        </div>
        `;
    }
}

function mouseOv(link, n){
    if(n == 1){
        nav[1].className="";
        link.className="activ-bm";
    }

    if(n == 2){
        nav[0].className="";
        link.className="activ-bm"; 
    }
 }
 function mouseOt(link, n){

    nav[activePage].className="activ-bm";
    if(activePage == 0){
        nav[1].className="";  
    }else{
        nav[0].className="";  
    }
 }

 function changeView(n){
    if(n == 1){
        activePage = 1;
        runDisplay();
    }else{
        activePage = 0;
        runform(); 
    }
    nav[activePage].className="activ-bm";
}
function removeSite(id, index){
    for (let i = 0; i < data.length; i++) {
      if(data[i].id == id){
        data.splice(i, 1);
      }  
    }
    localStorage.setItem("bookmarker_data", JSON.stringify(data));
    runDisplay();

}

function addWebsite(){
    var name = document.getElementById("webName").value.trim(); 
    var url = document.getElementById("webUrl").value.trim(); 
    var inputError = document.getElementById("inputError");
    
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    // isValidUrl = true;
    if(name == "" || url ==""){
        if(name == "" && url != ""){
            inputError.innerText = "Website name is required";          
        }else if(url == "" && name != ""){
            inputError.innerText = "Website URL is required";          
        }else{
            inputError.innerText = "Website name & URL are required";
        }
    }else if(!url.match(regex)){
        inputError.innerText = "Invalid URL";      
    }else{
        var newData = {
            id:data.length,
            name: name,
            link: url
        };
        data.push(newData);
        localStorage.setItem("bookmarker_data", JSON.stringify(data)); 

        changeView(1);
        nav[0].className="";
        nav[1].className="activ-bm";
    }
}