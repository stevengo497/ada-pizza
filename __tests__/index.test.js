const request = require('supertest-as-promised');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const indexRoute = require('../routes/index');
app.use('/', indexRoute);

describe('index route', () => {
  it('is named indexRoute and has been exported using `module.exports`', () => {
    return request(app).get('/')
      .expect(200);
  });
  it('renders as HTML in the browser', () => {
    return request(app).get('/')
      .expect(200)
      .then((res) => {
        expect(res.text).toContain('<!DOCTYPE html>');
        expect(res.text).toContain('<body>');
      });
  });
  // might get rid of this one
  it('is passed an object that includes a key `title` which renders on the page', () => {
    // want to pass the view an object `{title: 'Title goes here!'}` in the test itself. how to do? jest.fn()?
    return request(app).get('/')
      .expect(200)
      .then((res) => {
        expect(res.text).toContain('Title goes here!');
      });
  });
  it('is passed "Ada\'s Pizza" as the title', () => {
    return request(app).get('/')
      .expect(200)
      .then((res) => {
        expect(res.text).toContain('Ada\'s Pizza');
      });
  });
  it('has a link to the pizza page', () => {
    return request(app).get('/')
      .expect(200)
      .then((res) => {
        // need to replace this with regex for `<a href=['|"]/pizza['|"]>`
        expect(res.text).toContain('pizza</a>');
      });
  });
});