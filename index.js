
var Request = require('./lib/Request.js');
var Serialize = require('./lib/Serializer.js');

var RESTCalls = {
  /**
   * Define all the different REST Calls this Connector knows how to make and Serialize
   */
  'getProfile': function() {
    /**
     * Set up your http request parameters here using global variables
     */
    let httpParams = {
      url: __PROFILE_URL__,
      auth: [__USERNAME__, __PASSWORD__],
      acceptType: 'application/json'
    };

    return new Promise((resolve, reject) => {
      Request.get(httpParams)
        .then(res => {

          // Serialize the http response to a profile
          let profile = Serialize.profile(res);

          resolve(profile);
        }).catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = RESTCalls;
