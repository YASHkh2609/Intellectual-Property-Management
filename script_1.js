// Import web3.js library
const { Web3 } = require('web3');
//import { Web3 } from 'web3';


// Initialize web3 object
const web3 = new Web3('http://127.0.0.1:7545'); // Use Infura or your local Ethereum node
// Specify the network name and network ID
const networkName = 'development'; // Update with your network name
const networkId = 5777; // Update with your network ID

// Check the current network ID
web3.eth.net.getId().then((currentNetworkId) => {
    // Compare current network ID with the expected network ID
    if (currentNetworkId !== networkId) {
        alert('Please switch to the correct network');
    }
}).catch((error) => {
    console.error('Error getting network ID:', error);
    alert('Failed to get network ID. Please try again.');
});

// ABI (Application Binary Interface) of your smart contract
const abi = [
    // Add ABI of your smart contract here
{
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
        },
        {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
        },
        {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
        }
    ],
    "name": "IPOwnershipTransferred",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
        },
        {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
        },
        {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
        },
        {
        "indexed": false,
        "internalType": "string",
        "name": "description",
        "type": "string"
        }
    ],
    "name": "IPRegistered",
    "type": "event"
    },
    {
    "inputs": [],
    "name": "ipRecordCount",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "name": "ipRecords",
    "outputs": [
        {
        "internalType": "address",
        "name": "owner",
        "type": "address"
        },
        {
        "internalType": "string",
        "name": "name",
        "type": "string"
        },
        {
        "internalType": "string",
        "name": "description",
        "type": "string"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    },
    {
    "inputs": [],
    "name": "owner",
    "outputs": [
        {
        "internalType": "address",
        "name": "",
        "type": "address"
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
        "name": "_name",
        "type": "string"
        },
        {
        "internalType": "string",
        "name": "_description",
        "type": "string"
        }
    ],
    "name": "registerIP",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
        },
        {
        "internalType": "address",
        "name": "_newOwner",
        "type": "address"
        }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
        }
    ],
    "name": "getOwner",
    "outputs": [
        {
        "internalType": "address",
        "name": "",
        "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
    }
]

// Address of your deployed smart contract
const contractAddress = '0x55dCB42D492ebC7e76767eEF1E706b1f460c16E1'; // Add your contract address here

// Instantiate contract object
const contract = new web3.eth.Contract(abi, contractAddress);

// Function to handle IP registration
// async function registerIP() {
//     const name = document.getElementById('name').value;
//     const description = document.getElementById('description').value;
    
//     try {
//         // Call smart contract method to register IP
//         const accounts = await web3.eth.getAccounts();
//         await contract.methods.registerIP(name, description).send({ from: accounts[0] });
//         alert('IP Registered successfully!');
//     } catch (error) {
//         console.error('Error registering IP:', error);
//         alert('Failed to register IP. Please try again.');
//     }
// }
async function register_IP() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    
    try {
        // Call smart contract method to register IP
        const accounts = await web3.eth.getAccounts();
        console.log('Available accounts:', accounts); // Log the accounts array
        await contract.methods.registerIP(name, description).send({ from: accounts[0] });
        alert('IP Registered successfully!');
    } catch (error) {
        console.error('Error registering IP:', error);
        alert('Failed to register IP. Please try again.');
    }
}
// Function to handle ownership transfer
async function transfer_Ownership() {
    const ipId = document.getElementById('ipId').value;
    const newOwner = document.getElementById('newOwner').value;
    
    try {
        // Call smart contract method to transfer ownership
        const accounts = await web3.eth.getAccounts();
        await contract.methods.transferOwnership(ipId, newOwner).send({ from: accounts[0] });
        alert('Ownership transferred successfully!');
    } catch (error) {
        console.error('Error transferring ownership:', error);
        alert('Failed to transfer ownership. Please try again.');
    }
}

// Function to handle IP record lookup
async function get_IPRecord() {
    const lookupIpId = document.getElementById('lookupIpId').value;
    
    try {
        // Call smart contract method to get IP record
        const record = await contract.methods.getIPRecord(lookupIpId).call();
        console.log('IP Record:', record);
        alert('IP Record: ' + JSON.stringify(record));
    } catch (error) {
        console.error('Error getting IP record:', error);
        alert('Failed to get IP record. Please try again.');
    }
}
