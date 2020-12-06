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
        this.server.on('connection', (wsClient) => {
            this.clients.push(new ircClientDetails("", wsClient));
            this.setupListenersForClient(wsClient);
        })

        this.server.on('close', (wsClient) => {
            console.log("A client disconnected")
        })
    }

    parseData(clientData) {
        let jsonObj = JSON.parse(clientData)

        switch (jsonObj.type) {
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
            let dataType = this.parseData(clientData);

            switch (dataType.constructor) {
                case AuthorisationRequest: this.processAuthorisationRequest(client, dataType); break;
                case UserJoinedChannel: this.processUserJoinedChannel(client, dataType); break;
                case UserLeftChannel: this.processUserLeftChannel(client, dataType); break;
                case UserConnect: this.processUserConnect(client, dataType); break;
                case UserDisconnect: this.processUserDisconnect(client, dataType); break;
                case SentMessage: this.processSentMessage(client, dataType); break;
                default:
                    console.log(`Could not find request type: ${dataType.constructor}. Stopping request execution`);
                    break;
            }
        })
    }

    _sendMessageToWebsocket(client, data) {
        client.send(JSON.stringify(data));
    }

    processSentMessage(sendingClient, sentMessageData) {
        let recipient = sentMessageData.to; //add check for DM or channel message
        this.clients/*.filter(otherClient => otherClient.getWebSocketClient() != sendingClient)*/ //Use this for when actually sending to other clients that are not the sending one. Used for testing atm
            .forEach(client => {
                this._sendMessageToWebsocket(client.getWebSocketClient(), new ReceivedMessage(sentMessageData.json().data).json()) //This is ugly, will change later - Nyk 5/12/20
            })
    }

    processAuthorisationRequest(sendingClient, authRequestData) {
        //do auth check here
        this._sendMessageToWebsocket(sendingClient, new AuthorisationResponse({ statusCode: 200, body: "Ok" }).json())
    }

}

module.exports = Server
