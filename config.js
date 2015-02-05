var convict = require('convict');
var fs = require('fs');

/**
 * This reads in the current Node Environment or sets it to the default
 * environment if NODE_ENV hasn't been set.
 */
var env = process.env.NODE_ENV || "development";

var conf = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV"
  },
  username: {
    doc: "Endpoint username",
    default: "",
    env: "ENDPOINT_USERNAME"
  },
  password: {
    doc: "Endpoint password",
    default: "",
    env: "ENDPOINT_PASSWORD"
  }
  // TODO: Enter your REST endpoint variables here
  // ,getProfileUrl: {
  //   doc: "The REST Endpoint to call.",
  //   default: "",
  //   env: "PROFILE_URL"
  // }
});

/**
 * This looks for the `.json` file for the current environment and parses it for
 * the variables defined above in the `conf` object.
 */
if (fs.existsSync(__dirname + '/' + env + '.json')){
  conf.loadFile(__dirname + '/' + env + '.json').validate();
} else {
  //either pull data from mongo or serve 404 error
  console.log('Config file not found, using ENV');
};

conf.validate();

module.exports = conf;
