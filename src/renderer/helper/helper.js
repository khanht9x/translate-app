const si = require("systeminformation");
var crypto = require("crypto");

export default {
  hash: function(text, password) {
    var mykey = crypto.createCipher("aes-128-cbc", password);
    var mystr = mykey.update(text, "utf8", "hex");
    mystr += mykey.update.final("hex");
    return mystr;
  },
  getSerialNum: async function() {
    const data = await si.diskLayout();
    console.log(data);
    return data;
  }
};
