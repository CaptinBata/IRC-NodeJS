function makeClass(names) {
    return class {
        constructor(data) {
            for (const name of names)
                this[name] = data[name]
        }

        json() { //made incase we can't send class instances across a websocket
            let jsonObject = {};
            for (const name of names) {
                jsonObject[name] = this[name]
            }
            return jsonObject;
        }
    };
}

let AuthorisationRequest = makeClass(["username", "password"])
let AuthorisationResponse = makeClass(["statusCode"])
let UserJoinedChannel = makeClass(["user", "channel"])
let UserLeftChannel = makeClass(["user", "leftType"])
let UserConnect = makeClass(["username"])
let UserDisconnect = makeClass(["username"])
let SentMessage = makeClass(["date", "message", "to", "from"])
let ReceivedMessage = makeClass(["date", "message", "to", "from"])

module.exports = {
    AuthorisationRequest,
    AuthorisationResponse,
    UserJoinedChannel,
    UserLeftChannel,
    UserConnect,
    UserDisconnect,
    SentMessage,
    ReceivedMessage
}