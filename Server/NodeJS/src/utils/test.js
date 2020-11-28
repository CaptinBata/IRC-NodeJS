//Not used in production, used for testing js things

const { AuthorisationRequest, AuthorisationResponse, UserJoinedChannel, UserLeftChannel, UserConnect, UserDisconnect, SentMessage, ReceivedMessage } = require('./dataStructure')

let something = new AuthorisationResponse({ statusCode: 100 })
console.log(something.json());