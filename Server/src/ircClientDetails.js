const WebSocket = require('ws');

class ircClientDetails {
    constructor(username, client) {
        this.username = username;
        this.client = client
        this.channels = []
    }

    setUsername(username) {
        this.username = username;
    }

    getUsername() {
        return this.username
    }

    getWebSocketClient() {
        return this.client;
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
    ircClientDetails
}