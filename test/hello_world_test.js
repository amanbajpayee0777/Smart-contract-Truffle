const Helloworld = artifacts.require("Helloworld");

contract("Helloworld", accounts => {
    it("should should set message correctly", async () => {
        let instance = await Helloworld.deployed();
        let message = await instance.message();
        assert.equal(message, "Hello world constructor");
    })

    it("owner should be accounts[0]", async () => {
        let instance = await Helloworld.deployed();
        let owner = await instance.owner();
        assert.equal(owner, accounts[0]);
    })
})