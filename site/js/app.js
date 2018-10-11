const baseUrl = 'http://localhost:3000';

function getUser(usernam){
    return fetch('${baseUrl}(users/${username}')
    .then(response=>{
        if (!response.ok){
            throw new Error('Oups');
        }
        return response.json();
    })
}

getUser('Sheltine')
.then(user=>{
    const avatar = document.getElementById('user');
    avatar.src = user.avatar_url;
    name.innerText = user.name;
    login.innerText = user.login;
})