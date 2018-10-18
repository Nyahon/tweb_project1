const XMLHttpRequest = require('xhr2');

function getReposLanguagesStats(reposLanguages = []) {
    const stats = {};
    const countLanguages = o => {
      Object.keys(o).forEach(key => {
        const value = o[key];
        const current = stats[key] || 0;
        stats[key] = current + value;
      });
    };
    reposLanguages.forEach(countLanguages);
    return stats;
  }

  

function getSwearWords(file)
{
  console.log("j'aime le pain");
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
      if (rawFile.readyState == 4) {
          if (rawFile.status != 200) {
              alert( "ERR" );
          } 
          else {
              alert( "SUCCESS" );
          }
      }
  };
    console.log("jeej");
    console.log(rawFile.status)
    rawFile.send();
    console.log("palier");
    let allText = rawFile.responseText;
    let lines = allText.split('\n');
    console.log(lines[0]);
    return lines;
}

//const swearWords = getSwearWords("swear_words.txt");

  function getDirtyCommits(commits) {
    const allCommits = commits;
    console.log("nb: " + commits.items[0].commit.message);
    let dirtyCommits = [{}];
   
    let swearWords = getSwearWords("/home/johanna/Documents/Cours/S5/TWEB/Project1/server/files/swear_words.txt");
           
            for (let i = 0; i < commits.total_count; ++i) {
                    let msg = commits.items[0].commit.message;
                    for(let sw = 0; sw < swearWords.length; ++sw){
                        if(msg.includes(swearWords[sw])){
                            dirtyCommits += commits.items[0].commit;
                          }
                    }
                }
                return dirtyCommits;
  }

  
  module.exports = {
    getReposLanguagesStats,
    getDirtyCommits
  };
