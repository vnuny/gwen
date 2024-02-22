"use client"
import Image from 'next/image';
import '../css/chatArea.css'
import avatarImage from '../../../public/avatar.jpg'
import { useEffect, useRef, useState } from 'react';
import { json } from 'stream/consumers';
import me from '../../../public/image (6).png';

export default function ChatSection(renderMessages:any) {
    // const [render, setRender] = useState<any[]>(renderMessages.renderMessages);
    console.log(renderMessages);
    const scrollToBottom = () => {
        chatEnd.current?.scrollIntoView({ behavior: 'smooth', blockSize: 'end' });
        const object:any = chatEnd.current;
        object.scrollTop = object.scrollHeight + 1300;
    };
    useEffect(() => {
        scrollToBottom();
    }, [renderMessages])
    const UserMessage = (message: any)=>{
        scrollToBottom();
        return(
            <div className="userText">
                    <div className="avatar">
                        <Image src={me} alt="avatar"/>
                    </div>
                    <div className="text">
                        <p style={{whiteSpace: 'pre-line'}}>{message.message.content.text}</p>
                    </div>
            </div>
        )
    }

    const MusicCard = ({message}:any, {key}:any)=>{
        return(
            <div className="botMusic">
            <div className="avatar">
                <Image src={avatarImage} alt="avatar"/>    
            </div>    
            <div className="card">
                <div className="poster">
                    <img src={message.content.poster} alt=""/>
                </div>
                <div className="info">
                    <h2>{message.content.name}</h2>
                    <h3>{message.content.artist}</h3>
                </div>
                <div className="duration">3:10</div>
                
            </div>
            </div>
        )
    }

    const BotMessage = (message:any)=>{
        scrollToBottom();
        if(message.message.content.text.includes('**')){
            const regex = /\*\*(.*?)\*\*/g;
            let htmlText = '';
            htmlText = message.message.content.text.replace(regex, '<span style="font-weight: 700; font-size: 20px; margin-bottom: 200px;">$1</span>')
    
            return (
                <div className="botText">
                    <div className="avatar">
                        <Image src={avatarImage} alt="avatar"/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}} className="text">
                    {
                        // const trimmedPart = part.trim();
                       
                            htmlText !== '' && (
                                <p  style={{ marginBottom: '15px', whiteSpace: 'pre-line' }}>
                                    <span dangerouslySetInnerHTML={{ __html: htmlText }} />
                                </p>
                            )
                        
                    }
                    </div>
                </div>
            );
          }else{
            return(
                <div className="botText">
                    <div className="avatar">
                            <Image src={avatarImage} alt="avatar"/>
                    </div>
                    <div className="text">
                        <p style={{ whiteSpace: 'pre-line' }}>{message.message.content.text}</p>
                    </div>
                </div>
            )
          }
        
    }
    const DownloadMessage = ({message}:any, {key}:any)=>{
        return(
        <div className="downloadMessage">
                <div className="avatar">
                    <Image src={avatarImage} alt="avatar"/>
                </div>
                <div className="message">
                    <h3 className='mediaName'>{message.content.title}</h3>
                    <div className="cards">
                        {message.content.finalData.map((data:any, index:any) => {
                            return (
                                <div className="downloadCard" key={index} onClick={() => window.open(data.url)}>
                                <div className="tags">
                                    {data.hasVideo && <span><i className="fa-solid fa-video"></i></span>}
                                    {data.hasAudio && <span><i className="fa-solid fa-music"></i></span>}
                                </div>
                                <div className="quality">
                                    <h3>{data.quality}</h3>
                                    <h3>{data.qualityLabel}</h3>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                </div>
            </div>
    )
    }
    const UserImageMessage = (message:any)=>{
        return(
          <div className="UserImagesMessage">
            <div className="avatar">
                <Image src={me} alt="avatar"/>
            </div>
            <div className="message">
                <div className="image-preview-box">
                    {message.message.content.images[0].map((file:any, index:any) => {
                        return (
                            <img src={URL.createObjectURL(file)} className='image-preview' alt="imgs" />
                        )
                    })}
                </div>
              <p>{message.message.content.text}</p>
            </div>
          </div>
        )
      }
      
      const chatEnd:any = useRef();
      

        useEffect(() => {
          scrollToBottom();
          window.scrollBy(0, 1300);
      }, []);

    return (
        <div className="chatArea" ref={chatEnd}>
            {renderMessages.renderMessages.map((message:any, index:any) => {
                if(message.role === "user"){
                    return <UserMessage message={message} key={index} />
                }else if(message.role === "images"){
                    return <UserImageMessage message={message} key={index} />
                }else if(message.role === "bot"){
                    return <BotMessage message={message} key={index} />
                }else if(message.role === "music"){
                    return <MusicCard message={message} key={index} />
                }else if(message.role === "download"){
                    return <DownloadMessage message={message} key={index} />
                }
            })}
            <div />
        </div>
    );
}