pragma solidity ^0.8.0;

contract Assessment {
  struct Book {
    string title;
    string author;
  }

  mapping(uint => Book) public books;
  uint public bookCount;

  constructor() {
    bookCount = 0;
  }

  function addBook(string memory title, string memory author) public {
    books[bookCount] = Book(title, author);
    bookCount++;
  }

  function getBook(uint bookId) public view returns (string memory, string memory) {
    require(bookId < bookCount, "Book ID out of range");
    return (books[bookId].title, books[bookId].author);
  }
}
