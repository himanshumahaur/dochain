const express = require('express');
// const Web3 = require('web3');
const contractAddress = '0x074535eb6f99bb36639D943000B4A73F8F9467f0';

const app = express();
const port = 3005;

// const web3 = new Web3('http://localhost:8545'); // Connect to Ganache

let { Web3 } = require("web3");

let provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:8545");

let web3 = new Web3(provider);

const contract = new web3.eth.Contract([
    {
      "inputs": [],
      "name": "message",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "newMessage",
          "type": "string"
        }
      ],
      "name": "setMessage",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ], contractAddress);

app.use(express.json());

app.use(express.static('public'));

app.get('/getMessage', async (req, res) => {
  const message = await contract.methods.message().call();
  res.json({ message });
});

app.post('/setMessage', async (req, res) => {
  const newMessage = req.body.newMessage;
  const accounts = await web3.eth.getAccounts();
  const gas = await contract.methods.setMessage(newMessage).estimateGas();

  const tx = {
    from: accounts[0],
    to: contractAddress,
    gas,
    data: contract.methods.setMessage(newMessage).encodeABI(),
  };

  web3.eth.sendTransaction(tx, (err, transactionHash) => {
    if (err) {
      res.status(500).json({ error: 'Transaction failed' });
    } else {
      res.json({ transactionHash });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});