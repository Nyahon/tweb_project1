const fetch = require('node-fetch');

class ResponseError extends Error {
  constructor(res, body) {
    super(`${res.status} error requesting ${res.url}: ${res.statusText}`);
    this.status = res.status;
    this.path = res.url;
    this.body = body;
  }
}


class Github {
  constructor({ token, baseUrl = 'https://api.github.com' } = {}) {
    this.token = token;
    this.baseUrl = baseUrl;
  }

  setToken(token) {
    this.token = token;
  }

  request(path, opts = {}) {
    const url = `${this.baseUrl}${path}`;
    const options = {
      ...opts,
      headers: {
        Accept: 'application/vnd.github.cloak-preview, application/vnd.github.v3+json',
        Authorization: `token ${this.token}`,
      },
    };

    return fetch(url, options)
      .then(res => res.json()
        .then((data) => {
          if (!res.ok) {
            throw new ResponseError(res, data);
          }

          return data;
        })).catch();
  }

  user(username) {
    return this.request(`/users/${username}`);
  }

  users() {
    return this.request(`/users?per_page=100`);
}

  randomUsers(since) {
    return this.request(`/users?per_page=100&since=${since}`)
  }

  repos(username) {
    return this.request(`/users/${username}/repos`);
  }

  repoLanguages(repoName) {
    return this.request(`/repos/${repoName}/languages`);
  }

  commits(username, pageNumber) {
    return this.request(`/search/commits?q=author:${username}&per_page=100&page=${pageNumber}`);
  }

  userLanguages(username) {
    return this.repos(username)
      .then((repos) => {
        const getLanguages = repo => this.repoLanguages(repo.full_name);
        return Promise.all(repos.map(getLanguages));
      });
  }
}

module.exports = Github;