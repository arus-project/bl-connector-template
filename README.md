# bl-connector-template
A template for creating a Black Lion connector

## Setup

Fork this repository into your own custom `Connector`'s repository.

`npm install`

### Changing the projects name

* `webpack.config.js`
  * in `entry` change `BlConnector` to your desired bundle name **Note:** you
  can change this name for each build configuration (`devConfig`, `prodConfig`,
  and `testConfig`)


* `package.json`
  * change `name` to your desired package name
  * change `main` to your chosen bundle name

### Building

In order to build you need in a specific environment you need its corresponding
`.json` file: `development.json`, `production.json`, and `test.json`. These
files are parsed and used to create the environment variables used in the REST
calls so as to not expose your credentials or endpoints in the source code. An
example of one of these files might look like this:
```json
{
  "username": "someUsername",
  "password": "somePassword",
  "endpoint": "http://foobar.com/path/to/endpoint"
}
```

After you have created all the required `.json` files you need to go into the
`config.js` file and configure them.

In order to expose these variables to your project you need to add them into the
`plugins` option in the `webpack.config.js` file.

#### Build Scripts

Several `npm` scripts are provided to build your project in different
environments. Each environment changes how the project is built and where it is
built to.

`npm run build-dev` builds to `./build/[name].js`

`npm run build-prod` builds and minifies your javascript into a module that can
be required in your `Black-Lion` project at `./[name].js`

`npm run build-test` builds a module that can be required in your test
suite and builds to `./test/build/[name].js`

**Note:** the commands above currently only work in on a windows platform. To
use it on OS X you must change `set NODE_ENV={environment}` in all the scripts in `package.json`
to just `NODE_ENV={environment}`.

`npm run build` reads the default environment from `env` in the `./config.js`
file and runs the corresponding build configuration. The intial default
environment is `"development"`

`npm start` runs `webpack-dev-server` on [localhost](http://localhost:8080)

## Usage

Each REST call you need to make should be defined in the `RESTCalls` object in
`index.js` as a function where you set up the unique aspects of each call and
`Serialize` the result.

Each type of object you expect to receive from your REST calls should have their
own corresponding `Model` class and method in the `Serializer` class in order to
map them in a consistent manner.

### Defining Remote Requests

In `index.js` there is a `RemoteRequests` object that you can use to configure
and expose all your remote requests that are available for this `Connector`.

An example definition of a remote request might look like this:
```js
var RemoteRequests = {
  'getProfile': function() {
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
```

`__PROFILE_URL__`, `__USERNAME__`, and `__PASSWORD__` can be configured as global
variables using `webpack` to avoid exposing your credentials or endpoints in the
source code. These variables are defined in `webpack.config.js`.

### Serializer

```js
class Serializer {

  static profile(response) {
    let profileData = {
      name: response.path.to.name,
      email: response.path.to.email
    };

    return new Profile(profileData);
  }

}
```

The `Serializer` is used to parse your remote request responses for specific
fields if needed and then wrap them with their corresponding model. You should
a method in the `Serializer` class for every `Model` class.


### Model

```js
class Profile {

  constructor(profileData) {
    let fields = {
      name: this.name,
      email: this.email
    } = profileData;
  }

}
```

Models are used to define the fields that should be present in the objects you
return from your remote requests.

Models are ES6 classes with a constructor that takes an Object containing all
the fields that should be mapped to that Model.

The `constructor` uses an ES6 destructuring assignment to set the public fields.
For info on how to use destructuring assignments read this blog post:
[Destructuring Assignment in ECMAScript 6](http://fitzgeraldnick.com/weblog/50/).
