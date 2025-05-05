// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DummyNFTTrader {
    struct NFT {
        string symbol;
        uint256 price;
        address owner;
    }

    mapping(string => NFT) public nfts;
    mapping(address => uint256) public balances;
    mapping(address => bool) public approvedForAutoTrading;

    event NFTBought(address indexed buyer, string nftSymbol, uint256 price);
    event NFTSold(address indexed seller, string nftSymbol, uint256 price);
    event AutoTradingApproved(address indexed user);
    event AutoTradingRevoked(address indexed user);

    constructor() {
        balances[msg.sender] = 2 ether;
    }

    function approveAutoTrading() external {
        approvedForAutoTrading[msg.sender] = true;
        emit AutoTradingApproved(msg.sender);
    }

    function revokeAutoTrading() external {
        approvedForAutoTrading[msg.sender] = false;
        emit AutoTradingRevoked(msg.sender);
    }

    modifier onlyApproved() {
        require(approvedForAutoTrading[msg.sender], "Auto trading not approved");
        _;
    }

    // Simulate buying an NFT
    function simulateBuy(string memory nftSymbol) public onlyApproved {
        uint256 price = 0.02 ether; // Fixed price of 0.02 AVAX

        require(balances[msg.sender] >= price, "Not enough AVAX to buy");

        balances[msg.sender] -= price;
        balances[address(this)] += price;

        nfts[nftSymbol] = NFT(nftSymbol, price, msg.sender);

        emit NFTBought(msg.sender, nftSymbol, price);
    }

    // Simulate selling an NFT
    function simulateSell(string memory nftSymbol) public onlyApproved {
        require(nfts[nftSymbol].owner == msg.sender, "You don't own this NFT");

        uint256 price = nfts[nftSymbol].price;
        balances[msg.sender] += price;
        balances[address(this)] -= price;

        delete nfts[nftSymbol];

        emit NFTSold(msg.sender, nftSymbol, price);
    }

    // Get the balance of the sender
    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    // Check if auto-trading is approved for a user
    function isApproved(address user) public view returns (bool) {
        return approvedForAutoTrading[user];
    }

    // Fixed price retrieval for each NFT (set to 0.02 AVAX)
   // Fixed price retrieval for each NFT (set to 0.02 AVAX)
function getPrice() public pure returns (uint256) {
    return 0.02 ether; // Fixed price of 0.02 AVAX
}

}
