class messageStructure {
    constructor(date, message, from, recepient) {
        this.MessageDate = date;
        this.Message = message;
        this.Sender = from;
        this.Recepient = recepient;
    }

    getMessage() {
        return {
            "Date": this.MessageDate.toLocaleString(),
            "Message": this.Message,
            "From": this.Sender,
            "To": this.Recepient
        }
    }
}

module.exports = messageStructure