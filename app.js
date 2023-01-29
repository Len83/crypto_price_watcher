const fetch = require('node-fetch')

const jsdom = require('jsdom')

async function fetchHTML(url){
  try{
    // accessing the url 
    const response = await fetch(url)

    // getting the text of the url
    const txt = await response.text()

    // convert the text into an object (final output)
    // const page = new DOMParser().parseFromString(txt, 'text/html')
    const page = new jsdom.JSDOM(txt)
    return page
  }catch(e){
    return false
  }
}

function getPrice(page){
  const obj = page.window.document.querySelector('.priceValue ')
  let price = obj.textContent
  const priceAsNumber = Number(price.replace(/[^0-9.-]+/g,""))
  return priceAsNumber
}

function checkThreshold(price, threshold){
      if(price > threshold){
      console.log(`The price is over $${threshold}`)
    }else{
      console.log(`The price is NOT over $${threshold}`)
  }
}

// Create an array of crypto names
// const cryptoNameArray = ['bitcoin', 'ethereum', 'cardano', 'ripple']
const cryptoDictionary = {
  'bitcoin': 20000,
  'ethereum':3000,
  'cardano':0.50, 
  'ripple':1
}

for (const cryptoName in cryptoDictionary){
  // Create a template URL where we can switch in our crypto names
  let templateURL = `https://coinmarketcap.com/currencies/${cryptoName}/`

fetchHTML(templateURL).then((page)=>{
  const price = getPrice(page)
  console.log(`The current price is ${cryptoName} is $${price}`)
  checkThreshold(price, cryptoDictionary[cryptoName])
    }
  )
}

// lesson 43 Part3 - Installing and Using Twilio
