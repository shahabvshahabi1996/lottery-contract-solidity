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

    
});