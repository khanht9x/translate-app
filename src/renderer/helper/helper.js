const si = require("systeminformation");
var crypto = require("crypto");

export default {
  md5: function(data) {
    const hash = crypto
      .createHash("md5")
      .update(data)
      .digest("hex");
    return hash;
  },
  getSerialNum: async function() {
    const data = await si.diskLayout();
    return data;
  }
};
