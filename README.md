# bl-connector-template
A template for creating a Black Lion connector

## Setup

`npm i`

Several `npm` scripts are provided to build your project in different
environments. Each environment changes how the project is built and where it is
built to.

`npm run-script build-dev` builds to `./build/[name].js`

`npm run-script build-prod` minifies your javascript and builds to
`./release/[name].js`

`npm run-script build-test` builds a module that can be required in your test
suite and builds to `./test/build/[name].js`

`npm run build` reads the default environment from `env` in the `./config.js`
file and runs the corresponding build configuration. The intial default
environment is `"development"`

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

`npm start` runs `webpack-dev-server` on [localhost](http://localhost:8080)

## Usage

Each REST call you need to make should be defined in the `RESTCalls` object in
`index.js` as a function where you set up the unique aspects of each call and
`Serialize` the result.

Each type of object you expect to receive from your REST calls should have their
own corresponding `Model` class and method in the `Serializer` class in order to
map them in a consistent manner.

### Creating a Model

Models are used to define the fields that should be present in the objects you
return from your http requests.

Models are ES6 classes with a constructor that takes an Object containing all
the fields that should be mapped to that Model.

```js
class Person {
  constructor(params) {
    let fields = {
      params.firstname: this.firstname,
      params.lastname: this.lastname
    } = params;
  }
}
```

The `constructor` uses an ES6 destructuring assignment to set the public fields.
For info on how to use destructuring assignments read this blog post:
[Destructuring Assignment in ECMAScript 6](http://fitzgeraldnick.com/weblog/50/).
