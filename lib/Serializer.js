/**
 * Require the models that are used to serialize the data here
 */
var Profile = require('./models/Profile.js');

/**
 * Handles the formatting of REST responses.
 *
 * @class
 */
class Serializer {
  /**
   * The template for a Serializer method.
   *
   * @method profile
   * @static
   * @param {Object} data - the data that needs to be serialized into a `Profile`
   * @return {Profile} - returns an instance of `Profile`
   */
  static profile(data) {
    let profile = {
      // TODO: Map the data object to the desired fields
      // name: data.path.to.name,
      // email: data.path.to.email
    };

    // Use a model to wrap the mapped Object
    return new Profile(profile);
  }

}

module.exports = Serializer;
