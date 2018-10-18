const baseUrl = 'http://localhost:3000';
let user = 'johannamelly';

function createChart(){
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: "My First dataset",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 45],
            }]
        },
    
        // Configuration options go here
        options: {}
    });
}

//createChart();

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

function getDirtyCommits(username){
    return fetch(`${baseUrl}/dirtycommits/${username}`)
    .then(response=>{
        if (!response.ok){
            throw new Error('Oups');
        }
        
        return response.json();
    })
}

getDirtyCommits(user)
        .then(commits => {
            const liste = commits;
            for(let i = 0; i < commits.items.length; ++i){
                 document.getElementById("a_commit").innerHTML += ("</br>" + i + ": " + liste.items[i].commit.message);
            }
        })



getUser(user)
.then(user=>{
    const avatar = user;
    avatar.src = user.avatar_url;
    name.innerText = user.name;
    console.log(avatar);
    document.getElementById("user-name").innerHTML = avatar.login;
    document.getElementById("user-avatar").src = avatar.avatar_url;
})

