// Initialize web3 object
if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  //console.log("yes");
} else {
  console.error("MetaMask is not installed");
  alert("Please install MetaMask to interact with this dApp");
}

// Specify the network name and network ID
const networkName = 'sepolia'; // Update with your network name
const networkId = 11155111; // Update with your network ID

// Check the current network ID
web3.eth.net.getId().then((currentNetworkId) => {
    //console.log('Current Network ID:', currentNetworkId); // Log the current network ID
        // Convert the current network ID to an integer
    currentNetworkId = parseInt(currentNetworkId);
    // Compare current network ID with the expected network ID
    if (currentNetworkId !== networkId) {
        console.log('Please switch to the correct network');
    } else {
        console.log('Network ID:', currentNetworkId);
    }
}).catch((error) => {
    console.error('Error getting network ID:', error);
    console.log('Failed to get network ID. Please try again.');
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
];

// Address of your deployed smart contract
const contractAddress = '0xd884dC9555276FB668F78d8E7633733a2656af28'; // Add your contract address here

// Instantiate contract object
const contract = new web3.eth.Contract(abi, contractAddress);
//console.log('The contract: ', contract)
// Function to handle IP registration
// contract.events.IPRegistered()
//     .on('data', function(event){
//         console.log('IP Registered:', event.returnValues);
//         // Update UI or perform other actions based on event data
//         alert('New IP Registered: ' + event.returnValues.name);
//     })
//     .on('error', console.error); 

// Function to handle IP registration
function register_IP() {
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  document.getElementById('name').value="";
  document.getElementById('description').value="";
  // Call smart contract method to register IP
  web3.eth.requestAccounts().then(accounts => {
      let ind=prompt("Enter Account Number");//will prompt user to enter which account they want to use
      console.log("accounts:",accounts[ind]);//log the account address choosen by user
      const owner = accounts[ind]; // Use the account provided by User
      contract.methods.registerIP(name, description).send({ from: owner, gas: 6721975 })
          .then(() => {
              alert('IP Registered successfully!');
          })
          .catch(error => {
              console.error('Error registering IP:', error);
              alert('Failed to register IP. Please try again.');
          });
  }).catch(error => {
      console.error('Error getting accounts:', error);
      alert('Failed to register IP. Please try again.');
  });

}

// Function to handle ownership transfer
function transfer_Ownership() {
  const ipId = document.getElementById('ipId').value;
  const newOwner = document.getElementById('newOwner').value;
  document.getElementById('ipId').value="";
  document.getElementById('newOwner').value="";
  // Call smart contract method to transfer ownership
  web3.eth.requestAccounts().then(accounts => {

      let ind=prompt("Enter Account Number");//will prompt user to enter which account they want to use
      console.log("accounts:",accounts[ind]);//log the account address choosen by user
      const owner = accounts[ind];// Use the account provided by User
      contract.methods.transferOwnership(ipId, newOwner).send({ from: owner})
          .then(() => {
              alert('Ownership transferred successfully!');
          })
          .catch(error => {
              console.error('Error transferring ownership:', error);
              alert('Failed to transfer ownership. Please try again.');
          });
  }).catch(error => {
      console.error('Error getting accounts:', error);
      alert('Failed to transfer ownership. Please try again.');
  });
}

// Function to handle IP record lookup
function get_IPRecord() {
  const lookupIpId = document.getElementById('lookupIpId').value;
  document.getElementById('lookupIpId').value="";

  // Call smart contract method to get IP record
  contract.methods.getOwner(lookupIpId).call()
      .then(record => {
          console.log('IP Record:', record);
          alert('IP Record: ' + JSON.stringify(record));
      })
      .catch(error => {
          console.error('Error getting IP record:', error);
          alert('Failed to get IP record. Please try again.');
      });
}



// function register_IP() {
//     const Owner = document.getElementById('Owner').value;
//     const name = document.getElementById('name').value;
//     const description = document.getElementById('description').value;
    
//     // Call smart contract method to register IP
//     web3.eth.getAccounts().then(accounts => {
//         //console.log('Available accounts:', accounts); // Log the accounts array
//         contract.methods.registerIP(name, description).send({ from: Owner, gas: 6721975 })
//             .then(() => {
//                 alert('IP Registered successfully!');
//             })
//             .catch(error => {
//                 console.error('Error registering IP:', error);
//                 alert('Failed to register IP. Please try again.');
//             });
//     }).catch(error => {
//         console.error('Error getting accounts:', error);
//         alert('Failed to register IP. Please try again.');
//     });
// }

// // Function to handle ownership transfer
// function transfer_Ownership() {
//     const owner = document.getElementById('owner').value;
//     const ipId = document.getElementById('ipId').value;
//     const newOwner = document.getElementById('newOwner').value;
//     // Call smart contract method to transfer ownership
//     web3.eth.getAccounts().then(accounts => {
//         contract.methods.transferOwnership(ipId, newOwner).send({ from: owner})
//             .then(() => {
//                 alert('Ownership transferred successfully!');
//             })
//             .catch(error => {
//                 console.error('Error transferring ownership:', error);
//                 alert('Failed to transfer ownership. Please try again.');
//             });
//     }).catch(error => {
//         console.error('Error getting accounts:', error);
//         alert('Failed to transfer ownership. Please try again.');
//     });
// }

// // Function to handle IP record lookup
// function get_IPRecord() {
//     const lookupIpId = document.getElementById('lookupIpId').value;
    
//     // Call smart contract method to get IP record
//     contract.methods.getOwner(lookupIpId).call()
//         .then(record => {
//             console.log('IP Record:', record);
//             alert('IP Record: ' + JSON.stringify(record));
//         })
//         .catch(error => {
//             console.error('Error getting IP record:', error);
//             alert('Failed to get IP record. Please try again.');
//         });
// }
