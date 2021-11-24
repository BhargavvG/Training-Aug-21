
// 3. Accept your name from command line. And append it to person.txt as “hello “+ “name”.
var fs = require('fs')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})


readline.question(`Please Enter your name?`, name => {
    fs.appendFile('./person.txt', `Hello ${name}!`, function (error) 
    {
        console.log(error)
    })
    readline.close()
})

// 4. Create two txt files, write some dummy text. Read two file content and print
//  it in the console. use async and await.
(async ()=>{
  try {
    const file1 = await fs.readFile('./demo.txt', 'utf8')
    console.log(file1)
    const file2 = await fs.readFile('./demo2.txt', 'utf8')
    console.log(file2)
  }
catch (err) 
  {
    console.error(err)
  }
})


// 5. Write your address in one txt file and find out how many consonants are there.

fs.readFile('./demo3.txt','utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(data.length-((data.match(/[aeiou]/gi)).length))
  })
  