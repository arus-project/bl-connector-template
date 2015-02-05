/**
 * Require the models that are used to serialize the data here
 */
var Profile = require('./models/Profile.js');

/**
 * Handles the formatting of remote request responses responses.
 *
 * @class
 */
class Serializer {
  /**
   * The template for a Serializer method.
   *
   * @method profile
   * @static
   * @param {Object} response - the data that needs to be serialized into a `Profile`
   * @return {Profile} - returns an instance of `Profile`
   */
  static profile(response) {
    let profileData = {
      // TODO: Map the response object to the desired fields
      // name: response.path.to.name,
      // email: response.path.to.email
    };

    // Use a model to wrap the mapped Object
    return new Profile(profileData);
  }

}

module.exports = Serializer;
