const WebSocket = require("ws")

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

        this.ws.on('message', function incoming(data) {
            console.log(data);
        });
    }
}

module.exports = IRCClient