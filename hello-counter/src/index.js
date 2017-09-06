let app = document.querySelector('#app')
var Web3 = require('web3')
var web3 = new Web3()
window.web3 = web3

web3.setProvider(
  new web3.providers.HttpProvider('http://localhost:8545')
)
window.checkBalance = function () {
  return web3.eth.personal.getAccounts().then(accounts => {
    console.log(accounts)
    web3.eth.getBalance(accounts[0]).then(balance => {
      console.log(balance)
    })
  })
}

app.innerHTML = `<h2>Welcome to hello-counter</h2>
<button type="button" onClick="checkBalance()">Check Balance</button>`
