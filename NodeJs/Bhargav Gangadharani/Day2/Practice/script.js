// Practice File

[1, 2, 3].forEach(num => { console.log(num)})

// accepting commandline arguments.
process.argv.forEach(arg=>{console.log(arg)})


// REPL commands
// Number. to get all number functions
// Math. to get math functions

// REPL Commands 
// .break    Sometimes you get stuck, this gets you out
// .clear    Alias for .break
// .editor   Enter editor mode
// .exit     Exit the repl
// .help     Print this help message
// .load     Load JS from a file into the REPL session
// .save     Save all evaluated commands in this REPL session to a file

// Press ^C to abort current expression, ^D to exit the repl

// Output to command line.
console.log('This output is printed on the console %s', 'screen');

// %s format a variable as a string
// %d format a variable as a number
// %i format a variable as its integer part only
// %o format a variable as an object

const oranges = ['orange', 'orange']
const apples = ['just one apple']
oranges.forEach(fruit => {
  console.count(fruit)
})
apples.forEach(fruit => {
  console.count(fruit)
})

const function2 = () => console.trace()
const function1 = () => function2()
function1()

// color to output
console.log('\x1b[33m%s\x1b[0m', 'hi!')

// color using chalk 
const chalk = require('chalk')
console.log(chalk.yellow('hi!'))


const ProgressBar = require('progress')
//  Progress bar
const bar = new ProgressBar(':bar', { total: 10 })
const timer = setInterval(() => {
  bar.tick()
  if (bar.complete) {
    clearInterval(timer)
  }
}, 100)


// read input from command line
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  readline.question(`What's your name?`, name => {
    console.log(`Hi ${name}!`)
    readline.close()
  })