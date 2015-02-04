var superagent = require('superagent');

/**
 * This class provides methods to make REST calls. It currently uses the
 * the superagent request library but can be configured to use other libraries
 */
class Request {

  static get(params) {
    return new Promise((resolve, reject) => {
      // TODO: apply parameters conditionally on existence
      superagent
        .get(params.url)
        .auth(...params.auth)
        .accept(params.acceptType)
        .end((err, res) => {
          if(res.ok) {
            resolve(res);
          } else {
            reject(err);
          }
        });
    });
  }

  static post(params) {
    return new Promise((resolve, reject) => {
      superagent
        .post(params.url)
        .auth(...params.auth)
        .send(params.payload)
        .accept(params.acceptType)
        .end((err, res) => {
          if(res.ok) {
            resolve(res);
          } else {
            reject(err);
          }
        });
    });
  }

  static update(params) {
    return new Promise((resolve, reject) => {
      reject('method `update` not defined yet');
    });
  }

  static delete(params) {
    return new Promise((resolve, reject) => {
      reject('method `delete` not defined yet');
    });
  }
}

module.exports = Request;
