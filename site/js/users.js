const baseUrl = "http://localhost:3000";


if(null != localStorage.getItem("user")){
    document.getElementById("selectedUser").innerHTML = localStorage.getItem('user');
}else{
    localStorage.setItem("user", "octocat")
}



getUser(localStorage.getItem("user"))
.then(user=>{
    const avatar = user;
    avatar.src = user.avatar_url;
    name.innerText = user.name;
    console.log(avatar);
    document.getElementById("user-avatar").src = avatar.avatar_url;
    document.getElementById("selectedUser").innerHTML = avatar.login;

})



function getCommits(username){
    return fetch(`${baseUrl}/commits/${username}`)
    .then(response=>{
        if (!response.ok){
            throw new Error('Oups');
        }
        
        return response.json();
    })
}

function getDirtyCommits(username){
    return fetch(`${baseUrl}/dirtycommits/${username}`)
    .then(response=>{
        if (!response.ok){
            throw new Error('Oups');
        }
        
        return response.json();
    })
}

getDirtyCommits(localStorage.getItem("user"))
        .then(commits => {
            const liste = commits;
            for(let i = 0; i < commits.items.length; ++i){
                 document.getElementById("a_commit").innerHTML += ("</br>" + i + ": " + liste.items[i].commit.message);
            }
        })
        

        function getUser(username){
    
            return fetch(`${baseUrl}/users/${username}`)
            .then(response=>{
                if (!response.ok){
                    throw new Error('Oups');
                }
                
                return response.json();
            })
        }
        
        