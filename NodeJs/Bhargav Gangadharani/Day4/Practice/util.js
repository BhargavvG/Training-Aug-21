const utils = require('util');
const fs = require('fs');

fs.access('file/that/does/not/exist', (err) => {
    const name = util.getSystemErrorName(err.errno);
    console.error(name);  // ENOENT
  });

async function fn() {
  return 'hello world';
}
const callbackFunction = util.callbackify(fn);

callbackFunction((err, ret) => {
  if (err) throw err;
  console.log(ret);
});


const debuglog = util.debuglog('foo');

debuglog('hello from foo [%d]', 123);