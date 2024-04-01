// SPDX-License-Identifier: MIT

const IntellectualProperty = artifacts.require("IntellectualProperty");

contract("IntellectualProperty", accounts => {
    let ipInstance;

    before(async () => {
        ipInstance = await IntellectualProperty.deployed();
    });

    it("should register a new intellectual property", async () => {
        const name = "MyIP";
        const description = "This is a test IP";
        await ipInstance.registerIP(name, description, { from: accounts[0] });

        const ipRecord = await ipInstance.ipRecords(1);
        assert.equal(ipRecord.owner, accounts[0], "Owner of the IP should be the caller");
        assert.equal(ipRecord.name, name, "Name should match");
        assert.equal(ipRecord.description, description, "Description should match");
    });

    it("should transfer ownership of intellectual property", async () => {
        const newName = "MyNewIP";
        const newOwner = accounts[1];
        await ipInstance.transferOwnership(1, newOwner, { from: accounts[0] });

        const ipRecord = await ipInstance.ipRecords(1);
        assert.equal(ipRecord.owner, newOwner, "Ownership should be transferred to the new owner");
    });

    it("should get owner of intellectual property", async () => {
        const owner = await ipInstance.getOwner(1);
        assert.equal(owner, accounts[1], "Owner should match the expected owner");
    });
});
