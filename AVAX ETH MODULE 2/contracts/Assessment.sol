// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;
    uint public bookCount;

    struct Book {
        string title;
        string author;
    }

    mapping(uint => Book) public books;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
        bookCount = 0;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function addBook(string memory title, string memory author) public {
        books[bookCount] = Book(title, author);
        bookCount++;
    }

    function getBook(uint bookId) public view returns (string memory, string memory) {
        require(bookId < bookCount, "Book ID out of range");
        return (books[bookId].title, books[bookId].author);
    }

    function deposit(uint256 _amount) public payable onlyOwner {
        uint256 _previousBalance = balance;
        balance += _amount;
        assert(balance == _previousBalance + _amount);
        emit Deposit(_amount);
    }

    function withdraw(uint256 _withdrawAmount) public onlyOwner {
        uint256 _previousBalance = balance;
        require(balance >= _withdrawAmount, "Insufficient balance");
        balance -= _withdrawAmount;
        assert(balance == (_previousBalance - _withdrawAmount));
        emit Withdraw(_withdrawAmount);
    }
}
