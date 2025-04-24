import { GoogleGenAI } from "@google/genai";
import { createContext, useEffect, useState } from "react";
import { useSpeechRecognition } from "react-speech-recognition";

export const Appcontext = createContext();

const AppProvider = ({ children }) => {
  const transcript = useSpeechRecognition();
  const [telling, setTelling] = useState(false);

  let question = transcript.transcript;

  function speak(prop) {
    let speak_text = new SpeechSynthesisUtterance(prop);
    speak_text.volume = 1;
    speak_text.rate = 1;
    speak_text.pitch = 1.3;
    speak_text.lang = "en-GB";

    speak_text.onstart = () => setTelling(true);

    speak_text.onend = () => setTelling(false);
    window.speechSynthesis.speak(speak_text);
  }

  const name = "shre";
  console.log(question);

  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API });

  async function getAns(question) {
    let query = `give answer in two or three line  ${question}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: query,
    });

    console.log(response.text);
    let res = response.text
      .replace(/[*]+/g, "")
      .replace("I am a large language model", "I am Krishaa 2.0")
      .replace("large language model", "Krishaa");
    return res;
  }

  useEffect(() => {
    if (question) {
      let time = setTimeout(() => {
        async function handelAns() {
          let reply = await getAns(question);
          if (reply) {
            speak(reply);
          }
        }

        handelAns();
      }, 500);

      return () => clearTimeout(time);
    }
  }, [question]);

  return (
    <Appcontext.Provider value={{ telling }}>{children}</Appcontext.Provider>
  );
};
export default AppProvider;
