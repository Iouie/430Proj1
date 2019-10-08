// Note this object is purely in memory
// When node shuts down this will be cleared.
// Same when your heroku app shuts down from inactivity
// We will be working with databases in the next few weeks.
const cards = {};

// function to send a response
const respondJSON = (request, response, status, object) => {
  // set status code and content type (application/json)
  response.writeHead(status, {'Content-Type': 'application/json'});
  response.write(JSON.stringify(object));
  response.end();
};

//return card object as JSON
const getCards = (request, response) => {
  const responseJSON = {
    cards,
  };
  respondJSON(request, response, 200, responseJSON);
};

//function to add a user from a POST body
const addCard = (request, response, body) => {
  //default json message
  const responseJSON = {
    message: "You're missing some details.",
  };
  //check to make sure we have both fields
  //We might want more validation than just checking if they exist
  //This could easily be abused with invalid types (such as booleans, numbers, etc)
  //the must needed to create a yu gi oh card, name, description/effects, and an imageurl
  if(!body.name || !body.description || !body.imgUrl){
    responseJSON.id = 'missingParameters';
    return respondJSON(request,response,400,responseJSON);
  }

      //default status code to 201 created
  let responseCode = 201;

  // if the card name already exists switch to 204
  if(cards[body.name]){
    responseCode = 204;
  } else {
    // else create a card with that name
    cards[body.name] = {};
  }

  // add or update fields for this card
  cards[body.name].name = body.name;
  cards[body.name].description = body.description;
  cards[body.name].imgUrl = body.imgUrl;

}
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
};
