'use strict';
const {dialogflow, MediaObject, Image} = require('actions-on-google');
const functions = require('firebase-functions');

// --- Quotes -----------------------------------------------------------------------------------------------------
const quotes = {
  "1": {
    file: "goneww.wav",
    phrase: "Frankly, my dear, I don't give a damn",
    movie: "GONE WITH THE WIND, MGM, 1939",
    character: "RHETT BUTLER",
    actor: "Clark Gable"
  },
  "2": {
    file: "godfather.wav",
    phrase: "I'm going to make him an offer he can't refuse",
    movie: "THE GODFATHER, Paramount, 1972",
    character: "VITO CORLEONE",
    actor: "Marlon Brando"
  },
  "3": {
    file: "onwaterfront.wav",
    phrase: "You don't understand! I could've had class",
    movie: "ON THE WATERFRONT, Columbia, 1954",
    character: "TERRY MALLOY",
    actor: "Marlon Brando"
  },
  "4": {
    file: "wizardofoz.wav",
    phrase: "Toto, I've (got) a feeling we're not in Kansas anymore",
    movie: "THE WIZARD OF OZ, MGM, 1939",
    character: "DOROTHY GALE",
    actor: "Judy Garland"
  },
  "5": {
    file: "casablanca.wav",
    phrase: "Here's looking at you, kid.",
    movie: "CASABLANCA, Warner Bros., 1942",
    character: "RICK BLAINE",
    actor: "Humphrey Bogart"
  },
  "6": {
    file: "suddenimpact.wav",
    phrase: "Go ahead, make my day",
    movie: "SUDDEN IMPACT, Warner Bros., 1983",
    character: "HARRY CALLAHAN",
    actor: "Clint Eastwood"
  },
  "7": {
    file: "sunsetblvd.wav",
    phrase: "All right, Mr. DeMille, I'm ready for my close-up",
    movie: "SUNSET BOULEVARD, Paramount, 1950",
    character: "NORMA DESMOND",
    actor: "Gloria Swanson"
  },
  "8": {
    file: "starwars.wav",
    phrase: "May the Force be with you",
    movie: "STAR WARS, Twentieth Century Fox, 1977",
    character: "HAN SOLO",
    actor: "Harrison Ford"
  },
  "9": {
    file: "allabouteve.wav",
    phrase: "Fasten your seatbelts. It's going to be a bumpy night",
    movie: "ALL ABOUT EVE, Twentieth Century Fox, 1950",
    character: "MARGO CHANNING",
    actor: "Bette Davis"
  },
  "10": {
    file: "taxid.wav",
    phrase: "You talkin' to me?",
    movie: "TAXI DRIVER, Columbia, 1976",
    character: "TRAVIS BICKLE",
    actor: "Robert DeNiro"
  },
  "11": {
    file: "coolhandluke.wav",
    phrase: "What we've got here is failure to communicate",
    movie: "COOL HAND LUKE, Warner Bros., 1967",
    character: "CAPTAIN",
    actor: "Strother Martin"
  },
  "12": {
    file: "apocalypsenow.wav",
    phrase: "I love the smell of napalm in the morning",
    movie: "APOCALYPSE NOW, United Artists, 1979",
    character: "LT. COL. BILL KILGORE",
    actor: "Robert Duvall"
  },
  "13": {
    file: "lovestory.wav",
    phrase: "Love means never having to say you're sorry",
    movie: "LOVE STORY, Paramount, 1970",
    character: "OLIVER BARRETT IV",
    actor: "Ryan O'Neal"
  },
  "14": {
    file: "maltesefalcon.wav",
    phrase: "(What is it?) - The stuff that dreams are made of",
    movie: "THE MALTESE FALCON, Warner Bros., 1941",
    character: "SAM SPADE",
    actor: "Humphrey Bogart"
  },
  "15": {
    file: "etth.wav",
    phrase: "E.T. phone home",
    movie: "E.T.: THE EXTRA-TERRESTRIAL, Universal, 1982",
    character: "E.T.",
    actor: "voice of Joe Welsh"
  },
  "16": {
    file: "intheheat.wav",
    phrase: "They call me Mister Tibbs!",
    movie: "IN THE HEAT OF THE NIGHT, United Artists, 1967",
    character: "VIRGIL TIBBS",
    actor: "Sidney Poitier"
  },
  "17": {
    file: "citizenkane.wav",
    phrase: "Rosebud",
    movie: "CITIZEN KANE, RKO, 1941",
    character: "CHARLES FOSTER KANE",
    actor: "Orson Welles"
  },
  "18": {
    file: "whiteheat.wav",
    phrase: "Made it, Ma! Top of the world!",
    movie: "WHITE HEAT, Warner Bros., 1949",
    character: "ARTHUR 'CODY' JARRETT",
    actor: "James Cagney"
  },
  "19": {
    file: "network.wav",
    phrase: "I'm as mad as hell, and I'm not going to take this anymore!",
    movie: "NETWORK, United Artists, 1976",
    character: "HOWARD BEALE",
    actor: "Peter Finch"
  },
  "20": {
    file: "casablanca5.wav",
    phrase: "Louis, I think this is the beginning of a beautiful friendship",
    movie: "CASABLANCA, Warner Bros., 1942",
    character: "RICK BLAINE",
    actor: "Humphrey Bogart"
  },
  "21": {
    file: "silenceoflambs.wav",
    phrase: "A census taker once tried to test me",
    movie: "THE SILENCE OF THE LAMBS, Orion, 1991",
    character: "DR. HANNIBAL LECTER",
    actor: "Anthony Hopkins"
  },
  "22": {
    file: "drno.wav",
    phrase: "Bond. James Bond",
    movie: "DR. NO, United Artists, 1962",
    character: "JAMES BOND",
    actor: "Sean Connery"
  },
  "23": {
    file: "wizardofoz2.wav",
    phrase: "There's no place like home",
    movie: "THE WIZARD OF OZ, MGM, 1939",
    character: "DOROTHY GALE",
    actor: "Judy Garland"
  },
  "24": {
    file: "sunsetblvd2.wav",
    phrase: "I am big! It's the pictures that got small",
    movie: "SUNSET BOULEVARD, Paramount, 1950",
    character: "NORMA DESMOND",
    actor: "Gloria Swanson"
  },
  "25": {
    file: "jerrymaguire.wav",
    phrase: "Show me the money!",
    movie: "JERRY MAGUIRE, TriStar, 1996",
    character: "ROD TIDWELL",
    actor: "Cuba Gooding, Jr."
  },
  "26": {
    file: "shedonehimwr.wav",
    phrase: "Why don't you come up sometime and see me?",
    movie: "SHE DONE HIM WRONG, Paramount, 1933",
    character: "LADY LOU",
    actor: "Mae West"
  },
  "27": {
    file: "midnightcowboy.wav",
    phrase: "(Hey!) I'm walking here! I'm walking here!",
    movie: "MIDNIGHT COWBOY, United Artists, 1969",
    character: "'RATSO' RIZZO",
    actor: "Dustin Hoffman"
  },
  "28": {
    file: "casablanca3.wav",
    phrase: "Play it, Sam. Play 'As Time Goes By",
    movie: "CASABLANCA, Warner Bros., 1942",
    character: "ILSA LASZLO",
    actor: "Ingrid Bergman"
  },
  "29": {
    file: "fewgoodmen.wav",
    phrase: "You can't handle the truth!",
    movie: "A FEW GOOD MEN, Columbia, 1992",
    character: "COL. NATHAN JESSEP",
    actor: "Jack Nicholson"
  },
  "30": {
    file: "grandhotel.wav",
    phrase: "I want to be alone",
    movie: "GRAND HOTEL, MGM, 1932",
    character: "GRUSINSKAYA",
    actor: "Greta Garbo"
  },
  "31": {
    file: "goneww2.wav",
    phrase: "After all, tomorrow is another day!",
    movie: "GONE WITH THE WIND, MGM, 1939",
    character: "SCARLETT O'HARA",
    actor: "Vivien Leigh"
  },
  "32": {
    file: "casablanca6.wav",
    phrase: "Round up the usual suspects",
    movie: "CASABLANCA, Warner Bros., 1942",
    character: "CAPT. RENAULT",
    actor: "Claude Rains"
  },
  "33": {
    file: "whenharrymetsally.wav",
    phrase: "I'll have what she's having",
    movie: "WHEN HARRY MET SALLY..., Columbia, 1989",
    character: "CUSTOMER",
    actor: "Estelle Reiner"
  },
  "34": {
    file: "tohaveandhavenot.wav",
    phrase:
      "You know how to whistle, don't you, Steve? You just put your lips together and blow",
    movie: "TO HAVE AND HAVE NOT, Warner Bros., 1944",
    character: "MARIE 'SLIM' BROWNING",
    actor: "Lauren Bacall"
  },
  "35": {
    file: "jaws.wav",
    phrase: "You're gonna need a bigger boat",
    movie: "JAWS, Universal, 1975",
    character: "MARTIN BRODY",
    actor: "Roy Scheider"
  },
  "36": {
    file: "treasuresm.wav",
    phrase:
      "Badges? We ain't got no badges! We don't need no badges! I don't have to show you any stinking badges!",
    movie: "THE TREASURE OF THE SIERRA MADRE, Warner Bros., 1948",
    character: "GOLD HAT",
    actor: "Alfonso Bedoya"
  },
  "37": {
    file: "terminator.wav",
    phrase: "I'll be back",
    movie: "THE TERMINATOR, Orion, 1984",
    character: "THE TERMINATOR",
    actor: "Arnold Schwarzenegger"
  },
  "38": {
    file: "prideoftheyankees.wav",
    phrase:
      "Today, I consider myself the luckiest man on the face of the earth",
    movie: "THE PRIDE OF THE YANKEES, RKO, 1942",
    character: "LOU GEHRIG",
    actor: "Gary Cooper"
  },
  "39": {
    file: "fieldofd.wav",
    phrase: "If you build it, he will come",
    movie: "FIELD OF DREAMS, Universal, 1989",
    character: "SHOELESS JOE JACKSON",
    actor: "voice of Ray Liotta"
  },
  "40": {
    file: "forrestg.wav",
    phrase:
      "My mama always said, 'Life is (was) like a box of chocolates. You never know what you're gonna get",
    movie: "FORREST GUMP, Paramount, 1994",
    character: "FORREST GUMP",
    actor: "Tom Hanks"
  },
  "41": {
    file: "bonnieclyde.wav",
    phrase: "We rob banks",
    movie: "BONNIE AND CLYDE, Warner Bros., 1967",
    character: "CLYDE BARROW",
    actor: "Warren Beatty"
  },
  "42": {
    file: "graduate5.wav",
    phrase: "Plastics.",
    movie: "THE GRADUATE, Embassy Pictures, 1967",
    character: "MR. MAGUIRE",
    actor: "Walter Brooke"
  },
  "43": {
    file: "casablanca7.wav",
    phrase: "We'll always have Paris",
    movie: "CASABLANCA, Warner Bros., 1942",
    character: "RICK BLAINE",
    actor: "Humphrey Bogart"
  },
  "44": {
    file: "sixthsense.wav",
    phrase: "I see dead people",
    movie: "THE SIXTH SENSE, Hollywood Pictures, 1999",
    character: "COLE SEAR",
    actor: "Haley Joel Osment"
  },
  "45": {
    file: "streetcardesire.wav",
    phrase: "Stella! Hey, Stella!",
    movie: "A STREETCAR NAMED DESIRE, Warner Bros., 1951",
    character: "STANLEY KOWALSKI",
    actor: "Marlon Brando"
  },
  "46": {
    file: "nowvoyager.wav",
    phrase: "Oh, Jerry, don't let's ask for the moon",
    movie: "NOW, VOYAGER, Warner Bros., 1942",
    character: "CHARLOTTE VALE",
    actor: "Bette Davis"
  },
  "47": {
    file: "shane4.wav",
    phrase: "Shane! Shane! Come back!",
    movie: "SHANE, Paramount, 1953",
    character: "JOEY STARRETT",
    actor: "Brandon DeWilde"
  },
  "48": {
    file: "somelike.wav",
    phrase: "Well, nobody's perfect",
    movie: "SOME LIKE IT HOT, United Artists, 1959",
    character: "OSGOOD FIELDING III",
    actor: "Joe E"
  },
  "49": {
    file: "frankenstein.wav",
    phrase: "It's alive! It's alive!",
    movie: "FRANKENSTEIN, Universal, 1931",
    character: "HENRY FRANKENSTEIN",
    actor: "Colin Clive"
  },
  "50": {
    file: "apollo13.wav",
    phrase: "Houston, we have a problem",
    movie: "APOLLO 13, Universal, 1995",
    character: "JIM LOVELL",
    actor: "Tom Hanks"
  },
  "51": {
    file: "dirtyharry.wav",
    phrase:
      "You've got to ask yourself one question: 'Do I feel lucky?' Well, do ya, punk?",
    movie: "DIRTY HARRY, Warner Bros., 1971",
    character: "HARRY CALLAHAN",
    actor: "Clint Eastwood"
  },
  "52": {
    file: "jerrymaguire2.wav",
    phrase: "You had me at 'hello'",
    movie: "JERRY MAGUIRE, TriStar, 1996",
    character: "DOROTHY BOYD",
    actor: "Renee Zellweger"
  },
  "53": {
    file: "animalcrackers.wav",
    phrase: "One morning I shot an elephant in my pajamas",
    movie: "ANIMAL CRACKERS, Paramount, 1930",
    character: "CAPT. JEFFREY T. SPAULDING",
    actor: "Groucho Marx"
  },
  "54": {
    file: "leagueoftheirown.wav",
    phrase: "There's no crying in baseball!",
    movie: "A LEAGUE OF THEIR OWN, Columbia, 1992",
    character: "JIMMY DUGAN",
    actor: "Tom Hanks"
  },
  "55": {
    file: "anniehall.wav",
    phrase: "La-dee-da, la-dee-da",
    movie: "ANNIE HALL, United Artists, 1977",
    character: "ANNIE HALL",
    actor: "Diane Keaton"
  },
  "56": {
    file: "psycho.wav",
    phrase: "(Well), A boy's best friend is his mother",
    movie: "PSYCHO, Paramount, 1960",
    character: "NORMAN BATES",
    actor: "Anthony Perkins"
  },
  "57": {
    file: "wallstreet.wav",
    phrase: "Greed, for lack of a better word, is good",
    movie: "WALL STREET, Twentieth Century Fox, 1987",
    character: "GORDON GEKKO",
    actor: "Michael Douglas"
  },
  "58": {
    file: "godfather2.wav",
    phrase: "Keep your friends close, but your enemies closer",
    movie: "THE GODFATHER: PART II, Paramount, 1974",
    character: "MICHAEL CORLEONE",
    actor: "Al Pacino"
  },
  "59": {
    file: "goneww3.wav",
    phrase: "As God is my witness, I'll never be hungry again",
    movie: "GONE WITH THE WIND, MGM, 1939",
    character: "SCARLETT O'HARA",
    actor: "Vivien Leigh"
  },
  "60": {
    file: "sonsofdes.wav",
    phrase: "Well, here's another nice mess you've gotten me into!",
    movie: "SONS OF THE DESERT, MGM, 1933",
    character: "OLIVER",
    actor: "Oliver Hardy"
  },
  "61": {
    file: "scarface.wav",
    phrase: "Say 'hello' to my little friend!",
    movie: "SCARFACE, Universal, 1983 ",
    character: "TONY MONTANA",
    actor: "Al Pacino"
  },
  "62": {
    file: "beyondtheforest.wav",
    phrase: "What a dump",
    movie: "BEYOND THE FOREST, Warner Bros., 1949",
    character: "ROSA MOLINE",
    actor: "Bette Davis"
  },
  "63": {
    file: "graduate.wav",
    phrase: "Mrs. Robinson, you're trying to seduce me. Aren't you?",
    movie: "THE GRADUATE, Embassy Pictures, 1967",
    character: "BENJAMIN BRADDOCK",
    actor: "Dustin Hoffman"
  },
  "64": {
    file: "drstrangelove.wav",
    phrase: "Gentlemen, you can't fight in here! This is the War Room!",
    movie: "DR. STRANGELOVE, Columbia, 1964",
    character: "PRESIDENT MERKIN MUFFLEY",
    actor: "Peter Sellers"
  },
  "65": {
    file: "advofsherlockh.wav",
    phrase: "Elementary, my dear Watson",
    movie: "THE ADVENTURES OF SHERLOCK HOLMES, Twentieth Century Fox, 1939",
    character: "SHERLOCK HOLMES",
    actor: "Basil Rathbone"
  },
  "66": {
    file: "planetofapes.wav",
    phrase: "Get your stinking paws off me, you damned dirty ape!",
    movie: "PLANET OF THE APES, Twentieth Century Fox, 1968",
    character: "GEORGE TAYLOR",
    actor: "Charlton Heston"
  },
  "67": {
    file: "casablanca2.wav",
    phrase:
      "Of all the gin joints in all the towns in all the world, she walks into mine",
    movie: "CASABLANCA, Warner Bros., 1942",
    character: "RICK BLAINE",
    actor: "Humphrey Bogart"
  },
  "68": {
    file: "shining.wav",
    phrase: "Here's Johnny!",
    movie: "THE SHINING, Warner Bros., 1980",
    character: "JACK TORRANCE",
    actor: "Jack Nicholson"
  },
  "69": {
    file: "poltergeist.wav",
    phrase: "They're here!",
    movie: "POLTERGEIST, MGM, 1982",
    character: "CAROL ANNE FREELING",
    actor: "Heather O'Rourke"
  },
  "70": {
    file: "marathonman2.wav",
    phrase: "Is it safe?",
    movie: "MARATHON MAN, Paramount, 1976",
    character: "DR. CHRISTIAN SZELL",
    actor: "Laurence ODR"
  },
  "71": {
    file: "jazzsinger.wav",
    phrase: "Wait a minute, wait a minute. You ain't heard nothin' yet!",
    movie: "THE JAZZ SINGER, Warner Bros., 1927",
    character: "JAKIE RABINOWITZ/JACK ROBIN",
    actor: "Al Jolson"
  },
  "72": {
    file: "mommiedearest.wav",
    phrase: "No wire hangers, ever!",
    movie: "MOMMIE DEAREST, Paramount, 1981",
    character: "JOAN CRAWFORD",
    actor: "Faye Dunaway"
  },
  "73": {
    file: "littlecaesar.wav",
    phrase: "Mother of mercy, is this the end of Rico?",
    movie: "LITTLE CAESAR, First National, 1930",
    character: "CESARE ENRICO 'RICO' BANDELLO",
    actor: "Edward G. Robinson"
  },
  "74": {
    file: "chinatown.wav",
    phrase: "Forget it, Jake. It's Chinatown",
    movie: " CHINATOWN, Paramount, 1974",
    character: "WALSH",
    actor: "Joe Mantell"
  },
  "75": {
    file: "streetcardesire2.wav",
    phrase: "I have always depended on the kindness of strangers",
    movie: " A STREETCAR NAMED DESIRE, Warner Bros., 1951",
    character: "BLANCHE DUBOIS",
    actor: "Vivien Leigh"
  },
  "76": {
    file: "terminator2.wav",
    phrase: "Hasta la vista, baby",
    movie: "TERMINATOR 2: JUDGMENT DAY, TriStar, 1991",
    character: "THE TERMINATOR",
    actor: "Arnold Schwarzenegger"
  },
  "77": {
    file: "soylentgreen.wav",
    phrase: "Soylent Green is people!",
    movie: "SOYLENT GREEN, MGM, 1973",
    character: "DET. ROBERT THORN",
    actor: "Charlton Heston"
  },
  "78": {
    file: "2001b.wav",
    phrase: "Open the pod bay doors, (please) HAL",
    movie: "2001: A SPACE ODYSSEY, MGM, 1968",
    character: "DAVE BOWMAN",
    actor: "Keir Dullea"
  },
  "79": {
    file: "airplane.wav",
    phrase:
      "Surely you can't be serious - I am serious. And don't call me Shirley",
    movie: "AIRPLANE!, Paramount, 1980",
    character: "TED STRIKER",
    actor: "Robert Hays"
  },
  "80": {
    file: "rocky.wav",
    phrase: "Yo, Adrian!",
    movie: "ROCKY, United Artists, 1976",
    character: "ROCKY BALBOA",
    actor: "Sylvester Stallone"
  },
  "81": {
    file: "funnygirl.wav",
    phrase: "Hello, gorgeous",
    movie: "FUNNY GIRL, Columbia, 1968",
    character: "FANNY BRICE",
    actor: "Barbra Streisand"
  },
  "82": {
    file: "animalhouse.wav",
    phrase: "Toga! Toga!",
    movie: "NATIONAL LAMPOON'S ANIMAL HOUSE, Universal, 1978",
    character: "JOHN 'BLUTO' BLUTARSKY",
    actor: "John Belushi"
  },
  "83": {
    file: "dracula.wav",
    phrase: "Listen to them. Children of the night. What music they make",
    movie: "DRACULA, Universal, 1931",
    character: "COUNT DRACULA",
    actor: "Bela Lugosi"
  },
  "84": {
    file: "kingkong.wav",
    phrase: "Oh, no, it wasn't the airplanes",
    movie: "KING KONG, RKO, 1933",
    character: "CARL DENHAM",
    actor: "Robert Armstrong"
  },
  "85": {
    file: "lordoftherings.wav",
    phrase: "My precious",
    movie: "THE LORD OF THE RINGS: THE TWO TOWERS, New Line Cinema, 2002",
    character: "GOLLUM",
    actor: "Andy Serkis"
  },
  "86": {
    file: "dogdayafternoon.wav",
    phrase: "Attica! Attica!",
    movie: "DOG DAY AFTERNOON, Warner Bros., 1975",
    character: "SONNY WORTZIK",
    actor: "Al Pacino"
  },
  "87": {
    file: "42ndst.wav",
    phrase:
      "Sawyer, you're going out a youngster, but you've got to come back a star!",
    movie: " 42ND STREET, Warner Bros., 1933",
    character: "JULIAN MARSH",
    actor: "Warner Baxter"
  },
  "88": {
    file: "ongoldenpond.wav",
    phrase:
      "Listen to me, mister. You're my knight in shining armor. Don't you forget it. You're going to get back on that horse, and I'm going to be right behind you, holding on tight, and away we're gonna go, go, go!",
    movie: "ON GOLDEN POND, Universal, 1981",
    character: "ETHEL THAYER",
    actor: "Katharine Hepburn"
  },
  "89": {
    file: "knuterockne.wav",
    phrase:
      "Tell 'em to go out there with all they got and win just one for the Gipper",
    movie: "KNUTE ROCKNE ALL AMERICAN, Warner Bros., 1940",
    character: "KNUTE ROCKNE",
    actor: "Pat O'Brien"
  },
  "90": {
    file: "goldfinger2.wav",
    phrase: "A martini. Shaken, not stirred",
    movie: "GOLDFINGER, United Artists, 1964",
    character: "JAMES BOND",
    actor: "Sean Connery"
  },
  "91": {
    file: "naughty90s.wav",
    phrase: "Who's on first",
    movie: "THE NAUGHTY NINETIES, Universal, 1945",
    character: "DEXTER",
    actor: "Bud Abbott"
  },
  "92": {
    file: "caddyshack.wav",
    phrase:
      "Cinderella story. Outta nowhere. A former greenskeeper, now, about to become the Masters champion. It looks like a mirac... It's in the hole! It's in the hole! It's in the hole!",
    movie: "CADDYSHACK, Orion, 1980",
    character: "CARL SPACKLER",
    actor: "Bill Murray"
  },
  "93": {
    file: "auntiemame.wav",
    phrase: "Life is a banquet, and most poor suckers are starving to death!",
    movie: "AUNTIE MAME, Warner Bros., 1958",
    character: "MAME DENNIS",
    actor: "Rosalind Russell"
  },
  "94": {
    file: "topgun.wav",
    phrase: "I feel the need...",
    movie: "TOP GUN, Paramount, 1986",
    character: "LT. PETE 'MAVERICK' MITCHELL",
    actor: "Tom Cruise"
  },
  "95": {
    file: "deadpoetssociety.wav",
    phrase: "Carpe diem. Seize the day, boys. Make your lives extraordinary",
    movie: "DEAD POETS SOCIETY, Touchstone, 1989",
    character: "JOHN KEATING",
    actor: "Robin Williams"
  },
  "96": {
    file: "moonstruck.wav",
    phrase: "Snap out of it!",
    movie: "MOONSTRUCK, MGM, 1987",
    character: "LORETTA CASTORINI",
    actor: "Cher"
  },
  "97": {
    file: "yankeedoodledandy.wav",
    phrase:
      "(Ladies and Gentlemen), My mother thanks you. My father thanks you. My sister thanks you. And I thank you",
    movie: "YANKEE DOODLE DANDY, Warner Bros., 1942",
    character: "GEORGE M. COHAN",
    actor: "James Cagney"
  },
  "98": {
    file: "dirtydancing.wav",
    phrase: "Nobody puts Baby in a corner.",
    movie: "DIRTY DANCING, Artisan, 1987",
    character: "JOHNNY CASTLE",
    actor: "Patrick Swayze"
  },
  "99": {
    file: "wizardofoz3.wav",
    phrase: "I'll get you, my pretty, and your little dog, too!",
    movie: " THE WIZARD OF OZ, MGM, 1939",
    character: "THE WICKED WITCH OF THE WEST",
    actor: "Margaret Hamilton"
  },
  "100": {
    file: "titanic.wav",
    phrase: "I'm (the) king of the world!",
    movie: "TITANIC, Paramount/Twentieth Century Fox, 1997",
    character: "JACK DAWSON",
    actor: "Leonardo DiCaprio"
  }
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
      return `<speak><audio src="https://iuriid.github.io/public/img/BestMovieQuotesWAVs/${randPair.file}">${randPair.phrase} - ${randPair.character} (${randPair.actor}) - ${randPair.movie}</audio></speak>`;
    } else {
      // We have a filter
      const filteredQuotes = {};
      myFilter.forEach(key => {
        filteredQuotes[key] = quotes[key];
      });      
      const randPair = randomKeyPair(filteredQuotes);
      return `<speak><audio src="https://iuriid.github.io/public/img/BestMovieQuotesWAVs/${randPair.file}">${randPair.phrase} - ${randPair.character} (${randPair.actor}) - ${randPair.movie}</audio></speak>`;
    }
  }

  // Quotes object has the only quote
  const theOnlyQuote = quotesVariants[Object.keys(quotesVariants)[0]];
  return `<speak><audio src="https://iuriid.github.io/public/img/BestMovieQuotesWAVs/${theOnlyQuote.file}">${theOnlyQuote.phrase} - ${theOnlyQuote.character} (${theOnlyQuote.actor}) - ${theOnlyQuote.movie}</audio></speak>`;
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
  const relevantQuotesKeys = ['10', '80', '81', '8', '20', '49', '52', '61', '63', '66', '68'];
  const ssml = randomQuote(quotes, relevantQuotesKeys);
  console.log(`SSML: ${ssml}`);
  conv.ask(ssml);
});


