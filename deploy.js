const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface , bytecode } = require('./compile.js');

var provider = new HDWalletProvider(
    'energy damp enlist panic transfer ensure vague guard laugh crowd man stomach',
    'https://rinkeby.infura.io/YfN9MatBIrqHOPqfZz5l'
);

const web3 = new Web3(provider);

const deploy = async () => {
    let accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0] );

    const result = await new web3.eth.Contract(JSON.parse(interface))
     .deploy({ data : bytecode })
     .send({ from : accounts[0] , gas : '1000000'});

     console.log('Contract Deployed to ',result.options.address);
     result.setProvider(provider);
}
deploy();