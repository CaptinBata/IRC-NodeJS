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
            console.log(data);
        });
    }

    _sendMessageToWebsocket(data) {
        this.ws.send("message", data)
    }

    sendMessage(recipient, message) {
        this._sendMessageToWebsocket(new SentMessage(new Date(Date.now()), message, recipient, this.userName).json())
    }

    parseData(clientData) {
        switch (clientData.type) {
            case "AuthorisationResponse": return new AuthorisationRequest(clientData.data);
            case "ReceivedMessage": return new ReceivedMessage(clientData.data);
        }
    }

    async authorise(data) {
        this._sendMessageToWebsocket(new AuthorisationRequest(data).json()) //Test this works
        console.log("Sent authorisationRequest")

        return new Promise((resolve, reject) => {
            this.ws.once('authorisationResponse', (data) => {
                let eventResponseData = new AuthorisationResponse(data.data)
                resolve(eventResponseData.statusCode)
            })
        });
    }
}

module.exports = IRCClient