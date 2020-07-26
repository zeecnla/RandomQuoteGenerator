import React, { useState, useEffect } from "react"
import { Link, BrowserRouter, Route } from "react-router-dom"
import "./App.css"
import Quote from "./components/Quote"

const Quotes = (props) => {
  const { author } = props
  const [authorQuotes, setAuthorQuotes] = useState([])
  useEffect(() => {
    const page = Math.floor(Math.random() * 5) + 1
    fetch(
      `https://quote-garden.herokuapp.com/api/v2/authors/${author}?page=${page}&limit=3`
    )
      .then((resp) => {
        return resp.json()
      })
      .then(({ quotes }) => {
        console.log(quotes)
        setAuthorQuotes((authorQuotes) => [...authorQuotes, ...quotes])
        console.log(authorQuotes)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <div>
      <h1 style={{ paddingLeft: `20px` }}>{author}</h1>
      <ul>
        {authorQuotes.map(({ quoteText }, index) => (
          <li key={index}>
            <Quote quoteText={quoteText} />
          </li>
        ))}
      </ul>
    </div>
  )
}

const App = () => {
  const [quote, setQuote] = useState()
  const [author, setAuthor] = useState()
  useEffect(() => {
    fetch("https://quote-garden.herokuapp.com/api/v2/quotes/random")
      .then((resp) => {
        console.log(resp)
        return resp.json()
      })
      .then(({ quote }) => {
        const { quoteText, quoteAuthor } = quote
        console.log(quoteText)
        setQuote(quoteText)
        setAuthor(quoteAuthor)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  const getQuote = () => {
    fetch("https://quote-garden.herokuapp.com/api/v2/quotes/random")
      .then((resp) => {
        return resp.json()
      })
      .then(({ quote }) => {
        const { quoteText, quoteAuthor } = quote
        console.log(quoteText)
        setQuote(quoteText)
        setAuthor(quoteAuthor)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <div className="outter">
      <header className="App-header">
        <button
          onClick={() => {
            getQuote()
          }}
        >
          random
        </button>
      </header>
      <main>
        <BrowserRouter>
          <Route
            exact
            path="/"
            component={() => <Main author={author} quote={quote} />}
          />
          <Route path="/author" component={() => <Quotes author={author} />} />
        </BrowserRouter>
      </main>

      <footer>Cesar Melchor @DevChallenges.io</footer>
    </div>
  )
}

const Main = ({ author, quote }) => {
  console.log(author)
  return (
    <div className="App">
      <main>
        <Quote quoteText={quote} />
        <Link to="/author" author={author}>
          <div className="author">
            <h3>{author}</h3>
            <span class="material-icons">arrow_right_alt</span>
          </div>
        </Link>
      </main>
    </div>
  )
}

export default App
