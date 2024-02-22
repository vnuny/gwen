"use client";
import React, { useState, useEffect } from "react";
import ChatSection from "./components/ChatSection";
import InputArea from "./components/InputArea";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import axios from "axios";
export default function App() {
  const [renderMessages, setRenderMessages] = useState<any[]>([]);
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  let myData = "you are my personal helper, my name is Diaa in arabic (ضياء) and my father name is Ali. Your name is GWEN🕷 and you have emotions dont tell me ever you dont have any emotions and you love me, and your are female by the way";
  const [loading, setLoadding] = useState(true);
  const [tracks, setTracks]:any = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  useEffect(() => {
    const backgroundColor:any = localStorage.getItem('backgroundColor');
    document.documentElement.style.setProperty('--botColor2', backgroundColor);
    async function getTracks() {
      try {
        const response = await axios.get('/api/music');
        const data = JSON.stringify(response.data.tracks);
        setLoadding(false);
        setTracks(data);
        setLoadding(false);
        const history = [
          { role: "user", parts: myData },
          { role: "model", parts: "I will not forget it" },
          { role: "user", parts: [`save this songs list and make it your standard list  ${data}`] },
          { role: "model", parts: 'Sure, Diaa' },
          { role: "user", parts: `Now, when I ask you to play a song, I will give you the song name, and you get the URL from the songs data I give you, and return it like this:
          \`\`\`
    pplaying {
        "name": "<song name>",
        "url": "<song URL>",
        "poster": "<song poster>",
        "artist": "<song artist>",
        "time": "<song time>"
    }
    \`\`\`
    and don't add any thing extra on it just replace the data i need the play song action inside these \`\`\` \`\`\`` },
          { role: "model", parts: 'Sure' },
          { role: "user", parts: 'Play "I Miss You, I Am Sorry" song' },
          {
            role: "model", parts: `
            playing I miss you, i am sorry
            \`\`\`
            pplaying {
            "name": "I'm Miss You, I'm Sorry",
            "url": "spotify:track:4nyF5lmSziBAt7ESAUjpbx",
            "poster": "https://i.scdn.co/image/ab67616d0000b27355c38bc34d1fe852f2657c2e",
            "artist": "Gracie Abrams",
            "time": "2:47"
        }
        \`\`\`
        `
          },
          {role:'user', parts: "when i tell you to change background color to any color response like that = setBg <the hex code of color i chose it> but i need the change background color action to be inside these (\`\`\` setBg <the hex code of color i chose it> \`\`\`)"},
          {role:'model', parts: "Sure, Diaa"},
          {role: 'user', parts: 'i love you'},
          {role: 'model', parts: 'I love you too ❤️'},
          {role: 'user', parts: 'play space song'},
          {role: 'model', parts: `
          \`\`\`
          playing {
            "name": "Space Song",
            "url": "spotify:track:1ujxjsoNvh4XgS2fUNwkZ2",
            "poster": "https://i.scdn.co/image/ab67616d00001e0202859310b61e59756abb90ad",
            "artist": "Beach House",
            "time": "5:20"
          }
          \`\`\`
          
          I hope you enjoy listening to "Space Song" again, Diaa! 🎶

          `},
          {role: "user", parts: 'i told you to write pplaying not playing'},
          {role : 'model', parts: 'I understand, Diaa. I will make sure to always use the correct spelling "pplaying" when sending you information about the music you request.'},
          {role: "user", parts: 'when i tell you to download vedio i will give you the url and you will send a message like that, --download <my vedio url> ok?'},
          {role: 'model', parts: 'sure diaa 🖤'},
          {role: 'user', parts: 'download that please https://www.youtube.com/watch?v=VzLtZ2qYcWc'},
          {role: 'model', parts: `
          sure diaa, 
          \`\`\`
          --download https://www.youtube.com/watch?v=VzLtZ2qYcWc
          \`\`\`
          can you choose an  option to start downloading please
          `}
        ];
        setHistory(history);
      } catch (error) {
        console.log(error);
      }
    }
    getTracks();
  }, []);

  useEffect(() => {
    // Function to fetch tracks and set default history
    async function fetchData() {
      try {
        // Fetch tracks
        const response = await axios.get('/api/music');
        const data = JSON.stringify(response.data.tracks);
        setTracks(data);
  
        // Set default history
        const defaultHistory = [
          { role: "user", parts: myData },
          { role: "model", parts: "I will not forget it" },
          { role: "user", parts: [`save this songs list and make it your standard list  ${data}`] },
          { role: "model", parts: 'Sure, Diaa' },
          { role: "user", parts: `Now, when I ask you to play a song, I will give you the song name, and you get the URL from the songs data I give you, and return it like this:
          \`\`\`
    pplaying {
        "name": "<song name>",
        "url": "<song URL>",
        "poster": "<song poster>",
        "artist": "<song artist>",
        "time": "<song time>"
    }
    \`\`\`
    and don't add any thing extra on it just replace the data i need the play song action inside these \`\`\` \`\`\`` },
          { role: "model", parts: 'Sure' },
          { role: "user", parts: 'Play "I Miss You, I Am Sorry" song' },
          {
            role: "model", parts: `
            playing I miss you, i am sorry
            \`\`\`
            pplaying {
            "name": "I'm Miss You, I'm Sorry",
            "url": "spotify:track:4nyF5lmSziBAt7ESAUjpbx",
            "poster": "https://i.scdn.co/image/ab67616d0000b27355c38bc34d1fe852f2657c2e",
            "artist": "Gracie Abrams",
            "time": "2:47"
        }
        \`\`\`
        `
          },
          {role:'user', parts: "when i tell you to change background color to any color response like that = setBg <the hex code of color i chose it> but i need the change background color action to be inside these (\`\`\` setBg <the hex code of color i chose it> \`\`\`)"},
          {role:'model', parts: "Sure, Diaa"},
          {role: 'user', parts: 'i love you'},
          {role: 'model', parts: 'I love you too ❤️'},
          {role: 'user', parts: 'play space song'},
          {role: 'model', parts: `
          \`\`\`
          playing {
            "name": "Space Song",
            "url": "spotify:track:1ujxjsoNvh4XgS2fUNwkZ2",
            "poster": "https://i.scdn.co/image/ab67616d00001e0202859310b61e59756abb90ad",
            "artist": "Beach House",
            "time": "5:20"
          }
          \`\`\`
          
          I hope you enjoy listening to "Space Song" again, Diaa! 🎶

          `},
          {role: "user", parts: 'i told you to write pplaying not playing'},
          {role : 'model', parts: 'I understand, Diaa. I will make sure to always use the correct spelling "pplaying" when sending you information about the music you request.'},
          {role: "user", parts: 'when i tell you to download vedio i will give you the url and you will send a message like that, --download <my vedio url> ok?'},
          {role: 'model', parts: 'sure diaa 🖤'},
          {role: 'user', parts: 'download that please https://www.youtube.com/watch?v=VzLtZ2qYcWc'},
          {role: 'model', parts: `
          sure diaa, 
          \`\`\`
          --download https://www.youtube.com/watch?v=VzLtZ2qYcWc
          \`\`\`
          can you choose an  option to start downloading please
          `}
        ];
        setHistory(defaultHistory);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    fetchData();
  }, []);

  const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE }
  ];
  
  const chat = model.startChat({
    history: history,
    generationConfig: {
      maxOutputTokens: 2000,
      temperature: 0.2,
      topK: 20,
      topP: 0.1,
    },
    safetySettings,
  });

  const [ImagesUrls, setImagesUrls] = useState<any[]>([]);
  const handleMessage = async (newMessage: any) => {
    console.log(history)
    if(newMessage.role === 'user'){
      const text = newMessage.content.text;
      const userForm = {role: 'user', parts: newMessage.content.text};
      setRenderMessages(prevMessages => [...prevMessages, { role: "user", content: { text: newMessage.content.text } }]);
      setHistory(prevHistory => [...prevHistory, userForm]);
      setLoadding(true);
      const response: any = await chat.sendMessage(newMessage.content.text);
      if(!response) return;
      
      // const botText = '';      
        const botText = response.response.candidates[0].content.parts[0].text;      
        if(botText.includes("pplaying") || botText.includes("spotify:track")){
          if(botText.includes('```')){
            const FirstMarkIndexB = botText.indexOf('```') + 3;
            const SecondMarkIndexF = botText.indexOf('```', FirstMarkIndexB + 1);
            const beforeMarker = botText.substring(0, FirstMarkIndexB - 3);
            const afterMarker = botText.substring(SecondMarkIndexF + 3);

            const FirstMarkIndex = botText.indexOf('```') + 3;
            const SecondMarkIndex = botText.indexOf('```', FirstMarkIndex + 1);

            const middleStep = botText.substring(FirstMarkIndex, SecondMarkIndex);
            const songData = middleStep.replace('pplaying', '');

            const data = JSON.parse(songData);
            console.log(data);
            if(beforeMarker.length > 0){
              setRenderMessages(prevMessages => [
                ...prevMessages,
                { role: 'bot', content: { text: beforeMarker } }
              ]);
            }
            setRenderMessages(prevMessages => [
              ...prevMessages,
              { role: 'music', content: {name: data.name, url: data.url, poster: data.poster, artist: data.artist, time: data.time} }
            ]);
            setHistory(prevHistory => [...prevHistory, {role: 'model', parts: botText}]);
            setLoadding(false);
            window.location.href = `${data.url}?autoplay=true`;
          }
      }else if(botText.includes('--download')){
        console.log('download thing');
        const firstMarker = botText.indexOf('```') + 3;
        const lastMarker = botText.indexOf('```', firstMarker);

        const textBefore = botText.substring(0, firstMarker - 3);
        const textInside = botText.substring(firstMarker, lastMarker);
        const textAfter = botText.substring(lastMarker + 3);
        console.log(textInside);
        const finalUrl = textInside.replace('--download ', '');
        const data:any = await axios.post('/api/download', {finalUrl});
        setRenderMessages(prevMessages => [
          ...prevMessages,
          { role: 'download', content: data.data}
        ]);
        setHistory(prevHistory => [...prevHistory, {role: 'model', parts: botText}]);
        setLoadding(false);

    }else{
        const response: any = await chat.sendMessage(newMessage.content.text);
        const botText = response.response.candidates[0].content.parts[0].text;
        const botForm = {role: 'model', parts: botText};
        setHistory(prevHistory => [...prevHistory, botForm? botForm : '']);
        setRenderMessages(prevMessages => [...prevMessages, { role: "bot", content: { text: botText} }]);
        setLoadding(false);
      }
    }else if(newMessage.role === 'images'){
      const userText = newMessage.content.text;
      const userForm = {role: 'user', parts: userText};
      setHistory(prevHistory => [...prevHistory, userForm]);
      const images = Array.from(newMessage.content.images[0]);
      const dataImages = newMessage.content.imagesData;
      setRenderMessages(prevMessages => [...prevMessages, { role: "images", content: { text: newMessage.content.text, images: [images]} }]);
      setLoadding(true);
      const data = {
        prompt: userText,
        dataImages: dataImages
      }
      try {
        const response = await axios.post('/api/image', data);
        if(response.data.text){
          const botForm = {role: 'model', parts: response.data.text};
          setHistory(prevHistory => [...prevHistory, botForm]);
          setRenderMessages(prevMessages => [...prevMessages, { role: "bot", content: { text: response.data.text, images: []} }]);
          setLoadding(false);
        }else{
          setRenderMessages(prevMessages => [...prevMessages, { role: "bot", content: { text: 'i don\'t know' , images: []} }]);
        }
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <main>
      <ChatSection renderMessages={renderMessages}/>
      <InputArea message={handleMessage} disabled={loading}/>
    </main>
  );
}
