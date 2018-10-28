import sqlite from 'sqlite';

const Github = require('./src/git');


/*
 * Lexical help: 
 *      DB    : Database
 *      DC    : DirtyCommits
 * 
 */

class sqliteDB {
  constructor({ path = './db/database.sqlite' } = {}) {
    this.path = path;
    this.dbPromise = sqlite.open(path, { Promise });
  }


  updateDCByUser(user, dirtyCommits) {
    dirtyCommits.forEach(element => {
      this.dbPromise.run('UPDATE dirtycommits ')
    });
  }
}

 
app.get('/post/:id', async (req, res, next) => {
fucnction 
  try {
    const db = await dbPromise;
    const [post, categories] = await Promise.all([
      db.get('SELECT * FROM Post WHERE id = ?', req.params.id),
      db.all('SELECT * FROM Category')
    ]);
    res.render('post', { post, categories });
  } catch (err) {
    next(err);
  }
});
 
app.listen(port);