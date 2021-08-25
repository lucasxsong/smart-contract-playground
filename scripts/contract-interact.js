require('dotenv').config();
const API_URL = process.env.API_URL;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");

//console.log(JSON.stringify(contract.abi));

const contractAddr = "0x605Bc543DEeebA7DEafca21E1f9fDbC74b5Ed57B";
const helloWorldContract = new web3.eth.Contract(contract.abi, contractAddr);

async function main() {
  const message = await helloWorldContract.methods.message().call();
  console.log("Contract messages is: ", message);
}

main();
