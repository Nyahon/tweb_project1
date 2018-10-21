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

app.get('/commits/:username', (req, res, next) => { // eslint-disable-line no-unused-vars
  client.commits(req.params.username, 1)
    .then(commits =>{res.send(commits);
    })
    .catch(next);
});

/*
app.get('/commits/:username', (req, res, next) => { // eslint-disable-line no-unused-vars
  client.commits(req.params.username, 1)
    .then(commits =>{
      if(commits.total_count > 100){
        let nbPages = Math.floor(commits.total_count/100)+1;
        for(let i = 2; i <= nbPages; ++i){
            client.commits(req.params.username, i).then(nextcommits=>{
            console.log("pushing hard");
            commits.items.push(nextcommits.items);
          });
        }
      }
    }).then(coucou=>{
      console.log("commits: " + coucou);
      console.log("done");
      res.send(coucou);
    })
    .catch(next);
});
*/


app.get('/dirtycommits/:username', (req, res, next) => { // eslint-disable-line no-unused-vars
  client.commits(req.params.username)
    .then(commits => utils.getDirtyCommits(commits))
    .then(commits => res.send(commits))
    .catch(next);
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
