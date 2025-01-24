import Style from './quotes.module.css'
import Button from '../Button'
import { useEffect, useState } from 'react'



export default function Quotes() {
    const [quote, setQuote] = useState({})
    useEffect(() => {
       async function getQuote() {
           const res = await fetch("https://dummyjson.com/quotes")
           const data = await res.json()

           setQuote (data.quotes[0])
       }
        getQuote()
    },[])
    return (
        <div className={Style.container}>
            <h1 className={Style.title}>Quote History</h1>
            <h4 className={Style.quote}>{ quote.quote}</h4>
            <p className={Style.author}>{quote.author}</p>
            <Button>Generate</Button>
        </div>
    )
}