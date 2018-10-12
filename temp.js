const quotes = {
  "10": {
    file: "10_taxid.wav",
    phrase: "You talkin' to me?",
    movie: "TAXI DRIVER, Columbia, 1976",
    character: "TRAVIS BICKLE",
    actor: "Robert DeNiro"
  },
  '80': {
    file: '80_rocky.wav',
    phrase: 'Yo, Adrian!',
    movie: 'ROCKY, United Artists, 1976',
    character: 'ROCKY BALBOA',
    actor: 'Sylvester Stallone',
  },
  '81': {
    file: '81_funnygirl.wav',
    phrase: 'Hello, gorgeous',
    movie: 'FUNNY GIRL, Columbia, 1968',
    character: 'FANNY BRICE',
    actor: 'Barbra Streisand',
  },/*
  '': {
    movie: '',
    character: '',
    actor: '',
  },*/
};

// Takes an object with qoutes data and optionally a filter (keys for the quotes)
// Returns a ssml-formatted string with data of random quote selected from the filtered
function randomQuote(quotesVariants, myFilter = []) {
  // We have >1 quotes
  if (Object.keys(quotesVariants).length > 1) {
    // We don't have a filter
    if (myFilter.length === 0) {
      const randPair = randomKeyPair(quotesVariants);
      return `<speak><audio src="https://iuriid.github.io/public/img/BestMovieQuotesWAVs/${randPair.file}">${randPair.phrase} - ${randPair.character} (${randPair.actor} - ${randPair.movie})</audio></speak>`;
    } else {
      // We have a filter
      const filteredQuotes = myFilter.reduce((obj, key) => {
        return {
          ...obj,
          [key]: quotesVariants[key]
        }
      }, {});
      const randPair = randomKeyPair(filteredQuotes);
      return `<speak><audio src="https://iuriid.github.io/public/img/BestMovieQuotesWAVs/${randPair.file}">${randPair.phrase} - ${randPair.character} (${randPair.actor} - ${randPair.movie})</audio></speak>`;      
    }
  }
  
  // Quotes object has the only quote
  const theOnlyQuote = quotesVariants[Object.keys(quotesVariants)[0]];
  return `<speak><audio src="https://iuriid.github.io/public/img/BestMovieQuotesWAVs/${theOnlyQuote.file}">${theOnlyQuote.phrase} - ${theOnlyQuote.character} (${theOnlyQuote.actor} - ${theOnlyQuote.movie})</audio></speak>`;
}

// Helper function - returns a random key-value pair from a given object
function randomKeyPair(quotesVariants) {
  const quotesKeys = Object.keys(quotesVariants);
  const randKey = Math.round(Math.random() * (quotesKeys.length - 1));
  return quotesVariants[quotesKeys[randKey]];
}


const needed = ["80", "10"];
const filteredQuotes = {};
needed.forEach(key => {
  //console.log(`key: ${key}`);
  //console.log(`quotes[key]: ${JSON.stringify(quotes[key])}`);
  filteredQuotes[key] = quotes[key];
})

console.log(JSON.stringify(filteredQuotes));

/*
const filteredQuotes = needed.reduce((acc, key) => {
  const addedQuote = {key: quotes.key};
  console.log(`addedQuote: ${JSON.stringify(addedQuote)}`);
  console.log(`acc: ${JSON.stringify(acc)}`);
  Object.assign(acc, addedQuote);
}, {});


console.log(`filteredQuotes: ${JSON.stringify(filteredQuotes)}`);

//console.log(randomQuote(quotes, ["80"]));

/* Old version
'use strict';
const {dialogflow, MediaObject, Image} = require('actions-on-google');
const functions = require('firebase-functions');

const answers = ['10_taxid.wav', '80_rocky.wav', '81_funnygirl.wav'];

function randomQuote(quotes) {
    const quoteIndex = Math.round(Math.random() * (quotes.length - 1));
    return `<speak><audio src="https://iuriid.github.io/public/img/BestMovieQuotesWAVs/${quotes[quoteIndex]}">Showing a sticker with the quote</audio></speak>`;
}

// Instantiate the Dialogflow client with debug logging enabled.
const app = dialogflow({
  debug: true
});

app.intent('smalltalk.greetings.hello', (conv) => {
  const ssml = randomQuote(answers);
  console.log(`SSML: ${ssml}`);
  conv.ask(ssml);
});

app.intent('random.quote', (conv) => {
  const ssml = randomQuote(answers);
  console.log(`SSML: ${ssml}`);
  conv.ask(ssml);
});


// Cloud Functions for Firebase handler for HTTPS POST requests.
// https://developers.google.com/actions/dialogflow/fulfillment#building_fulfillment_responses
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

*/