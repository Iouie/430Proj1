const query = require('querystring');
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
  'Dark Magician': {
    name: 'Dark Magician',
    cardType: 'Monster',
    description: 'sexy magician',
    imgUrl: 'https://uploads2.yugioh.com/card_images/257/detail/Dark-Magician.jpg?1375127294',
  },
  'Pot of Greed': {
    name: 'Pot of Greed',
    cardType: 'Spell',
    description: 'wtf',
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
    message: {cards},
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
const addCard = (request, response) => {
  const body = [];

  request.on('error', () => {
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParam = query.parse(bodyString);

    const responseJSON = {};

    // check if inputs are filled
    if (!bodyParam.name || !bodyParam.description || !bodyParam.imgUrl) {
      responseJSON.message = 'You need to fill out all the fields.';
      responseJSON.id = 'missingParams';
      return respondJSON(request, response, 400, responseJSON);
    }

    let responseCode = 201;

    // find and update card name
    if (cards[bodyParam.name]) {
      responseCode = 204;
    } else {
      cards[bodyParam.name] = {};
    }

    // add or update fields for this card
    cards[bodyParam.name].name = bodyParam.name;
    cards[bodyParam.name].cardType = bodyParam.cardType;
    cards[bodyParam.name].description = bodyParam.description;
    cards[bodyParam.name].imgUrl = bodyParam.imgUrl;

    // return JSON message
    if (responseCode === 201) {
      responseJSON.message = 'Created new card.';
      return respondJSON(request, response, responseCode, responseJSON);
    }
    return respondJSONMeta(request, response, responseCode);
  });
};

// // find card
// const findCard = (request, response, params) => {
//   const responseJSON = {
//     message: cards[params.name],
//   };

//   if (!params.name) {
//     responseJSON.message = 'No name';
//     responseJSON.id = 'badRequest';
//     return respondJSON(request, response, 400, responseJSON);
//   }
//   return respondJSON(request, response, 200, responseJSON);
// };


// exports to set functions to public.
// In this syntax, you can do getIndex:getIndex, but if they
// are the same name, you can short handle to just getIndex,
module.exports = {
  getCards,
  notFound,
  addCard,
 // findCard,
};
