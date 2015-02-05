
var Request = require('./lib/Request.js');
var Serialize = require('./lib/Serializer.js');

var RemoteRequests = {
  /**
   * TODO: Define all the different remote requests this Connector knows how to make
   * and Serialize.
   */

  /**
   * An example remote request call.
   *
   * @method getProfile
   * @static
   * @return {Promise} - returns a Promise of a serialized remote request response
   */
  'getProfile': function() {
    /**
     * Set up your remote request parameters here using global variables
     */
    let requestParams = {
      url: __PROFILE_URL__,
      auth: [__USERNAME__, __PASSWORD__],
      acceptType: 'application/json'
    };

    return new Promise((resolve, reject) => {
      Request.get(requestParams)
        .then(res => {

          // Serialize the remote request response to a profile
          let profile = Serialize.profile(res);

          resolve(profile);
        }).catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = RemoteRequests;
