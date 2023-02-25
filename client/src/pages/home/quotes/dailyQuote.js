import React, {useState, useEffect} from "react"
import schedule from 'node-schedule'
import "./dailyQuote.css"

function GetDailyQuote() {
    const [quote,setQuote] = useState('');
    const [loading,setLoading] = useState(true);
    const [author,setAuthor]= useState('');
    const [imgSrc,setImgSrc]= useState('');

    callQuoteAPI();
    schedule.scheduleJob('0 0 * * *', () => { callQuoteAPI(); }) // run everyday at midnight

    /*useEffect(() => {
        callQuoteAPI();
        const intervalID = setInterval(() => {
            callQuoteAPI();
        }, 24 * 60 * 60 * 1000);
        return () => {
            clearInterval(intervalID);
        }
    },[])*/

    function callQuoteAPI() {
        fetch('http://quotes.rest/qod.json?category=life')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setQuote(data.contents.quotes[0].quote);
            setAuthor(data.contents.quotes[0].author);
            setImgSrc(data.contents.quotes[0].background);
        })
    }
    return (
        <div className="quoteDiv">
            <h1 className="quoteHeader">{quote}</h1>
            <p className="authorParagraph">- {author}</p>
        </div>
    )
}
export default GetDailyQuote