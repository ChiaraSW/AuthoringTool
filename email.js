var nodemailer = require("nodemailer");
function Connection() {
	var smtpTransport = nodemailer.createTransport({
	    service: "gmail",
	    host: "smtp.gmail.com",
	    auth: {
	        user: "",
	        pass: ""
	    }
	});
	
	this.init = function(){
		return smtpTransport;
	};
}
module.exports = new Connection();