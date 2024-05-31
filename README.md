# SCM-METACRAFTERS
Second Module Assement For MetaCrafters ETH + AVAX PROOF: Intermediate EVM Course

# Description
This is a Solidity smart contract for managing a collection of books and handling deposits and withdrawals of funds. The contract includes functionalities for adding books, retrieving book details, and managing the contract balance.

# Technology Used
This project utilizes the following technologies:

* Solidity: Solidity is a programming language specifically designed for writing smart contracts on the Ethereum platform. It is used to write the Bank smart contract in this project. Learn more about Solidity.

* Ethers.js: Ethers.js is a JavaScript library that provides a concise and consistent API for interacting with Ethereum and Ethereum-like networks. It is used to interact with the Ethereum blockchain and execute transactions in this project. Explore Ethers.js.

* MetaMask: MetaMask is a popular browser extension wallet that allows users to manage Ethereum accounts and interact with decentralized applications. It is used to connect to the Ethereum network and perform transactions in this project. Get MetaMask.

* Hardhat: Hardhat is a development environment and testing framework for Ethereum smart contracts. It provides tools for compiling, deploying, and testing contracts. Hardhat is used to compile and deploy the Bank smart contract in this project. Discover Hardhat.

# Installation
## Follow these steps to get the project up and running 
1. Download or clone the project.
2. Install the dependencies by running npm install.
3. Start the local blockchain using Hardhat by running npx hardhat node.
4. Open new terminal and deploy the Bank contract npx hardhat run --network localhost scripts/deploy.js.
5. Start the development server by running npm run dev.
## Configure MetaMask to use the Hardhat node 
1. Open the MetaMask extension in your browser.
2. Click on the account icon in the top right corner and select "Settings".
3. In the "Networks" tab, click on "Add Network".
4. Fill in the following details:
* Network Name: hardhat-test-network
* RPC URL: http://127.0.0.1:8545/
* Chain ID: 31337
* Currency Symbol: GO or ETH
5. Click on "Save" to add the Hardhat network to MetaMask.

## Add accounts using private keys by Hardhat for testing 
1. In the MetaMask extension, click on the account icon in the top right corner.
2. Select "Import Account" or "Import Account using Private Key" (depending on your version of MetaMask).
3. In the "Private Key" field, enter one of the private keys provided by Hardhat.
4. To access the list of private keys, open the terminal where you started the Hardhat local network.
5. The private keys are displayed as part of the accounts generated by Hardhat.
6. Click on "Import" to import the account into MetaMask.
7. Repeat the above steps to add more accounts for testing purposes.

# Features
* Owner Managed: Only the owner can deposit and withdraw funds.
* Book Management: Add and retrieve details of books.
* Event Emissions: Emits events for deposits and withdrawals.



# Authors
Keana Aliza C. Perez

Student of National Trachers College - BSIT 
   
