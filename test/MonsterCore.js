const MonsterCore = artifacts.require('MonsterCore')

contract('MonsterCore', accounts => { 

    // let starName = "zhaojing star!";
    // let starStory = "I love my zhaojing star!";
    // let starRa = "16h 29m 1.0s";
    // let starDec = "68° 52' 56.9";
    // let starMag = "4.83";
    // let starId = 1;

    beforeEach(async function() { 
        this.contract = await MonsterCore.new({from: accounts[0]})
    })
    
    describe('set params', () => { 
        it('set params', async function () { 

            // await this.contract.createStar(
            //     starName,
            //     starStory,
            //     starRa,
            //     starDec,
            //     starMag,
            //     starId,
            //     {from: accounts[0]}
            // )
            await this.contract.setCFO({from: accounts[0]})
            // assert.deepEqual(await this.contract.tokenIdToStarInfo(starId), [starName, starStory, starRa, starDec, starMag]);

        })
    })

    // describe('check if star exists', () => {
    //     it('star already exists', async function () {
    //         await this.contract.createStar(starName, starStory, starRa, starDec, starMag, starId, {from: accounts[0]})

    //         assert.equal(await this.contract.checkIfStarExist(starRa, starDec, starMag), true)
    //     })
    // })

    // describe('buying and selling stars', () => { 
        
    //     let user1 = accounts[1]
    //     let user2 = accounts[2]        
        
    //     let starPrice = web3.toWei(.01, "ether")

    //     beforeEach(async function () { 
    //         await this.contract.createStar(starName, starStory, starRa, starDec, starMag, starId, {from: user1})    
    //     })

    //     it('user1 can put up their star for sale', async function () { 
    //         assert.equal(await this.contract.ownerOf(starId), user1)
    //         await this.contract.putStarUpForSale(starId, starPrice, {from: user1})
            
    //         assert.equal(await this.contract.starsForSale(starId), starPrice)
    //     })

    //     describe('user2 can buy a star that was put up for sale', () => { 
    //         beforeEach(async function () { 
    //             await this.contract.putStarUpForSale(starId, starPrice, {from: user1})
    //         })

    //         it('user2 is the owner of the star after they buy it', async function() { 
    //             await this.contract.buyStar(starId, {from: user2, value: starPrice, gasPrice: 0})
    //             assert.equal(await this.contract.ownerOf(starId), user2)
    //         })

    //         it('user2 ether balance changed correctly', async function () { 
    //             let overpaidAmount = web3.toWei(.05, 'ether')
    //             const balanceBeforeTransaction = web3.eth.getBalance(user2)
    //             await this.contract.buyStar(starId, {from: user2, value: overpaidAmount, gasPrice: 0})
    //             const balanceAfterTransaction = web3.eth.getBalance(user2)

    //             assert.equal(balanceBeforeTransaction.sub(balanceAfterTransaction), starPrice)
    //         })
    //     })
    // })

    // ownerOf test
    // describe('test star owner', () => {
    //     it('star has the rightful owner', async function () {
    //         await this.contract.createStar(starName, starStory, starRa, starDec, starMag, starId, {from: accounts[0]})
    //         const owner = await this.contract.ownerOf(starId, {from: accounts[0]})
            
    //         assert.equal(owner, accounts[0])
    //     })
    // })

    // describe('can detect duplicate entries', () => { 

    //     it('token ID cannot be duplicated', async function () { 

    //         await this.contract.createStar(
    //             "myStar",
    //             "myStory",
    //             "1",
    //             "2",
    //             "3",
    //             2,
    //             {from: accounts[0]}
    //         );

    //         expectThrow(this.contract.createStar(
    //             "anotherStar",
    //             "anotherStory",
    //             "4",
    //             "5",
    //             "6",
    //             2,
    //             {from: accounts[0]}
    //         )); 

    //     })

    // });
})

var expectThrow = async function(promise) { 
    try { 
        await promise
    } catch (error) { 
        assert.exists(error)
        return 
    }

    assert.fail('expected an error, but none was found')
}