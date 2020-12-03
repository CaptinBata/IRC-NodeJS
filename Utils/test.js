//Not used in production, used for testing js things

const { AuthorisationRequest, AuthorisationResponse, UserJoinedChannel, UserLeftChannel, UserConnect, UserDisconnect, SentMessage, ReceivedMessage } = require('./dataStructure')

class One {
    delete = false;
}

class Two {
    delete = false;
}

list = [new One(), new One(), new Two()]

userJoins = list.filter(element => element instanceof Two)
userJoins[0].delete = true;

console.log(list[2].delete)
