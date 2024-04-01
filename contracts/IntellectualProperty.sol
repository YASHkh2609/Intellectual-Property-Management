// pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/Strings.sol";


// contract IntellectualProperty is Ownable {
//     using Strings for uint256;

//     struct IPRecord {
//         string name;
//         string description;
//         address owner;
//     }

//     mapping(uint256 => IPRecord) private ipRecords;
//     uint256 private ipRecordCount;

//     event IPRegistered(uint256 indexed id, address indexed owner, string name, string description);
//     event IPOwnershipTransferred(uint256 indexed id, address indexed previousOwner, address indexed newOwner);

//     constructor() Ownable(msg.sender) {} // Passing msg.sender to Ownable constructor

//     function registerIP(string memory _name, string memory _description) external {
//         require(bytes(_name).length > 0, "Name must not be empty");
//         require(bytes(_description).length > 0, "Description must not be empty");

//         ipRecordCount++;
//         ipRecords[ipRecordCount] = IPRecord(_name, _description, msg.sender);
//         emit IPRegistered(ipRecordCount, msg.sender, _name, _description);
//     }

//     function transferOwnership(uint256 _id, address _newOwner) external onlyOwnerOf(_id) {
//         require(_newOwner != address(0), "Invalid new owner address");

//         ipRecords[_id].owner = _newOwner;
//         emit IPOwnershipTransferred(_id, msg.sender, _newOwner);
//     }

//     function getOwner(uint256 _id) external view returns (address) {
//         return ipRecords[_id].owner;
//     }

//     function getIPRecord(uint256 _id) external view returns (string memory name, string memory description, address owner) {
//         IPRecord storage record = ipRecords[_id];
//         return (record.name, record.description, record.owner);
//     }

//     modifier onlyOwnerOf(uint256 _id) {
//         require(msg.sender == ipRecords[_id].owner, "Only IP owner can perform this action");
//         _;
//     }
// }
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IntellectualProperty {
    address public owner;
    
    struct IPRecord {
        address owner;
        string name;
        string description;
    }
    
    mapping(uint256 => IPRecord) public ipRecords;
    uint256 public ipRecordCount;
    
    event IPRegistered(uint256 indexed id, address indexed owner, string name, string description);
    event IPOwnershipTransferred(uint256 indexed id, address indexed previousOwner, address indexed newOwner);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can perform this action");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    function registerIP(string memory _name, string memory _description) external {
        ipRecordCount++;
        ipRecords[ipRecordCount] = IPRecord(msg.sender, _name, _description);
        emit IPRegistered(ipRecordCount, msg.sender, _name, _description);
    }
    
    function transferOwnership(uint256 _id, address _newOwner) external {
        require(msg.sender == ipRecords[_id].owner, "Only IP owner can transfer ownership");
        ipRecords[_id].owner = _newOwner;
        emit IPOwnershipTransferred(_id, msg.sender, _newOwner);
    }
    
    function getOwner(uint256 _id) external view returns (address) {
        return ipRecords[_id].owner;
    }
}
