const WebSocket = require("ws")
const { SentMessage, AuthorisationRequest, AuthorisationResponse } = require("../../../Utils/dataStructure");

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

        this.ws.on('receiveMessage', (data) => {
            console.log(data);
        });
    }

    sendMessage(recipient, message) {
        this.ws.emit("sendMessage", new SentMessage(new Date(Date.now()), message, recipient, this.userName))
    }

    async authorise(data) {
        let eventRequestData = new AuthorisationRequest(data)
        this.ws.emit("authorisationRequest", eventRequestData) //Test this works

        return new Promise((resolve, reject) => {
            this.ws.once('authorisationResponse', (data) => {
                let eventResponseData = new AuthorisationResponse(data.data)
                resolve(eventResponseData.statusCode)
            })
        });
    }
}

module.exports = IRCClient