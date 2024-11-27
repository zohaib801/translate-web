import { useEffect, useState} from "react";
import languages from "../languages";
import "./translate.css"

const Translate = () => {
    const [fromText, setFromText] = useState('');
    const [toText, setToText] = useState('');
    const [fromLanguage, setFromLanguage] = useState('en-GB');
    const [toLanguage, setToLanguage] = useState('ur-UR');
 



    const copyContent = (text) => {
        navigator.clipboard.writeText(text);
    }
    const utterText = (text, language) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language;
        synth.speak(utterance);
    }
    const handleExchange = () => {
        let tempValue = fromText;
        setFromText(toText);
        setToText(tempValue);

        let tempLang = fromLanguage;
        setFromLanguage(toLanguage);
        setToLanguage(tempLang);
    };
    const handleTranslate = () => {
        
        let url = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromLanguage}|${toLanguage}`;
        
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            setToText(data.responseData.translatedText);
            
        });
    };

    const handleIconClick = (target, id) => {
        if (!fromText || !toText) return;

        if (target.classList.contains('fa-copy')) {
            if (id === 'from') {
                copyContent(fromText);
            } else {
                copyContent(toText);
            }
            } else {
            if (id === 'from') {
                utterText(fromText, fromLanguage);
            } else {
                utterText(toText, toLanguage);
            }
        }
    };
    return(
        <>
            <section>
                <div className="container">
                    <div className="wrapper">
                        <div className='text-input'>
                            <textarea className="from-text" name="from" id="from" placeholder="Enter Text" value={fromText}  onChange={(event) => setFromText(event.target.value)}></textarea>
                            <textarea className="to-text" name="to" id="to" value={toText} readOnly></textarea>
                        </div>

                        <ul className="controls">
                            <li className="row from">
                                <div className="icons">
                                    <i id="from" class="fa-solid fa-volume-high"  onClick={(e) => handleIconClick(e.target, 'from')}></i>
                                    <i id="from" class="fa-solid fa-copy"  onClick={(event) => handleIconClick(event.target, 'from')}></i>
                      
                                </div>
                                <select value={fromLanguage} onChange={(event) => setFromLanguage(event.target.value)}>
                                    {Object.entries(languages).map(([code, name]) => (
                                        <option key={code} value={code}>
                                        {name}
                                        </option>
                                    ))}
                                </select>
                            </li>
                            <li className="exchange" onClick={handleExchange}>
                                <i class="fa-solid fa-arrow-right-arrow-left"></i>
                            </li>
                            <li className="row to">
                                <select value={toLanguage} onChange={(event) => setToLanguage(event.target.value)}>
                                    {Object.entries(languages).map(([code, name]) => (
                                        <option key={code} value={code}>
                                        {name}
                                        </option>
                                    ))}
                                </select>

                                <div className="icons">
                                <i id="to" class="fa-solid fa-copy" onClick={(e) => handleIconClick(e.target, 'to')}></i>
                                <i id="to" class="fa-solid fa-volume-high"  onClick={(e) => handleIconClick(e.target, 'to')}></i>
                        
                                </div>
                       
                            </li>
                        </ul>
                    </div>
                    <button onClick={handleTranslate}>
                                    Translate
                    </button>
                </div>
            </section>     
        </>
    )
}
export default Translate;