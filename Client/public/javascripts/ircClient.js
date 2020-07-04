const WebSocket = require("ws")
const { AuthorisationRequest, AuthorisationResponse } = require("./dataStructure");
const { json } = require("express");

class IRCClient {

    constructor(address) {
        this.address = address;
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

    async authorise(data) {
        let eventRequestData = new AuthorisationRequest(data)
        this.ws.emit("authorisationRequest", JSON.stringify(eventRequestData)) //Test this works

        return new Promise((resolve, reject) => {
            this.ws.once('authorisationResponse', (data) => {
                let eventResponseData = new AuthorisationResponse(data.data)
                resolve(eventResponseData.statusCode)
            })
        });
    }
}

module.exports = IRCClient