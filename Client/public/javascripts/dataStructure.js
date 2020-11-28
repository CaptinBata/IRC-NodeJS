function makeClass(names) {
    var count = names.length;
    return class {
        constructor(data) {
            for (const name of names)
                this[name] = data[name]
        }
    };
}

let AuthorisationRequest = makeClass(["username", "password"])
let AuthorisationResponse = makeClass(["statusCode"])
let UserJoinedChannel = makeClass(["user", "channel"])
let UserLeftChannel = makeClass(["user", "leftType"])
let UserConnect = makeClass([])
let UserDisconnect = makeClass([])
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

