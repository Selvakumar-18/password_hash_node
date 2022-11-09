const mongoose = require ('mongoose')
const crypto = require('crypto'); 

let register  = new mongoose.Schema({

    name: {type: String},
    email : {type: String},
    hash : String, 
    salt : String
});


register.methods.setPassword = function(password) 
{ 
       this.salt = crypto.randomBytes(16).toString('hex'); 
        
       this.hash = crypto.pbkdf2Sync(password, this.salt,1000, 64, `sha512`).toString(`hex`); 
}; 


register.methods.validPassword = function(password) 
{ 
    var hash = crypto.pbkdf2Sync(password,this.salt, 1000, 64,`sha512`).toString(`hex`); 
    return this.hash === hash; 
}; 

const userModel = mongoose.model('user',register)

module.exports = userModel


