const { json } = require("express");
const WebSocket = require("ws")
const { SentMessage, AuthorisationRequest, AuthorisationResponse, ReceivedMessage } = require("../../../Utils/dataStructure");

class IRCClient {

    constructor(address, userName) {
        this.address = address;
        this.userName = userName
        this.ws = new WebSocket(address);
        this.setupListeners();
    }

    setupListeners() {
        this.ws.on('open', function open() { //Connect event
            console.log("I have connected!")
        });

        this.ws.on('message', (data) => {
            this.processIncomingRequest(data)
        });
    }

    processIncomingRequest(data) {
        //change this to deal with incoming messages etc
        let dataObj = this.parseData(data);

        switch (dataObj.constructor) {
            case ReceivedMessage: this.processSentMessage(dataObj); break;
            default:
                console.log(`Could not find request type: ${data.constructor}. Stopping request execution`);
                break;
        }
    }

    processSentMessage(dataObj) {
        //Figure out how to display on front page here
        console.log(dataObj.json());
    }

    _sendMessageToWebsocket(data) {
        this.ws.send(JSON.stringify(data));
    }

    sendMessage(recipient, message) {
        let messageToSend = new SentMessage({ date: new Date(Date.now()), message: message, to: recipient, from: this.userName }).json();
        console.log("Sending message:", messageToSend)
        this._sendMessageToWebsocket(messageToSend)
    }

    parseData(clientData) {
        let jsonObj = JSON.parse(clientData)
        
        switch (jsonObj.type) {
            case "AuthorisationResponse": return new AuthorisationResponse(clientData.data);
            case "ReceivedMessage": return new ReceivedMessage(clientData.data);
        }
    }

    async authorise(data) {
        this._sendMessageToWebsocket(new AuthorisationRequest(data).json()) //Test this works
        console.log("Sent authorisationRequest")

        return new Promise((resolve, reject) => {
            this.ws.once('message', (data) => {
                let authResponse = this.parseData(data);
                resolve(authResponse.json())
            })
        });
    }
}

module.exports = IRCClient