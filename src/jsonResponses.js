const query = require('querystring');
// Note this object is purely in memory
// When node shuts down this will be cleared.
// Same when your heroku app shuts down from inactivity
// We will be working with databases in the next few weeks.
const cards = {

};

// function to send a response
const respondJSON = (request, response, status, object) => {
  // set status code and content type (application/json)
  response.writeHead(status, {'Content-Type': 'application/json'});
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, {'Content-Type': 'application/json'});
  response.end();
}

//return card object as JSON
const getCards = (request, response) => {
  const responseJSON = {
    message: {cards},
  };
  respondJSON(request, response, 200, responseJSON);
};

// function for 404 not found requests with message
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
}

//function to add a user from a POST body
const addCard = (request, response) => {
  let body = [];

  request.on('data', (chunk) => {
    body.push(chunk)
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    body = query.parse(bodyString);

    const responseJSON = {};

    // check if inputs are filled
    if(!body.name || !body.description || !body.imgUrl){
      responseJSON.message = 'You have no filled out all the fields.';
      responseJSON.id ='missingParams';
      return respondJSON(request, response, 400, responsejSON);
    }

    let responseCode = 201;

    // find and update card name
    if(cards[body.name]){
      responseCode = 204;
    }
    else {
      cards[body.name] = {};
    }

    // add all the information
    cards[body.name].name = body.name;
    cards[body.name].cardType = body.cardType;
    cards[body.name].description = body.description;
    cards[body.name].imgUrl = body.imgUrl;

    // return JSON message
    if(responseCode === 201){
      responseJSON.message = 'Created new card.';
      return respondJSON(request, response, responseCode, responseJSON);
    }

    return respondJSONMeta(request, response, responseCode);
  });
};

// find card
const findCard = (request, response, params) => {
  const respondJSON = {
    message: cards[params.name],
  };

  if(!params.name){
    responseJSON.message = 'No name';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }
  return respondJSON( request, response, 200, responseJSON);
}


// exports to set functions to public.
// In this syntax, you can do getIndex:getIndex, but if they
// are the same name, you can short handle to just getIndex,
module.exports = {
getCards,
notFound,
addCard,
findCard,
};
