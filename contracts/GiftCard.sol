// SPDX-License-Identifier: UNLICESNED

pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GiftCard is ERC20, Ownable {
  error OnlyOwner();
  error InvalidValue();
  error InsufficientBalance();
  error NoCards();

  enum Store {
    Apple,
    GreenCard,
    Google,
    Otto,
    Roblox,
    Spotify
  }

  struct Card {
    string imageHash;
    uint256 price;
    Store store;
  }

  struct PurchasedCard {
    uint256 id;
    uint256 timestamp;
  }

  Card[] public cards;
  mapping(address => PurchasedCard[]) private purchasedCards;

  constructor() ERC20("GiftCard Token", "GFT") {
    _mint(address(this), 69157777033);
  }

  function exchange(uint256 _token) external payable {
    if ((msg.value / 1e15) != _token) {
      revert InvalidValue();
    }
    _transfer(address(this), msg.sender, _token);
  }

  function addCard(
    string calldata _imageHash,
    uint256 _price,
    Store _store
  ) external onlyOwner {
    cards.push(Card({ imageHash: _imageHash, price: _price, store: _store }));
  }

  function buyCard(uint256 _id) external {
    if (cards.length <= 0) {
      revert NoCards();
    }

    if (balanceOf(msg.sender) < cards[_id].price) {
      revert InsufficientBalance();
    }

    purchasedCards[msg.sender].push(
      PurchasedCard({ id: _id, timestamp: block.timestamp })
    );
  }

  function withdraw() external payable onlyOwner {
    address payable to = payable(owner());
    to.transfer(address(this).balance);
  }

  function cardSize() external view returns (uint256) {
    return cards.length;
  }

  function getUserCards() external view returns (PurchasedCard[] memory) {
    return purchasedCards[msg.sender];
  }

  function decimals() public view virtual override returns (uint8) {
    return 0;
  }
}
