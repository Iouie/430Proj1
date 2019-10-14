// Note this object is purely in memory
// When node shuts down this will be cleared.
// Same when your heroku app shuts down from inactivity
// We will be working with databases in the next few weeks.
const cards = {
  'Jerry Beans Man': {
    name: 'Jerry Beans Man',
    cardType: 'Monster',
    description: 'sexy bean',
    imgUrl: 'https://uploads3.yugioh.com/card_images/5463/detail/Jerry_Beans_Man.jpg?1440619168',
  },
  Trap: {
    name: 'Some Dude I Found Online',
    cardType: 'Trap',
    description: "It's a guy.",
    imgUrl: 'https://pm1.narvii.com/6975/43cb30e51eebce85c44679a143404a4a7e81a967r1-288-537v2_hq.jpg',
  },
  'Pot of Greed': {
    name: 'Pot of Greed',
    cardType: 'Spell',
    description: 'This card allows me to draw 2 more cards from my deck. ',
    imgUrl: 'https://uploads3.yugioh.com/card_images/1093/detail/1226.jpg?1385099030',
  },
};

// function to send a response
const respondJSON = (request, response, status, object) => {
  // set status code and content type (application/json)
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// return card object as JSON
const getCards = (request, response) => {
  const responseJSON = {
    message: { cards },
  };
  return respondJSON(request, response, 200, responseJSON);
};

// function for 404 not found requests with message
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};

// function to add a user from a POST body
const addCard = (request, response, body) => {
  const responseJSON = {
    message: 'You need to fill out all the fields.',
  };

  // check if inputs are filled
  if (!body.name || !body.description || !body.imgUrl) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  // find and update card name
  if (cards[body.name]) {
    responseCode = 204;
  } else {
    cards[body.name] = {};
  }

  // add or update fields for this card
  cards[body.name].name = body.name;
  cards[body.name].cardType = body.cardType;
  cards[body.name].description = body.description;
  cards[body.name].imgUrl = body.imgUrl;

  // return JSON message
  if (responseCode === 201) {
    responseJSON.message = 'Created new card.';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};


// exports to set functions to public.
// In this syntax, you can do getIndex:getIndex, but if they
// are the same name, you can short handle to just getIndex,
module.exports = {
  getCards,
  notFound,
  addCard,
};
