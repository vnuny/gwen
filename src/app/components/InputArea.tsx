"use client";
import { useEffect, useState, useRef } from "react";
import "../css/InputArea.css";
import { isArray } from "util";

export default function InputArea({ message, disabled }: any) {
    const [dragShow, setDragShow] = useState(false);
    const [InputFiles, setInputFiles] = useState<File[]>([]);
    const [userMessage, setUserMessage]: any = useState({ role: 'user', content: { text: '', images: [], imagesData: [] } });
    const textInput = useRef<any>();
    useEffect(() => {
        if (InputFiles.length > 0) {
            setUserMessage({ ...userMessage, role: 'images' });
        } else {
            setUserMessage({ ...userMessage, role: 'user' });
        }
    },[InputFiles])
    useEffect(() => {
       textInput.current.focus();
    }, [disabled])
    function dragon(e: any) {
        setDragShow(true);
        checkRole();
    }

    function dragLeave() {
        setDragShow(false);
        checkRole();
    }

    function getImages(e: any) {
        checkRole();
        setDragShow(false);
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        const showFiles = e.dataTransfer.files;
        const fileReadPromises = files.map((file: any) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (event: ProgressEvent<FileReader>) => {
                    const base64String = ((event.target as FileReader).result as string).split(',')[1];
                    resolve(base64String);
                };
                reader.onerror = (error) => {
                    reject(error);
                };
                reader.readAsDataURL(file);
            });
        });
        
        Promise.all(fileReadPromises)
        .then((base64Strings:any) => {
            textInput.current?.focus();
            setUserMessage({ ...userMessage, content: { ...userMessage.content, imagesData: [base64Strings], images: [showFiles] } });
        })
        .catch((error) => {
            console.error('Error reading files:', error);
        });
        setInputFiles([...InputFiles, ...showFiles]);
    }

    function handleInputImages(e: any) {
        const files = Array.from(e.target.files);
        checkRole();
        const showFiles = e.target.files;

        const fileReadPromises = files.map((file: any) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (event: ProgressEvent<FileReader>) => {
                    const base64String = ((event.target as FileReader).result as string).split(',')[1];
                    resolve(base64String);
                };
                reader.onerror = (error) => {
                    reject(error);
                };
                reader.readAsDataURL(file);
            });
        });

        Promise.all(fileReadPromises)
        .then((base64Strings:any) => {
            console.log(base64Strings)
            textInput.current?.focus();
            setUserMessage({ ...userMessage, content: { ...userMessage.content, imagesData: [base64Strings], images: [showFiles] } });
        })

        .catch((error) => {
            console.error('Error reading files:', error);
        });
        setInputFiles([...InputFiles, ...showFiles]);
    }

    function enterSend(e: any) {
        checkRole();
        if (e.key === 'Enter' && userMessage.content.text.trim() !== '') {
            e.preventDefault();
            if (userMessage.content.images.length > 0) {
                setUserMessage({ ...userMessage, role: 'images' });
                message(userMessage);
            } else {
                setUserMessage({ ...userMessage, role: 'user' });
                message(userMessage);
            }
            setInputFiles([]);
            setUserMessage({ ...userMessage, content: { text: '', images: [] } });
        }
    }

    function checkRole() {
        if (InputFiles.length > 0) {
            setUserMessage({ ...userMessage, role: 'images' });
        } else {
            setUserMessage({ ...userMessage, role: 'user' });
        }
    }

    function handleDeleteImage(fileToDelete: File) {
        const updatedFiles = InputFiles.filter((file) => file !== fileToDelete);
        setInputFiles(updatedFiles);
        setUserMessage({ ...userMessage, content: { ...userMessage.content, images: updatedFiles } });
        checkRole();
    }

    const sendBtn = () =>{
        if (userMessage.content.text.trim() !== '') {
            if (userMessage.content.images.length > 0) {
                setUserMessage({ ...userMessage, role: 'images' });
                message(userMessage);
            } else {
                setUserMessage({ ...userMessage, role: 'user' });
                message(userMessage);
            }
            setInputFiles([]);
            setUserMessage({ ...userMessage, content: { text: '', images: [] } });
        }
    }

    return (
        <div className="inputArea"  onDragOver={dragon} onDragLeave={dragLeave} onDrop={getImages} style={{ outline: dragShow ? "3px dashed rgb(136, 110, 210)" : "0px solid white", backgroundColor: disabled ? 'rgb(213, 213, 213)' : 'white' }}>
            {InputFiles.length > 0 && (
                <div className="image-preview-box">
                    {InputFiles.map((file, index) =>
                        <div key={index} className="imageContainer">
                            <button onClick={() => handleDeleteImage(file)}><i className="fa-regular fa-trash"></i></button>
                            <img src={URL.createObjectURL(file)} className='image-preview' alt="uploaded" />
                        </div>
                    )}
                </div>
            )}
            <div className="inputBox" style={{ maxHeight: InputFiles.length > 0 ? "none" : "50px" }}>
                <textarea ref={textInput} disabled={disabled} value={userMessage.content.text} onKeyDown={enterSend} onChange={(e) => setUserMessage({ ...userMessage, content: { ...userMessage.content, text: e.target.value } })} placeholder={dragShow ? 'drag here' : "What's on your mind vnun"}></textarea>
                <div className="btns">
                    <button onClick={sendBtn}><i className="fa-solid fa-arrow-up"></i></button>
                    <button>
                        <i className="fa-solid fa-image"></i>
                        <label htmlFor="file"></label>
                        <input multiple={true} type="file" id="file" onChange={handleInputImages} style={{ display: "none" }} />
                    </button>
                </div>
            </div>
        </div>
    );
}
