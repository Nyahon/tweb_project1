const XMLHttpRequest = require('xhr2');
const fs = require("fs");

let swear_list=[];
getSwearWords("/home/johanna/Documents/Cours/S5/TWEB/Project1/server/files/swear_words.txt");

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
  let index = 0;
  let lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(file)
  });
  
  lineReader.on('line', function (line) {
    swear_list[index] = line;
    ++index;
  });

}

//const swearWords = getSwearWords("swear_words.txt");

  function getDirtyCommits(commits) {
    let dirtyCommits = [];
    dirtyCommits[0] = commits;

      dirtyCommits[0].items = dirtyCommits[0].items.filter(function(i, n){
        for(let swi = 0; swi < swear_list.length; ++swi){
          if(i.commit.message.includes(swear_list[swi])){
            return true;
          }
        }
        return false;
      })
    return dirtyCommits[0];
  }



  
  module.exports = {
    getReposLanguagesStats,
    getDirtyCommits
  };
