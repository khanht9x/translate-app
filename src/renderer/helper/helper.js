var crypto = require("crypto");
const si = require("systeminformation");

export default {
  hash: function(text, password) {
    var mykey = crypto.createCipher("aes-128-cbc", password);
    var mystr = mykey.update(text, "utf8", "hex");
    mystr += mykey.update.final("hex");
    return mystr;
  },
  getSerinumDisk: function() {
    let serialNum = "";
    si.diskLayout()
      .then(diskInfo => {
        serialNum = diskInfo[0].serialNum;
      })
      .catch(error => {
        console.log(error);
      });
    return serialNum;
  }
};
