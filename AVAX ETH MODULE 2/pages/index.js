import { useState, useEffect } from "react";
import { ethers } from "ethers";
import AssessmentABI from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [books, setBooks] = useState([]);
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookAuthor, setNewBookAuthor] = useState("");
  const [newBookPrice, setNewBookPrice] = useState(0);
  const [lastAddedBook, setLastAddedBook] = useState(null);


  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const assessmentABI = AssessmentABI.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      console.log("Account connected:", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, assessmentABI, signer);
    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      try {
        const newBalance = await atm.getBalance();
        setBalance(newBalance.toString());
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
  };

  const deposit = async () => {
    if (!atm || !depositAmount) return;

    try {
      const tx = await atm.deposit(depositAmount);
      await tx.wait();
      getBalance();
    } catch (error) {
      console.error("Error depositing funds:", error);
    } finally {
      setDepositAmount(0);
    }
  };

  const withdraw = async () => {
    if (!atm || !withdrawAmount) return;

    try {
      const tx = await atm.withdraw(withdrawAmount);
      await tx.wait();
      getBalance();
    } catch (error) {
      console.error("Error withdrawing funds:", error);
    } finally {
      setWithdrawAmount(0);
    }
  };

  const handleDepositChange = (event) => {
    const amount = parseFloat(event.target.value);
    if (!isNaN(amount)) {
      setDepositAmount(amount);
    }
  };

  const handleWithdrawChange = (event) => {
    const amount = parseFloat(event.target.value);
    if (!isNaN(amount)) {
      setWithdrawAmount(amount);
    }
  };

  const handleNewBookTitleChange = (event) => {
    setNewBookTitle(event.target.value);
  };

  const handleNewBookAuthorChange = (event) => {
    setNewBookAuthor(event.target.value);
  };

  const handleNewBookPriceChange = (event) => {
    const price = parseFloat(event.target.value);
    if (!isNaN(price)) {
      setNewBookPrice(price);
    }
  };

  const buyBook = async (index) => {
    if (!atm || !account) return;
  
    try {
      const oneEth = ethers.utils.parseEther("1"); // Convert 1 ETH to Wei
      const tx = await atm.buyBook(index, { value: oneEth });
      await tx.wait();
      await getBooks(); // Update the list of books after purchasing
      getBalance();
    } catch (error) {
      console.error("Error buying book:", error);
    }
  };
  

  const addBook = () => {
    if (newBookTitle && newBookAuthor && newBookPrice) {
      const newBook = [newBookTitle, newBookAuthor, parseFloat(newBookPrice)];
      setBooks([...books, newBook]);
      setLastAddedBook(newBook);
      setNewBookTitle("");
      setNewBookAuthor("");
      setNewBookPrice("");
    }
  };
  

  const getBooks = async () => {
    if (!atm) return;

    try {
      const count = await atm.bookCount();
      const bookPromises = [];
      for (let i = 0; i < count; i++) {
        bookPromises.push(atm.books(i));
      }
      const books = await Promise.all(bookPromises);
      setBooks(books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask to use this ATM.</p>;
    }

    if (!account) {
      return (
        <button onClick={connectAccount}>Connect your MetaMask wallet</button>
      );
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance} ETH</p>
        <div>
          <input
            type="number"
            placeholder="Enter Deposit Amount"
            value={depositAmount}
            onChange={handleDepositChange}
          />
          <button onClick={deposit} disabled={depositAmount <= 0}>
            Deposit
          </button>
        </div>
        <div>
          <input
            type="number"
            placeholder="Enter Withdraw Amount"
            value={withdrawAmount}
            onChange={handleWithdrawChange}
          />
          <button onClick={withdraw} disabled={withdrawAmount <= 0}>
            Withdraw
          </button>
        </div>
        <div>
        <h2>Add New Book</h2>
        <input
          type="text"
          placeholder="Enter Title"
          value={newBookTitle}
          onChange={handleNewBookTitleChange}
        />
        <input
          type="text"
          placeholder="Enter Author"
          value={newBookAuthor}
          onChange={handleNewBookAuthorChange}
        />
        <input
          type="number"
          placeholder="Enter Price in ETH"
          value={newBookPrice}
          onChange={handleNewBookPriceChange}
        />
        <button onClick={addBook}>Add Book</button>
      </div>
      <div>
        <h2>Available Books</h2>
        <ul>
          {lastAddedBook && (
            <li>
              <span>Title: {lastAddedBook[0]}</span>
              <span>Author: {lastAddedBook[1]}</span>
              <span>Price: {lastAddedBook[2]} ETH</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

  useEffect(() => {
    getWallet();
  }, []);

  useEffect(() => {
    if (account) {
      getATMContract();
      getBooks();
    }
  }, [account]);

  useEffect(() => {
    getBalance();
  }, [atm]);

  return (
    <main className="container">
      <header><h1>Welcome to the Metacrafters BookStore</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
        }
      `}
      </style>
    </main>
  );
}

