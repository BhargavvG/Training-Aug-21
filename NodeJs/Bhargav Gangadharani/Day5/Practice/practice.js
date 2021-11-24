const EventEmitter = require('events')
const eventEmitter = new EventEmitter();
const myEmitter = new EventEmitter();

//  Create Event
eventEmitter.on('start', () => {
    console.log('started')
  });
// Emit event.
eventEmitter.emit('start');

// Emit event with argument.
eventEmitter.on('num', number => {
    console.log(`started ${number}`)
  })
  
eventEmitter.emit('num', 23)


// call function.
function c1() {
   console.log('an event occurred!');
}

function c2() {
   console.log('yet another event occurred!');
}

myEmitter.on('eventOne', c1); // Register for eventOne
myEmitter.on('eventOne', c2); // Register for eventOne


// Event that should be fired once.
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.once('event', () => {
  console.log("will be fired only once");
});
myEmitter.emit('event');
// Prints message.
myEmitter.emit('event');
// Ignored

