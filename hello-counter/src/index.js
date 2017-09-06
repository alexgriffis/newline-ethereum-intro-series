let app = document.querySelector('#app')
let counterAbi = require('./counter_sol_Counter_abi.json')
var Web3 = require('web3')
var web3 = new Web3()

window.web3 = web3

web3.setProvider(
  new web3.providers.HttpProvider('http://localhost:8545')
)
var me;
web3.eth.personal.getAccounts().then((accounts) => {
  me = accounts[0]
})

let contractAddr = "0xd0ddaaa8d06e4eca9e87b55c3573738dbebc16e8"

var counterContract = new web3.eth.Contract(
  counterAbi,
  contractAddr
)
window.counterContract = counterContract
window.checkBalance = function () {
  web3.eth.getBalance(me).then(balance => {
    console.log(balance)
  })
}
window.checkCounter = function () {
  return counterContract.methods.get().call().then((count) => {
    document.getElementById('counterValue').innerText = count
  })
}
window.incrementCounter = function () {
  let pass = document.getElementById('password').value
  web3.eth.personal.unlockAccount(me, pass)
  return counterContract.methods.increment().send({ from: me, gas: 1000000 }).then((err, resp) => console.log(err, resp))
}

app.innerHTML = `
<h2>Welcome to hello-counter</h2>
<button type="button" onClick="checkBalance()">Check Balance</button>
<button type="button" onClick="checkCounter()">Check Counter</button>
<form action='' onsubmit="incrementCounter();return false;">
  <input id="password" type="password" placeholder="password"/>
  <button type="submit" ">Increment Counter</button>
</form>
<div><tt id="counterValue"></tt></div>`
