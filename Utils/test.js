//Not used in production, used for testing js things

const { AuthorisationRequest, AuthorisationResponse, UserJoinedChannel, UserLeftChannel, UserConnect, UserDisconnect, SentMessage, ReceivedMessage } = require('./dataStructure')


let authRequest = new AuthorisationRequest({ username: "Nyk", password: "Nah" })

console.log(authRequest.json())