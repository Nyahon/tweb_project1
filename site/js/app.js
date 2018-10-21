const baseUrl = "http://localhost:3000";
let user;
let integer = 65;


function searchUser(){
    if( (null !=  document.getElementById("searchedUser").value) && ("" !=  document.getElementById("searchedUser").value)){
        localStorage.setItem("user", document.getElementById("searchedUser").value);
    document.location.href = "user.html";
    }
}
