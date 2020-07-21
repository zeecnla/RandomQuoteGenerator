import React, { useState, useEffect } from "react"
import { Link, BrowserRouter, Route } from "react-router-dom"
import "./App.css"

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
        setAuthorQuotes(quotes)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  console.log(" bruhrhuruhrhurhurhuur")
  return (
    <div>
      <h1>{author}</h1>
      <div>
        <ul>
          {authorQuotes.forEach(({ quoteText }) => (
            <li>
              <h3>{quoteText}</h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const App = () => (
  <BrowserRouter>
    <div className="sans-serif">
      <Route path="/" component={Main} />
      <Route path="/author" component={Quotes} />
    </div>
  </BrowserRouter>
)

const Main = () => {
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
    <div className="App">
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
        <h1>{quote}</h1>
        <Link to="/author" author={author}>
          <h3>{author}</h3>
          <span class="material-icons">arrow_right_alt</span>
        </Link>
      </main>
      <footer>Cesar Melchor @ DevChallenges.io</footer>
    </div>
  )
}

export default App
