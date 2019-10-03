// function to send a response
const respond = (request, response, status, content, type) => {
  // set status code and content type (application/json)
  response.writeHead(status, 'application/json');
  // stringify the object (so it doesn't use references/pointers/etc)
  // but is instead a flat string object.
  // Then write it to the response.
  if (type === 'application/json') {
    response.write(JSON.stringify(content));
  } else {
    response.write(content);
  }
  // Send the response to the client
  response.end();
};

// function to show a success status code
const success = (request, response) => {
  // message to send
  const responseJSON = {
    message: 'Success',
  };

  // send our json with a success status code
  return respond(request, response, 200, responseJSON, 'application/json');
}; // End of success JSON/XML


// function to show a bad request without the correct parameters
const badRequest = (request, response) => {
  // message to send
  const responseJSON = {
    id: 'missingParams',
    message: 'Name and Age are both required',
  };
    // if the parameter is here, send json with a success status code
  return respond(request, response, 200, responseJSON, 'application/json');
};

// function to show not found error
const notFound = (request, response) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };
    // return our json with a 404 not found error code
  return respond(request, response, 404, responseJSON, 'application/json');
};

// function to show not found error
const notReal = (request, response) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };
    // return our json with a 404 not found error code
  return respond(request, response, 404, responseJSON, 'application/json');
};

// function for added the user's information
const addUsers = (request, response) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'Created Successfully',
    id: 'Create',
  };
  return respond(request, response, 201, responseJSON, 'application/json');
};

// function for getting the user's information
const getUsers = (request, response) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: '',
    id: '',
  };
  return respond(request, response, 200, responseJSON, 'application/json');
};

// function that lets the user know of a change being made
const updated = (request, response) => {
  const responseJSON = {
    id: 'Updated (No Content)',
  };
  return respond(request, response, 204, responseJSON, 'application/json');
};

// exports to set functions to public.
// In this syntax, you can do getIndex:getIndex, but if they
// are the same name, you can short handle to just getIndex,
module.exports = {
  success,
  badRequest,
  getUsers,
  addUsers,
  updated,
  notReal,
  notFound,
};
