import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";


function App() {
  const [books, setBooks] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Added state for success message

  // Connect to MetaMask on component mount
  useEffect(() => {
    const connectToMetaMask = async () => {
      try {
        const provider = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Instance = new Web3(provider[0]);
        setWeb3(web3Instance);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    };

    if (window.ethereum) {
      connectToMetaMask();
    } else {
      console.error('Please install MetaMask!');
    }
  }, []);

  // Function to fetch all books from the contract
  const handleGetBooks = async () => {
    if (web3) {
      const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; 
      const contract = new web3.eth.Contract(BookContract.abi, contractAddress);
      const bookCount = await contract.methods.bookCount().call();
      const bookData = [];
      for (let i = 0; i < bookCount; i++) {
        const [title, author] = await contract.methods.getBook(i).call();
        bookData.push({ title, author });
      }
      setBooks(bookData);
    } else {
      console.error('MetaMask not connected!');
    }
  };

  // Function to handle adding a new book
  const handleAddBook = async () => {
    if (web3 && newTitle.trim() !== '' && newAuthor.trim() !== '') {
      const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; 
      const contract = new web3.eth.Contract(BookContract.abi, contractAddress);
      const tx = await contract.methods.addBook(newTitle, newAuthor).send({ from: window.ethereum.selectedAddress });
      console.log('Transaction hash:', tx.transactionHash);
      setNewTitle(''); // Clear input fields after submission
      setNewAuthor('');
      setSuccessMessage('Success! Book added.'); // Set success message
      handleGetBooks(); // Update book list after adding
    } else {
      console.error('Please enter title and author!');
    }
  };

  return (
    <div className="App">
      <h1><u>Book Library</u></h1>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <b>{book.title}</b> by {book.author}
          </li>
        ))}
      </ul>
      {successMessage && <p className="success-message">{successMessage}</p>} {/* Conditionally render success message */}
      <div>
        <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Book Title" />
        <input type="text" value={newAuthor} onChange={e => setNewAuthor(e.target.value)} placeholder="Author Name" />
        <button onClick={handleAddBook}>Add Book</button>
      </div>
    </div>
  );
}

export default App;
