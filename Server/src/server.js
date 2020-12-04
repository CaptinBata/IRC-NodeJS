const WebSocket = require('ws');
const { ircClientDetails } = require('./ircClientDetails')
const { AuthorisationRequest, AuthorisationResponse, UserJoinedChannel, UserLeftChannel, UserConnect, UserDisconnect, SentMessage, ReceivedMessage } = require('../../Utils/dataStructure')

class Server {
    constructor() {
        console.log("Intialising Server")
        this.clients = [];
        this.server = null;
        console.log("Server Intialised")
    }

    start() {
        console.log("Starting Server")
        this.server = new WebSocket.Server({ port: 8080 });
        console.log("Setting up listeners")
        this.setupListeners();
        console.log("Server started successfully")
    }

    setupListeners() {
        this.server.on('connection', (client) => {
            console.log("Client has connected!", client)
            this.clients.push(new ircClientDetails("", client));
            this.setupListenersForClient(client);
        })

        this.server.on('close', (client) => {
            console.log("The following client disconnected: ", client)
        })
    }

    setupListenersForClient(client) {
        client.addListener('authorisationRequest', (authRequestData) => {
            console.log("I received auth request!", authRequestData)
            //do some actual auth here for the login user
            client.emit('authorisationResponse', new AuthorisationResponse({ statusCode: 0 })) //auth
        })

        client.addEventListener('userJoinedChannel', (userJoinedChannelData) => {
            //add user to specific requested channel
        })

        client.addEventListener('userLeftChannel', (userLeftChannelData) => {
            //remove user from specific requested channel
        })

        client.addEventListener('userConnect', (userConnectData) => {
            //user has succesfully logged into server, send message to all channels their apart of that they are online.
            let username = userConnectData.username;
            this.clients[this.clients.indexOf(client)].setUsername(username);
        })

        client.addEventListener('userDisconnect', (userDisconnectData) => {
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

        client.addEventListener('sentMessage', (sentMessageData) => {
            let recipient = sentMessageData.to; //add check for DM or channel message
            this.clients.filter(element => element.getWebSocketClient() != client &&
                client.getUsername() == recipient).forEach(otherClient => { //filter and get all connected clients that are not the one sending the message and the recipient
                    otherClient.emit('receivedMessage', sentMessageData)
                })
        })

    }

}

module.exports = Server
