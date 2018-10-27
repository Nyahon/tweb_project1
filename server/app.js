// loads environment variables
require('dotenv/config');
const express = require('express');
const cors = require('cors');
const Github = require('./src/git');
const utils = require('./src/utils');

const app = express();
const port = process.env.PORT || 3000;
const client = new Github({ token: process.env.OAUTH_TOKEN });



// Enable CORS for the client app
app.use(cors());

app.get('/users/:username', (req, res, next) => { // eslint-disable-line no-unused-vars
  client.user(req.params.username)
    .then(user => res.send(user))
    .catch(next);
});

app.get('/languages/:username', (req, res, next) => { // eslint-disable-line no-unused-vars
  client.userLanguages(req.params.username)
    .then(utils.getReposLanguagesStats)
    .then(stats => res.send(stats))
    .catch(next);
});
/*
app.get('/commits/:username', (req, res, next) => { // eslint-disable-line no-unused-vars
  client.commits(req.params.username, 1)
    .then(commits =>{res.send(commits);
    })
    .catch(next);
});
*/

app.get('/commits/:username', (req, res, next) => { // eslint-disable-line no-unused-vars
  let commitPromises = [];
  let nbPages;
  commitPromises.push(client.commits(req.params.username, 1));
    commitPromises[0].then(commits =>{
      if(commits.total_count > 100){
        nbPages = Math.floor(commits.total_count/100)+1;
        nbPages = nbPages > 10 ? 10 : nbPages;
        console.log("nb pages: " + nbPages);
      }
       for(let i = 2; i <= nbPages; ++i){
        commitPromises.push(client.commits(req.params.username, i));
      }
    }).then(promises => {
      Promise.all(commitPromises).then(result=>{
        for(let j = 1; j < result.length; ++j){
          for(let k = 0; k < result[j].items.length; ++k){
            result[0].items.push(result[j].items[k]);
          }
        }
        res.send(result[0]);
      })
      .catch(next);
    })
    .catch(next);
});


app.get('/users', (req, res, next) => { // eslint-disable-line no-unused-vars
  client.users()
    //.then(users => (utils.ad(users)))
    .then(users =>{res.send(users);
    })
    .catch(next);
});


app.get('/dirtycommits/:username', (req, res, next) => { // eslint-disable-line no-unused-vars
  let commitPromises = [];
  let nbPages;
  commitPromises.push(client.commits(req.params.username, 1));
    commitPromises[0].then(commits =>{
      if(commits.total_count > 100){
        nbPages = Math.floor(commits.total_count/100)+1;
        nbPages = nbPages > 10 ? 10 : nbPages;
        console.log("nb pages: " + nbPages);
      }
       for(let i = 2; i <= nbPages; ++i){
        commitPromises.push(client.commits(req.params.username, i));
      }
    }).then(promises => {
      Promise.all(commitPromises).then(result=>{
        for(let j = 1; j < result.length; ++j){
          for(let k = 0; k < result[j].items.length; ++k){
            result[0].items.push(result[j].items[k]);
          }
        }
        utils.getDirtyCommits(result[0]);
        res.send(result[0]);
      })
      .catch(next);
    }).catch(next);
});

// Forward 404 to error handler
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(err);
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${port}`);
});
