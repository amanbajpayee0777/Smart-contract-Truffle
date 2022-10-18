# Prerequisites

This tutorial assumes you have a smart contract which you've written that you'd like to deploy.
First things first. We'll be using Truffle to deploy your contract, so make sure you have truffle installed. If you don't, run the following line of code in your terminal:

`npm install -g truffle`

# Project setup

First, open the terminal and make a new project folder.


## The Contracts folder

For this tutorial, we will deploy the **Migrations.sol** contract that is initialized with Truffle.

Here's what it looks like:

```// SPDX-License-Identifier: MIT
pragma  solidity >=0.4.22 <0.9.0;

contract  Migrations {

  address  public owner =  msg.sender;

  uint  public last_completed_migration;
    modifier  restricted() {
      require(msg.sender == owner,"This function is restricted to the contract's owner");
      _;
    }

  function  setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }
}
```

**Note**: If you want to deploy a smart contract you've written, delete the **Migrations.sol** file in the **contracts/** folder and make a new file containing your smart contract.

## The migrations folder

Files in the **migrations/** folder are used as deployment scripts. For each Solidity file you want to deploy, you'll need a corresponding deployment script.

For the default Migrations.sol contract, the migration file looks like this:

```
const  Migrations  = artifacts.require("Migrations");

module.exports  =  function  (deployer)  {
  deployer.deploy(Migrations);
};
```

**Note:** If you want to deploy your custom Solidity contract, replace the Migrations variable and contents with your contract's file name:

```
const YOUR_CONTRACT_NAME = artifacts.require("YOUR_CONTRACT_NAME");

module.exports  =  function  (deployer)  {
	deployer.deploy(YOUR_CONTRACT_NAME);
};
```



# Truffle config

The **truffle-config.js** file is used in order to tell truffle how you want to deploy your contract.

For our purposes, write the following in your truffle-config file:

```
const ContractKit = require('@celo/contractkit');
const Web3 = require('web3');

require('dotenv').config({path: '.env'});

// Create connection to DataHub Celo Network node
const web3 = new Web3(process.env.REST_URL);
const client = ContractKit.newKitFromWeb3(web3);

// Initialize account from our private key
const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);

// We need to add private key to ContractKit in order to sign transactions
client.addAccount(account.privateKey);

module.exports = {
  compilers: {
    solc: {
      version: "0.6.6",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
  networks: {
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    alfajores: {
      provider: client.connection.web3.currentProvider, // CeloProvider
      network_id: 44787  // latest Alfajores network id
    }
  }
};
```
