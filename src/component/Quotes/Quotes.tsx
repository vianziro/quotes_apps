import Style from './quotes.module.css'
import Button from '../Button'
import { useEffect, useState } from 'react'

/**
 * Quotes Component
 * Displays random quotes fetched from dummyjson API
 */
export default function Quotes() {
    // State to store the currently displayed quote
    const [quote, setQuote] = useState<{quote: string, author: string}>({quote: '', author: ''})
    // State to store all available quotes from API
    const [quotes, setQuotes] = useState<Array<{quote: string, author: string}>>([])
    
    /**
     * Fetches quotes from the API
     * @param controller AbortController to handle request cancellation
     */
    async function getQuotes(controller) {
        const signal = controller.signal
        const res = await fetch("https://dummyjson.com/quotes", {signal})
        const data = await res.json()
        setQuotes(data.quotes)
        setQuote(data.quotes[0])
    }

    /**
     * Effect hook to fetch quotes when component mounts
     * Includes cleanup function to abort fetch on unmount
     */
    useEffect(() => {
        const controller = new AbortController()
        getQuotes(controller)
        return () => {
            controller.abort()
        }
    }, [])
    
    /**
     * Selects and displays a random quote from the stored quotes
     */
    function randomQuote() {
        if (quotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * quotes.length)
            setQuote(quotes[randomIndex])
        }
    }

    return (
        <div className={Style.container}>
            <h1 className={Style.title}>Quote History</h1>
            <h4 className={Style.quote}>{quote.quote}</h4>
            <p className={Style.author}>{quote.author}</p>
            <Button onClick={randomQuote}>Generate</Button>
        </div>
    )
}