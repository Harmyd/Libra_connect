import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import axios from "axios";

import Book from "../Book/Book";
import Message from "../../SmallComponents/Message/Message";
import Loading from "../../SmallComponents/Loading/Loading";

import "./Home.css";

const Home = () => {
  const [auth, setAuth] = useState("");
  const [token, setToken] = useState("");
  const [books, setBooks] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Get token on mount
  useEffect(() => {
    const signUpToken = sessionStorage.getItem("signUpToken");
    const authSourceSignUp = sessionStorage.getItem("authSourceSignUp");

    const loginToken = sessionStorage.getItem("loginToken");
    const authSource = sessionStorage.getItem("authSource");

    if (signUpToken) {
      setAuth(authSourceSignUp);
      setToken(signUpToken);
    } else if (loginToken) {
      setAuth(authSource);
      setToken(loginToken);
    }
  }, []);

  // Fetch books based on search query
  useEffect(() => {
    if (!token) return;

    const fetchBooks = async () => {
      setLoading(true);
      try {
        let url;
        
        if (searchQuery.trim()) {
          // User has entered a search query - use search API
          const params = new URLSearchParams({ title: searchQuery.trim() });
          url = `https://library-management-system-9v95.onrender.com/books/search_book?${params.toString()}`;
        } else {
          // No search query - use get_book API for random books
          url = "https://library-management-system-9v95.onrender.com/books/get_book";
        }

        const res = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API response:", res.data);

        // Handle both "book" and "Books"
        const responseBooks = res.data.book || res.data.Books || {};
        setBooks(responseBooks);
      } catch (err) {
        console.error("Error fetching books:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search requests, but not the initial load
    if (searchQuery.trim()) {
      const timeoutId = setTimeout(fetchBooks, 500);
      return () => clearTimeout(timeoutId);
    } else {
      // Immediate fetch for get_book (no search query)
      fetchBooks();
    }
  }, [token, searchQuery]);

  // Shuffle books within each category
  const shuffleArray = (arr) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Prepare book components - handle both API structures
  const showBooks = Object.entries(books).map(([category, categoryBooks]) => {
    // Ensure categoryBooks is an array
    if (!Array.isArray(categoryBooks)) {
      return null;
    }
    
    return shuffleArray(categoryBooks).map((book) => {
      // Check if this is from get_book API (capitalized properties) or search_book API (lowercase)
      const isGetBookAPI = book.Title !== undefined;
      
      let bookData;
      if (isGetBookAPI) {
        // get_book API structure (your backend with capitalized properties)
        const authors = Array.isArray(book.Authors) ? book.Authors : 
                       (book.Authors ? [book.Authors] : []);

        bookData = {
          key: book.Google_book_id || `book-${Math.random()}`,
          title: book.Title,
          department: book.Category,
          availability: book.Availability === "Available",
          authors: authors,
          bookId: book.Google_book_id,
          borrowed: book.Borrowed
        };
      } else {
        // search_book API structure (original lowercase structure)
        const authors = Array.isArray(book.authors) ? book.authors : 
                       Array.isArray(book.author) ? book.author : 
                       (book.authors || book.author) ? [book.authors || book.author] : [];

        bookData = {
          key: book.google_id || book.id || `book-${Math.random()}`,
          title: book.title,
          department: book.category || book.department,
          availability: book.availability !== undefined ? book.availability : true,
          authors: authors,
          bookId: book.google_id || book.id,
          borrowed: book.borrowed !== undefined ? book.borrowed : false
        };
      }

      return (
        <Book
          key={bookData.key}
          title={bookData.title}
          department={bookData.department}
          availability={bookData.availability}
          authors={bookData.authors}
          bookId={bookData.bookId}
          borrowed={bookData.borrowed}
        />
      );
    });
  }).filter(Boolean);

  return (
    <main className="home-main">
      {/* Show success message if login/signup */}
      {auth && (
        <Message
          message={auth === "signUp" ? "Sign up Successful" : "Login Successful"}
          imgMessage="tick-01"
          imgClassname="check"
        />
      )}

      {/* Welcome section */}
      <section className="home-first-sec">
        <h3>Welcome Sophia</h3>
        <div className="home-first-sec-user">
          <LazyLoadImage
            src="./Images/user.png"
            alt="User"
            effect="blur"
            wrapperProps={{ style: { transitionDelay: "2s" } }}
            placeholderSrc="User"
          />
        </div>
      </section>

      {/* Search section */}
      <section className="home-second-sec">
        <div className="home-second-sec-first-div">
          <input
            type="text"
            placeholder="Search book, authors, Genre"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span>
            <img src="./Images/edit.png" alt="Edit" />
          </span>
        </div>

        <button onClick={() => navigate("/borrowedBooksPage")}>
          View borrowed books
        </button>

        <div className="home-second-sec-div">
          <p>
            You have borrowed <span>7 out 15 books</span>
          </p>
        </div>
      </section>

      {/* Browse books */}
      <section className="home-third-sec">
        <h3>Browse Books</h3>
        {loading ? (
          <Loading />
        ) : showBooks.length ? (
          showBooks
        ) : (
          <p>{searchQuery.trim() ? "No books found for your search" : "No books available"}</p>
        )}
      </section>
    </main>
  );
};

export default Home;