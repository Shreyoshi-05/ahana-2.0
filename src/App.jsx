import React, { useContext } from 'react'
import './App.css'
import ai from './assets/ai.png'
import say from './assets/speak.gif'
import aiv from './assets/aiv.gif'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Appcontext } from './utils/AppContext'



const App = () => {
  const {telling} = useContext(Appcontext);

  const {
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();


  if (!browserSupportsSpeechRecognition) {
    return alert("Browser doesn't support speech recognition.");
  }


  return (
    <div className="container">
      <img src={ai} alt="" />
      <h1>I am Krisha 2.O . Your Advanced Virtual Assistant</h1>
      {listening &&<img className='say' src={say} alt="" />}
      {telling && <img className='say' src={aiv} alt="" />}
      {!listening && !telling && <button onClick={SpeechRecognition.startListening}>Talk to me</button>}
    </div>
  )
}

export default App