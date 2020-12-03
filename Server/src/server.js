const WebSocket = require('ws');
const { ircClient } = require('./ircClientDetails')
const { AuthorisationRequest, AuthorisationResponse, UserJoinedChannel, UserLeftChannel, UserConnect, UserDisconnect, SentMessage, ReceivedMessage } = require('../../Utils/dataStructure')

class Server {
    constructor() {
        this.clients = [];
        this.server = null;
    }

    start() {
        this.server = new WebSocket.Server({ port: 8080 });
        this.setupListeners();
    }

    setupListeners() {
        this.server.on('connection', (client) => {
            this.clients.push(new ircClient("", client));
            this.setupListenersForClient(client);
        })

        this.server.on('close', (client) => {
            console.log("The following client disconnected: ", client)
        })
    }

    setupListenersForClient(client) {
        client.on('authorisationRequest', (authRequestData) => {
            //do some actual auth here for the login user
            client.emit('authorisationResponse', new AuthorisationResponse({ statusCode: 0 })) //auth

        })

        client.on('userJoinedChannel', (userJoinedChannelData) => {
            //add user to specific requested channel
        })

        client.on('userLeftChannel', (userLeftChannelData) => {
            //remove user from specific requested channel
        })

        client.on('userConnect', (userConnectData) => {
            //user has succesfully logged into server, send message to all channels their apart of that they are online.
            let username = userConnectData.username;
            this.clients[this.clients.indexOf(client)].setUsername(username);
        })

        client.on('userDisconnect', (userDisconnectData) => {
            //user has succesfully logged out of server, send message to all channels their apart of that they are offline.
            let username = userDisconnectData.username;
            let userClient = null;

            this.clients.forEach(client => {
                if (client.username == username)
                    userClient = client;
            })

            if (userClient != null) {
                //loop through all other clients and send message of disconnect
                this.clients[this.clients.indexOf(userClient)].removeUsername(); //remove username from client in list
            }
        })

    }

}

