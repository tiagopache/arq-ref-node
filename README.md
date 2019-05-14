# Node API Microservice Reference Architecture

An opinionated boilerplate for Node web APIs focused on separation of concerns and scalability.

## Features

<dl>
  <dt>Multilayer folder structure</dt>
  <dd>
    Code organization</a> inspired by <a href="http://dddcommunity.org/">DDD</a> and <a href="https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html">Clean Architecture</a> focused on codebase scalability.
  </dd>

  <dt>Instant feedback and reload</dt>
  <dd>
    Use <a href="https://www.npmjs.com/package/nodemon">Nodemon</a> to automatically reload the server after a file change when on development mode, makes the development faster and easier.
  </dd>

  <dt>Scalable and easy to use web server</dt>
  <dd>
    Use <a href="https://www.npmjs.com/package/express">Express</a> for requests routing and middlewares. There are some essential middlewares for web APIs already setup, like <a href="https://www.npmjs.com/package/body-parser">body-parser</a>, <a href="https://www.npmjs.com/package/compression">compression</a>, <a href="https://www.npmjs.com/package/cors">CORS</a> and <a href="https://www.npmjs.com/package/method-override">method-override</a>.
  </dd>

  <dt>Database integration</dt>
  <dd>
    <a href="https://www.npmjs.com/package/mongoose">Mongoose</a>, an ORM for MongoDB, is already integrated, you just have to set the authentication configurations `config/database.js`</a>.
  </dd>

  <dt>Prepared for testing</dt>
  <dd>
    The test suite uses <a href="https://www.npmjs.com/package/mocha">Mocha</a>/<a href="https://www.npmjs.com/package/chai">Chai</a> and is prepared to run unit, integration and functional tests right from the beginning. There are helpers to make it easy to make requests to the web app during the tests and for cleaning the database after each test. A <a href="https://www.npmjs.com/package/factory-girl">FactoryGirl</a> adapter for Mongoose is setup to make your tests DRY as well, and the tests generate code coverage measurement with <a href="https://www.npmjs.com/package/istanbul">Istanbul</a>. You should read about the Chai plugins that are setup by default too.
  </dd>

  <dt>Dependency injection</dt>
  <dd>
    With <a href="https://www.npmjs.com/package/awilix">Awilix</a>, a practical dependency injection library, the code will not be coupled and it'll still be easy to resolve automatically the dependencies on the runtime and mock them during the tests. It's even possible inject dependencies on your controllers with the <a href="https://www.npmjs.com/package/awilix-express">Awilix Express adapter</a>.
  </dd>

  <dt>CLI integration</dt>
  <dd>
    Both the application and Sequelize have command-line tools to make it easy to work with them. Check the <a href="#scripts">Scripts</a> section to know more about this feature.
  </dd>

  <dt>Logging</dt>
  <dd>
    The <a href="https://www.npmjs.com/package/log4js">Log4js</a> logger is highly pluggable, being able to append the messages to a file during the development and send them to a logging service when on production. Even the requests (through <a href="https://www.npmjs.com/package/morgan">morgan</a>) and queries will be logged.
  </dd>

  <dt>Linter</dt>
  <dd>
    It's also setup with <a href="https://www.npmjs.com/package/eslint">ESLint</a> to make it easy to ensure a code styling and find code smells.
  </dd>
</dl>

## Quick start

_Notice that the boilerplate comes with a small application for user management already, you can delete it with a npm script after you understand how the boilerplate works but please do the quick start first!_ 😊

1. Clone the repository with `git clone <githubplace>`
2. Setup the database on `config/database.js` (there's an example file there to be used with MongoDB 😉 )

### Running on native machine
3. Install the dependencies with `npm install`
4. Create the development and test databases you have setup on `config/database.js`
4.1. Execute `npm run config-database-ci` command to create the file with sample info
OR
4.1. Manually create the `config/database.js` file with it structure
5. Add some seed data to the development database with `npm run seed-data`
6. Run the application in development mode with `export PORT=<yourport> && npm run dev`
7. Access `http://localhost:[PORT]/api/users` and you're ready to go!

### Running on docker engine
3. Make sure your have the docker engine installed with `docker info`
4. Run the docker-compose up debug option with `docker-compose -f "docker-compose.debug.yml" up -d --build`
5. Access `http://localhost:[PORT]/api/users` and you're ready to go!

### Docs
Docs (Swagger/OAS 3.0) are at `http://localhost:[PORT]/api/docs`

### Application Status (Only on development environment)
Status at `http://localhost:[PORT]/status`

After playing a little bit with the boilerplate and _before_ implementing a real application with it I recommend you to remove the example application files running `npm run cleanup`

## Scripts

This boilerplate comes with a collection of npm scripts to make your life easier, you'll run them with `npm run <script name>`:

- `dev`: Run the application in development mode
- `dev-debug`: Run the application in development mode with debugger turned on
- `dev-diagnostic`: Run the application in diagnostic mode to see a console dashboard with diagnostic real-time info about event loop, cpu, allocated memory and stdout/stderr
- `start` Run the application in production mode (prefer not to do that in development)
- `test`: Run the test suite
- `test:unit`: Run only the unit tests
- `test:features`: Run only the features tests
- `test:integration`: Run only the integration tests (Postman/newman)
- `coverage`: Run only the unit tests and generate code coverage for them, the output will be on `coverage` folder
- `lint`: Lint the codebase
- `console`: Open the built-in console, you can access the DI container through the `container` variable once it's open, the console is promise-friendly.
- `config-database-ci`: Creates an `config/database.js` to help the CI pipeline
- `cleanup`: Removes the files from the example application

## Tech

- [Node v10.13+](http://nodejs.org/)
- [Express](https://npmjs.com/package/express)
- [Helmet](https://www.npmjs.com/package/helmet)
- [Mongoose](https://www.npmjs.com/package/mongoose)
- [Awilix](https://www.npmjs.com/package/awilix)
- [Structure](https://www.npmjs.com/package/structure)
- [HTTP Status](https://www.npmjs.com/package/http-status)
- [Log4js](https://www.npmjs.com/package/log4js)
- [Log4js/GELF](https://github.com/log4js-node/gelf)
- [Morgan](https://www.npmjs.com/package/morgan)
- [Express Status Monitor](https://www.npmjs.com/package/express-status-monitor)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Mocha](https://www.npmjs.com/package/mocha)
- [Chai](https://www.npmjs.com/package/chai)
- [FactoryGirl](https://www.npmjs.com/package/factory-girl)
- [Istanbul](https://www.npmjs.com/package/istanbul) + [NYC](https://www.npmjs.com/package/nyc)
- [ESLint](https://www.npmjs.com/package/eslint)

## Contributing

This boilerplate is open to suggestions and contributions, documentation contributions are also important! :)
