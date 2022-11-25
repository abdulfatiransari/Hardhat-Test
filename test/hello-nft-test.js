const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HelloNFT Mint", function () {
   it("Should not throw BAD ADDRESS CHECKSUM error if correct recipient address is provided", async function () {
       const HelloNFT = await ethers.getContractFactory("HelloNFT");
       const helloNFT = await HelloNFT.deploy();
       await helloNFT.deployed();
      
       try {
           await helloNFT.mintToken("0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199", "https://www.google.com");
          
           // If reached here, it means that code did not throw any error so we can simply pass the test
           expect(true).to.equal(true);
       } catch (err) {
           // If any error is thrown by code, in order for this test to pass,
           // we must check that error is not "bad error checksum"
           expect(
               'bad address checksum (argument="address", value="0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199", code=INVALID_ARGUMENT, version=address/5.6.0)'
               ).to.equal(err.message);
           }
       }
   );

   it("Should throw BAD ADDRESS CHECKSUM error if correct recipient address is provided", async function () {
       const HelloNFT = await ethers.getContractFactory("HelloNFT");
       const helloNFT = await HelloNFT.deploy();
       await helloNFT.deployed();
      
       try {
           await helloNFT.mintToken("0x0000a0000a0aa00000aaa0aaa00a0a0a0a0a0000", "https://www.google.com");
          
           // If reached here, it means that code did not throw any error so we can simply pass the test
           expect(true).to.equal(true);
       } catch (err) {
           // If any error is thrown by code, in order for this test to pass,
           // we must check that error is not "bad error checksum"
           expect(
               'bad address checksum (argument="address", value="0x0000a0000a0aa00000aaa0aaa00a0a0a0a0a0000", code=INVALID_ARGUMENT, version=address/5.6.0)'
               ).to.equal(err.message);
           }
       }
   );

   it("Should check if tokenId is correctly increment after minting", async function () {
       const HelloNFT = await ethers.getContractFactory("HelloNFT");
       const helloNFT = await HelloNFT.deploy();
       await helloNFT.deployed();
      
       await helloNFT.mintToken("0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199", "https://www.google.com");
       const ownershipRecord1 = await helloNFT.ownershipRecord("0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199", 0);
       expect(ownershipRecord1[0]).to.equal(0)
      
       await helloNFT.mintToken("0xdD2FD4581271e230360230F9337D5c0430Bf44C0", "https://www.google.com");
       const ownershipRecord2 = await helloNFT.ownershipRecord("0xdD2FD4581271e230360230F9337D5c0430Bf44C0", 0);
       expect(ownershipRecord2[0]).to.equal(1)
   });
   }
);