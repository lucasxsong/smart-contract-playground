require('dotenv').config();
const { API_URL, PUBLIC_KEY, PRIVATE_KEY } = process.env;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");

//console.log(JSON.stringify(contract.abi));

const contractAddr = "0x605Bc543DEeebA7DEafca21E1f9fDbC74b5Ed57B";
const helloWorldContract = new web3.eth.Contract(contract.abi, contractAddr);

//helper function update message on contract
async function updateMessage(newMessage){
  //get nonce
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');
  // estimate cost (gas) of calling updateMessage method
  const gasEstimate = await helloWorldContract.methods.update(newMessage).estimateGas();

  const tx = {
    'from': PUBLIC_KEY,
    'to': contractAddr,
    'nonce': nonce,
    'gas': gasEstimate,
    'maxFeePerGas': 1000000108,
    'data': helloWorldContract.methods.update(newMessage).encodeABI()
  };

  // sign transacation (tx) with private key
  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
 
  signPromise.then((signedTx) => {
    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
      if (err) {
        console.log("uh oh! someting went wrong when submitting your transaction: ", err);
      }
      else {
        console.log("the hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction :)");
      }
    });
  }).catch((err) => {
      console.log("Promise failed: ", err);
    });

}

async function main() {
  const message = await helloWorldContract.methods.message().call();
  console.log("Contract messages is: ", message);

  //await updateMessage("Hello u DINGUS!");

}

main();
