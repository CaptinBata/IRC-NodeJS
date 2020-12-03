class MessageStructure {
    constructor(date, message, from, recepient) {
        this.messageDate = date;
        this.message = message;
        this.sender = from;
        this.recepient = recepient;
    }

    getMessage() {
        return {
            "Date": this.messageDate.toUTCString(),
            "Message": this.message,
            "From": this.sender,
            "To": this.recepient
        }
    }
}

module.exports = MessageStructure