var superagent = require('superagent');

/**
 * Provides methods to make REST calls. It currently uses the the superagent
 * request library but can be configured to use other libraries.
 *
 * @class
 */
class Request {

  /**
   * Creates a `GET` request.
   *
   * @method get
   * @static
   * @params {Object} params - the http parameters that are used to construct the http request
   * @return {Promise} - returns a Promise of an http response
   */
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

  /**
   * Creates a `POST` request.
   *
   * @method post
   * @static
   * @params {Object} params - the http parameters that are used to construct the http request
   * @return {Promise} - returns a Promise of an http response
   */
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

  /**
   *
   * Creates a `UPDATE` request. **Note:** Not implemented yet.
   *
   * @method update
   * @static
   * @params {Object} params - the http parameters that are used to construct the http request
   * @return {Promise} - returns a Promise of an http response
   */
  static update(params) {
    return new Promise((resolve, reject) => {
      reject('method `update` not defined yet');
    });
  }

  /**
   * Creates a `DELETE` request. **Note:** Not implemented yet.
   *
   * @method delete
   * @static
   * @params {Object} params - the http parameters that are used to construct the http request
   * @return {Promise} - returns a Promise of an http response
   */
  static delete(params) {
    return new Promise((resolve, reject) => {
      reject('method `delete` not defined yet');
    });
  }
}

module.exports = Request;
