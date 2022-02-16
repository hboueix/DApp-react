# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

## How to use

Node.js needs to be installed on your local machine. 

```shell
# Install dependencies
npm install

# Create new or edit contracts, then
npx hardhat compile

# Start a development ETH node
npx hardhat node

# Deploy contract on network, e.g.
npx hardhat run scripts/deploy.js --network localhost

# Start react server, default to http://localhost:3000
npm start
```
