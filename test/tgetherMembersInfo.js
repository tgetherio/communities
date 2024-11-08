const { expect } = require("chai");



describe("tgether Members Info Contract", function() {
  let tgr
  let tgs
  let owner;
  let addr1;
  let addr2;
  let addr3;
  let addr4;
  let addr5;
  let addrs;

  beforeEach(async function() {
    [owner, addr1, addr2,addr3,addr4,addr5, ...addrs] = await ethers.getSigners();
    const mockFeePrice = ethers.utils.parseEther("1"); // Example fee 
    
    const tgetherMem = await ethers.getContractFactory("tgetherMembersInfo");
    tgm = await tgetherMem.deploy();
    await tgm.deployed();



  });


   describe('Add Member Info', async () => {

    it("Should add member info", async function() {
      await tgm.connect(addr1).updateMemberInfo("Joe", "Joe is testing if the description works", ["SUNY Geneseo Math", "Some Other Degree"], ['Im so certified', "the most"],"www.w.com");
      const[ myName, myDescription, myDegrees, myCerts, endpoint] = await tgm.connect(owner).getMemberInfo(addr1.address)
      expect(myName).to.equal("Joe");
      expect(myDescription).to.equal("Joe is testing if the description works");
      expect(myDegrees).to.deep.equal(["SUNY Geneseo Math", "Some Other Degree"]);
      expect(myCerts).to.deep.equal(["Im so certified", "the most"]);
      expect(endpoint).to.deep.equal("www.w.com");

    });
  
   });

  
});