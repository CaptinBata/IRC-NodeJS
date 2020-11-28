const WebSocket = require('ws');
const { AuthorisationRequest, AuthorisationResponse, UserJoinedChannel, UserLeftChannel, UserConnect, UserDisconnect, SentMessage, ReceivedMessage } = require('./utils/dataStructure')

class Server {
    constructor() {
        this.clients = [];
        this.server = new WebSocket.Server({ port: 8080 });
    }

    setupListeners() {
        this.server.on('connection', (client) => {
            this.clients.push(client);
            this.setupListenersForClient(client);
        })
    }

    setupListenersForClient(client) {
        client.on('authorisationRequest', (authRequestData) => {
            //do some actual auth here for the login user
            return new AuthorisationResponse({ statusCode: 0 }) //auth

        })

        client.on('userJoinedChannel', (userJoinedChannelData) => {
            //add user to specific requested channel
        })

    }

}

