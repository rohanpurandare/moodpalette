import React, {useState, useEffect} from "react"
import schedule from 'node-schedule'

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
        fetch('http://quotes.rest/qod.json?category=inspire')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setQuote(data.contents.quotes[0].quote);
            setAuthor(data.contents.quotes[0].author);
            setImgSrc(data.contents.quotes[0].background);
        })
    }
    return (
        <>
        <h1>{quote}</h1>
        <p>- {author}</p>
        <img src={imgSrc}/>
        </>
    )
}
export default GetDailyQuote