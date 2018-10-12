'use strict';
const {dialogflow, MediaObject, Image} = require('actions-on-google');
const functions = require('firebase-functions');

// --- Quotes -----------------------------------------------------------------------------------------------------
const quotes = {
  '10': {
    file: '10_taxid.wav',
    phrase: 'You talkin\' to me?',
    movie: 'TAXI DRIVER, Columbia, 1976',
    character: 'TRAVIS BICKLE',
    actor: 'Robert DeNiro',
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
  },   
  '': {
    movie: '',
    character: '',
    actor: '',
  },
};

// --- Functions -----------------------------------------------------------------------------------------------------
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
      const filteredQuotes = {};
      myFilter.forEach(key => {
        filteredQuotes[key] = quotes[key];
      });      
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


// Instantiate the Dialogflow client with debug logging enabled.
const app = dialogflow({
  debug: true
});


// --- Dialogs -----------------------------------------------------------------------------------------------------
app.intent('random.quote', (conv) => {
  const ssml = randomQuote(quotes);
  console.log(`SSML: ${ssml}`);
  conv.ask(ssml);
});

app.intent('smalltalk.greetings.hello', (conv) => {
  const relevantQuotesKeys = ['10', '80', '81'];
  const ssml = randomQuote(quotes, relevantQuotesKeys);
  console.log(`SSML: ${ssml}`);
  conv.ask(ssml);
});





// Cloud Functions for Firebase handler for HTTPS POST requests.
// https://developers.google.com/actions/dialogflow/fulfillment#building_fulfillment_responses
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
