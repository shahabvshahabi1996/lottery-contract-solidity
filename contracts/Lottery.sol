pragma solidity ^0.4.17;


contract Lottery {
    
    address public manager;
    address public theMainAccount; // the owner of site   
    address[] public players;
    
    modifier isNotManager() {
        require(msg.sender != manager);
        _;
    }
    
    modifier isManager() {
        require(msg.sender == manager);
        _;
    }
    
    modifier isNotInList() {
        for (uint i=0; i < players.length; i++) {
            require(msg.sender != players[0]);
        }

        _;
    }
    
    modifier validValue() {
        require(msg.value == .01 ether);
        _;
    }
    
    function Lottery() public {
        manager = msg.sender;
    }
    
    function enter() public isNotManager isNotInList validValue payable {
        players.push(msg.sender);
    }
    
    function pickWinner() public isManager payable  returns(address) {
        uint index = random();
        uint share = (this.balance * 1) / 1000;
        uint mainShare = (this.balance - share) * 1 / 10;
        theMainAccount.transfer(mainShare);
        manager.transfer(share);// manager will get 0.001% of the whole prize pool
        players[index].transfer(this.balance - mainShare); // and the winner get the whole rest of the money
        players = new address[](0);
        return players[index];
    }

    function random() private view returns(uint) {
        return uint(keccak256(block.difficulty, now, players)) % players.length;
    }
    
}