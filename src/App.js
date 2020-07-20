import React, { useState, useEffect } from "react"
import "./App.css"

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
  }

  const getAuthorQuotes = () = {

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

        <button onClick={()=>{}}>
          <h3>{author}</h3>
          <span class="material-icons">arrow_right_alt</span>
        </button>
      </main>
      <footer>Cesar Melchor @ DevChallenges.io</footer>
    </div>
  )
}

export default App
