eth.sendTransaction(
  {
    from: eth.accounts[0],
    data: "0x" + counterCode,
    gas: 1000000
  },
  function (err, tx) {
    console.log(err, tx);
  }
);

function checkAllBalances() {
  var totalBal = 0;
  for (var acctNum in eth.accounts) {
    var acct = eth.accounts[acctNum];
    var acctBal = web3.fromWei(eth.getBalance(acct), "ether");
    totalBal += parseFloat(acctBal);
    console.log("  eth.accounts[" + acctNum + "]: \t" + acct + " \tbalance: " + acctBal + " ether");
  }
  console.log("  Total balance: " + totalBal + " ether");
};

var contractAddr = 0xd0ddaaa8d06e4eca9e87b55c3573738dbebc16e8