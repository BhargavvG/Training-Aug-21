const os = require('os');

var totalMemory = os.totalmem();

var freeMemory = os.freemem();

var homedir = os.homedir();

var hostname = os.hostname();

var uptime = os.uptime();

var cpus = os.cpus();

var version = os.version();

var userinfo = os.userInfo();

var type = os.type();

var tmpdir = os.tmpdir();

var platform = os.platform();

var constants = os.constants();

console.log(`${totalMemory}, ${freeMemory}, ${homedir}, ${hostname}, ${uptime}, ${cpus}, ${version}, ${userinfo}, ${type}, ${tmpdir}, ${platform}, ${constants}`); 