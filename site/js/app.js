const baseUrl = 'http://localhost:3000';

function getUser(username){
    return fetch(`${baseUrl}/users/${username}`)
    .then(response=>{
        if (!response.ok){
            throw new Error('Oups');
        }
        return response.json();
    })
}

getUser('Sheltine')
.then(user=>{
    const avatar = user;
    avatar.src = user.avatar_url;
    name.innerText = user.name;
    console.log(avatar);
    document.getElementById("user-name").innerHTML = avatar.login;
    //login.innerText = user.login;

})