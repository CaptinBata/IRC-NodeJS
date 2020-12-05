function makeClass(type, names) {
    return class {
        constructor(data) {
            for (const name of names)
                this[name] = data[name]
        }

        json() { //made incase we can't send class instances across a websocket
            let jsonObject = {
                type: type,
                data: {}
            };
            for (const name of names) {
                jsonObject.data[name] = this[name]
            }
            return jsonObject;
        }
    };
}

let AuthorisationRequest = makeClass("AuthorisationRequest", ["username", "password"])
let AuthorisationResponse = makeClass("AuthorisationResponse", ["statusCode", "body"])
let UserJoinedChannel = makeClass("UserJoinedChannel", ["user", "channel"])
let UserLeftChannel = makeClass("UserLeftChannel", ["user", "leftType"])
let UserConnect = makeClass("UserConnect", ["username"])
let UserDisconnect = makeClass("UserDisconnect", ["username"])
let SentMessage = makeClass("SentMessage", ["date", "message", "to", "from"])
let ReceivedMessage = makeClass("ReceivedMessage", ["date", "message", "to", "from"])

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