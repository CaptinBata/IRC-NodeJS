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

    parseData(clientData) {
        switch (clientData.type) {
            case "AuthorisationRequest": return new AuthorisationRequest(clientData.data);
            case "UserJoinedChannel": return new UserJoinedChannel(clientData.data);
            case "UserLeftChannel": return new UserLeftChannel(clientData.data);
            case "UserConnect": return new UserConnect(clientData.data);
            case "UserDisconnect": return new UserDisconnect(clientData.data);
            case "SentMessage": return new SentMessage(clientData.data);
        }
    }

    setupListenersForClient(client) {
        client.on('message', (clientData) => {
            dataType = this.parseData(clientData);

            switch (dataType) {
                case AuthorisationRequest: processAuthorisationRequest(dataType);
                case UserJoinedChannel: processUserJoinedChannel(dataType);
                case UserLeftChannel: processUserLeftChannel(dataType);
                case UserConnect: processUserConnect(dataType);
                case UserDisconnect: processUserDisconnect(dataType);
                case SentMessage: processSentMessage(dataType);
            }
        })
    }

    processSentMessage(sentMessageData) {
        let recipient = sentMessageData.to; //add check for DM or channel message
        this.clients.forEach(client => {
            client.send(new ReceivedMessage(sentMessageData.json().data).json()) //This is ugly, will change later - Nyk 5/12/20
        })
    }
}

module.exports = Server
