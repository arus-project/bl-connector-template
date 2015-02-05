
/**
 * Serves as the model to serialize data into a `Profile` object.
 *
 * @class
 */
class Profile {
  
  /**
   * The constructor for a `Profile` object.
   *
   * @constructs Profile
   * @params {Object} profileData - the data that generates the public fields of the Profile instance.
   */
  constructor(profileData) {
    /**
     * Initializes public fields using the es6 destructuring assignment
     */
    let fields = {
      name: this.name,
      email: this.email
    } = profileData;
  }
}

module.exports = Profile;
