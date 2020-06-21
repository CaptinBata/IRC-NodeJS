class messageStructure {
    constructor(date, message, from, recepient) {
        this.MessageDate = date;
        this.Message = message;
        this.Sender = from;
        this.Recepient = recepient;
    }

    getMessage() {
        //let test = new Date(this.MessageDate).toUTCString()
        return {
            "Date": this.MessageDate.toUTCString(),
            "Message": this.Message,
            "From": this.Sender,
            "To": this.Recepient
        }
    }
}

module.exports = messageStructure