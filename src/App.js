import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers'
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
import PepiCoin from './artifacts/contracts/PepiCoin.sol/PepiCoin.json'
import Staking from './artifacts/contracts/Staking.sol/Staking.json'

// Update with the contract address logged out to the CLI when it was deployed 
const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const pepicoinAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
const stakingAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"

function App() {
  // store greeting in local state
  const [greeting, setGreetingValue] = useState()
  const [minting, setMintingValue] = useState()
  const [mintReceiver, setMintingReceiver] = useState()
  const [sending, setSendingValue] = useState()
  const [sendReceiver, setSendingReceiver] = useState()
  const [staking, setStakingValue] = useState()
  const [withdrawing, setWithdrawingValue] = useState()

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  // call the smart contract, read the current greeting value
  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
      try {
        const data = await contract.greet()
        console.log('data: ', data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }

  // call the smart contract, send an update
  async function setGreeting() {
    if (!greeting) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greeting)
      await transaction.wait()
      fetchGreeting()
    }
  }

  async function setMinting() {
    if (!minting) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(pepicoinAddress, PepiCoin.abi, signer)
      const transaction = await contract.mint(mintReceiver, minting)
      await transaction.wait()
    }
  }

  async function setSending() {
    if (!sending) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(pepicoinAddress, PepiCoin.abi, signer)
      const transaction = await contract.send(sendReceiver, sending)
      await transaction.wait()
    }
  }

  async function fetchReward() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(stakingAddress, Staking.abi, provider)
      try {
        const data = await contract.rewardPerToken()
        console.log('data: ', data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }

  async function fetchEarned() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(stakingAddress, Staking.abi, signer)
      try {
        const data = await contract.earned(signer.getAddress())
        console.log('data: ', data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }

  async function getReward() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(stakingAddress, Staking.abi, signer)
      const transaction = await contract.getReward()
      await transaction.wait()
    }
  }

  async function setStaking() {
    if (!staking) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(stakingAddress, Staking.abi, signer)
      const transaction = await contract.stake(staking)
      await transaction.wait()
    }
  }

  async function setWithdrawing() {
    if (!withdrawing) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(stakingAddress, Staking.abi, signer)
      const transaction = await contract.withdraw(withdrawing)
      await transaction.wait()
    }
  }

  return (
    <div className="App">
      <header className='App-header'>
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input onChange={e => setGreetingValue(e.target.value)} placeholder="Set greeting" />
        <br />

        <button onClick={setMinting}>Mint</button>
        <input onChange={e => setMintingReceiver(e.target.value)} placeholder="Set minting receiver" />
        <input onChange={e => setMintingValue(e.target.value)} placeholder="Set amount to mint" />
        <button onClick={setSending}>Send</button>
        <input onChange={e => setSendingReceiver(e.target.value)} placeholder="Set sending receiver" />
        <input onChange={e => setSendingValue(e.target.value)} placeholder="Set amount to send" />
        <br />

        <button onClick={fetchReward}>Fetch reward</button>
        <button onClick={fetchEarned}>Fetch earned</button>
        <button onClick={getReward}>Get reward</button>
        <button onClick={setStaking}>Stake</button>
        <input onChange={e => setStakingValue(e.target.value)} placeholder="Set amount to stake" />
        <button onClick={setWithdrawing}>Withdraw</button>
        <input onChange={e => setWithdrawingValue(e.target.value)} placeholder="Set amount to withdraw" />
      </header>
    </div>
  );
}

export default App;