app.intent('smalltalk.greetings.whatsup', (conv) => {
    const relevantQuotesKeys = ['1', '44', '50'];
  const ssml = randomQuote(quotes, relevantQuotesKeys);
  console.log(`SSML: ${ssml}`);
  conv.ask(ssml);
});


app.intent('smalltalk.greetings.whatcanyoudo', (conv) => {
    const relevantQuotesKeys = ['2', '30'];
const ssml = randomQuote(quotes, relevantQuotesKeys);
console.log(`SSML: ${ssml}`);
conv.ask(ssml);
});


app.intent('smalltalk.greetings.whereareyou', (conv) => {
    const relevantQuotesKeys = ['4', '41', '50'];
const ssml = randomQuote(quotes, relevantQuotesKeys);
console.log(`SSML: ${ssml}`);
conv.ask(ssml);
});


app.intent('default.fallback', (conv) => {
    const relevantQuotesKeys = ['8', '11', '34', '50', '55', '88'];
const ssml = randomQuote(quotes, relevantQuotesKeys);
console.log(`SSML: ${ssml}`);
conv.ask(ssml);
});


app.intent('smalltalk.greetings.goodmorning', (conv) => {
    const relevantQuotesKeys = ['12'];
const ssml = randomQuote(quotes, relevantQuotesKeys);
console.log(`SSML: ${ssml}`);
conv.ask(ssml);
});


