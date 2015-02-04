
/**
 * Serves as the model to serialize data into a `Profile` Object
 */
class Profile {
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
