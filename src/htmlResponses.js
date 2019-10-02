const fs = require('fs'); // pull in file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);


// function to get index page
const getIndex = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html',
  });
  response.write(index);
  response.end();
};

// function to get css
const getCSS = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/css',
  });
  response.write(css);
  response.end();
};

// export
module.exports = {
  getIndex,
  getCSS,
};
