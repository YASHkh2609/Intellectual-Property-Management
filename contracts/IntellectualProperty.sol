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
    
    // modifier onlyOwner() {
    //     require(msg.sender == owner, "Only contract owner can perform this action");
    //     _;
    // }
    
    constructor() {
        owner = msg.sender;
    }
    
    function registerIP(string calldata _name, string calldata _description) external {
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


