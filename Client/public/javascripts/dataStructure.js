function makeStruct(names) {
    var count = names.length;
    return class {
        constructor(data) {
            for (const name of names)
                this[name] = data[name]
        }
    };
}

let AuthorisationRequest = makeStruct(["username", "password"])
let AuthorisationResponse = makeStruct(["statusCode"])
let UserJoinedChannel = makeStruct(["user", "channel"])
let UserLeftChannel = makeStruct(["user", "leftType"])
let UserConnect = makeStruct([])
let UserDisconnect = makeStruct([])
let SentMessage = makeStruct(["date", "message", "to", "from"])
let ReceivedMessages = makeStruct(["date", "message", "to", "from"])

modules.exports = {
    AuthorisationRequest,
    AuthorisationResponse,
    UserJoinedChannel,
    UserLeftChannel,
    UserConnect,
    UserDisconnect,
    SentMessage,
    ReceivedMessages
}

