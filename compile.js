var path = require('path');
var fs = require('fs');
var solc = require('solc');

const lotteryPath = path.resolve(__dirname,'contracts','Lottery.sol');
const source = fs.readFileSync(lotteryPath,'utf8');

module.exports = solc.compile(source,1).contracts[':Lottery'];