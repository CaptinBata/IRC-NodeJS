const WebSocket = require('ws');

class ircClient {
    constructor(username, client) {
        this.username = username;
        this.client = client
        this.channels = []
    }

    setUsername(username) {
        this.username = username;
    }

    removeUsername() {
        this.username = "";
    }

    addChannel(channel) {
        this.channels.push(channel)
    }

    removeChannel(channel) {
        this.channels.splice(this.channels.indexOf(channel), 1);
    }
}

module.exports = {
    ircClient
}