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

function getSwearWords(file)
{
   
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.send(null);

                let allText = rawFile.responseText;
                //alert(allText);
                let lines = allText.split('\n');
                return lines;
            

}

getUser('johannamelly')
.then(user=>{
    const avatar = user;
    avatar.src = user.avatar_url;
    name.innerText = user.name;
    console.log(avatar);
    document.getElementById("user-name").innerHTML = avatar.login;
    document.getElementById("user-avatar").src = avatar.avatar_url;

    //login.innerText = user.login;

})

/*
getCommits('Amadeous')
.then(commits=>{
    const liste = commits;
    for (let i = 0; i < liste.total_count; i++) {
    document.getElementById("a_commit").innerHTML += ("</br>" + i + ": " + liste.items[i].commit.message);
    }
})
*/

function parseCommits(){
    lines = getSwearWords("files/swear_words.txt");
        getCommits('johannamelly')
        .then(commits => {
            const liste = commits;
            for (let i = 0; i < liste.total_count; i++) {
                    let msg = liste.items[i].commit.message;
                    for(let sw = 0; sw < lines.length; ++sw){
                        if(msg.includes(lines[sw])){
                            document.getElementById("a_commit").innerHTML += ("</br>" + i + ": " + liste.items[i].commit.message);
                        }
                    }
                }
        })

}

parseCommits();