app.intent('smalltalk.whatislove', (conv) => {
    const relevantQuotesKeys = ['13'];
const ssml = randomQuote(quotes, relevantQuotesKeys);
console.log(`SSML: ${ssml}`);
conv.ask(ssml);
});


app.intent('smalltalk.whatisit', (conv) => {
    const relevantQuotesKeys = ['14'];
const ssml = randomQuote(quotes, relevantQuotesKeys);
console.log(`SSML: ${ssml}`);
conv.ask(ssml);
});


app.intent('smalltalk.agent.acquaintance', (conv) => {
    const relevantQuotesKeys = ['16', '22', '63', '65', '68', '75', '100'];
const ssml = randomQuote(quotes, relevantQuotesKeys);
console.log(`SSML: ${ssml}`);
conv.ask(ssml);
});


app.intent('smalltalk.greetings.how_are_you', (conv) => {
    const relevantQuotesKeys = ['19', '30', '38', '40', '41', '44', '53'];
const ssml = randomQuote(quotes, relevantQuotesKeys);
console.log(`SSML: ${ssml}`);
conv.ask(ssml);
});


app.intent('smalltalk.greetings.bye', (conv) => {
    const relevantQuotesKeys = ['37', '47', '61', '76'];
const ssml = randomQuote(quotes, relevantQuotesKeys);
console.log(`SSML: ${ssml}`);
conv.ask(ssml);
});


app.intent('smalltalk.agent.my_friend', (conv) => {
    const relevantQuotesKeys = ['56', '58', '63'];
const ssml = randomQuote(quotes, relevantQuotesKeys);
console.log(`SSML: ${ssml}`);
conv.ask(ssml);
});


app.intent('smalltalk.whatislife', (conv) => {
    const relevantQuotesKeys = ['93'];
const ssml = randomQuote(quotes, relevantQuotesKeys);
console.log(`SSML: ${ssml}`);
conv.ask(ssml);
});

// Cloud Functions for Firebase handler for HTTPS POST requests.
// https://developers.google.com/actions/dialogflow/fulfillment#building_fulfillment_responses
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
