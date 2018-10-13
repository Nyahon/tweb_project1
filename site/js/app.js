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

function getCommits(username){
    return fetch(`${baseUrl}/commits/${username}`)
    .then(response=>{
        if (!response.ok){
            throw new Error('Oups');
        }
        
        return response.json();
    })
}

getUser('Nyahon')
.then(user=>{
    const avatar = user;
    avatar.src = user.avatar_url;
    name.innerText = user.name;
    console.log(avatar);
    document.getElementById("user-name").innerHTML = avatar.login;
    //login.innerText = user.login;

})

getCommits('Nyahon')
.then(commits=>{
    const liste = commits;
    for (let i = 0; i < liste.total_count; i++) {
    document.getElementById("a_commit").innerHTML += ("</br>" + i + ": " + liste.items[i].commit.message);
    }
})