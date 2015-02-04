/**
 * Require the models that are used to serialize the data here
 */
var Profile = require('./models/Profile.js');

/**
 * This class handles the formatting of REST responses
 */
class Serializer {

  /**
   * An example of how to define a Serializer method
   *
   * @param {Object} data
   * @return {Object}
   */
  static profile(data) {
    // TODO: Map the data object to the desired fields
    let profile = {
      name: data.path.to.name,
      email: data.path.to.email
    };

    // Use a model to wrap the mapped Object
    return new Profile(profile);
  }

}

module.exports = Serializer;
