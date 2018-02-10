const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const {interface , bytecode} = require('../compile');
var provider = ganache.provider();

const web3 = new Web3(provider);

let accounts;
let lottery;

beforeEach(async ()=>{
    // get a list of all accounts
    accounts = await web3.eth.getAccounts();
    // use one of those accounts to deploy 
    //the Contract
    lottery = await new web3.eth.Contract(JSON.parse(interface))
     .deploy({ data : bytecode })
     .send({from : accounts[0] , gas : '1000000'})
    lottery.setProvider(provider);    
});

describe('Lottery' , ()=>{
    it("it deploys a contract",()=>{
        assert.ok(lottery.options.address);
    });

    it("has a manager",async()=>{
        let manager = await lottery.methods.manager().call();
        assert.equal(manager,accounts[0]);
    });

    it("allows one account to enter(not the manager)", async()=>{
        let enterTheGame = await lottery.methods.enter().send({
            from : accounts[1],
            value : web3.utils.toWei('0.01','ether')
        });

        let players = await lottery.methods.entryPlayers().call({
            from : accounts[0]
        });

        assert.equal(players[0],accounts[1]);
        assert.equal(1,players.length);
    });

    it("allows multiple accounts to enter(not the manager)", async()=>{
        for(let i = 1; i <= 3 ; i++){
            let enterTheGame = await lottery.methods.enter().send({
                from : accounts[i],
                value : web3.utils.toWei('0.01','ether')
            });
        }
        let players = await lottery.methods.entryPlayers().call({
            from : accounts[0]
        });
        for(let i=1;i<=3;i++){
            assert.equal(players[i-1],accounts[i]);    
        }
        assert.equal(3,players.length);
    });
    
});