import React from "react";
import "./Main.css";
import { assets } from "../../assets/assets/assets";    
import { Context } from "../../context/context";
import { useContext } from "react";
const Main = () => {
    const {onSent , recentPrompts,setResult,loading,resultData,setInput,input,showResults} = useContext(Context);
  return (
  <div className="main">
    <div className="nav">
       <p>Gemini</p>
       <img src={assets.user_icon} alt=''></img>
    </div>
    <div className="main-container">
        {!showResults
        ?<>
         
        <div className="greet">
            <p><span>Hello, Dev.</span></p>
            <p>How can I help you today?</p>
        </div>
        <div className="cards">
            <div className="card">
                <p>Suggest Beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt=''></img>
            </div>
            <div className="card">
                <p>Breifly summarize this concept; urban palnning</p>
                <img src={assets.bulb_icon} alt=''></img>
            </div>
            <div className="card">
                <p>Brainstom a concept for a new startup</p>
                <img src={assets.message_icon} alt=''></img>
            </div>
            <div className="card">
                <p>Improve the readablitiy of the following codes </p>
                <img src={assets.code_icon} alt=''></img>
            </div>
        </div>
        </>
        : <div className="result">
            <div className="result-title">
            <img src={assets.user_icon} alt=""/>
            <p>{recentPrompts}</p>
            </div>
            <div className="result-data">
                <img src={assets.gemini_icon} alt=""/>
                {loading ? <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                </div> :
                <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                }
                </div>
        </div>
        }
        <div className="main-bottom">
            <div className="search-box">
                <input value={input} onChange={(e)=>setInput(e.target.value)} type="text" placeholder="Rnter a prompy here" />
                <div>
                    <img src={assets.gallery_icon} alt=""></img>
                    <img src={assets.mic_icon} alt=""></img>
                    <img onClick={() => onSent(input)} src={assets.send_icon} alt=""></img>

                </div>
            </div>
            <p className="bottom-info">
                Gemini may display inaccurate info, including about people, so double-check
                anything important. </p>
        </div>

    </div>
    </div>
  );
};

export default Main;
