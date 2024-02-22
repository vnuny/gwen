import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import ytdl from 'ytdl-core';
export async function POST(request: NextRequest){
    async function getData(id:any){
        let info:any = (await ytdl.getInfo(id));
        let audioFormats = ytdl.filterFormats(info.formats, 'audioandvideo');
        const formate = info.formats;
        return {formate, title: info.videoDetails.title};
    }
    try {
        const reqBody = await request.json();
        const {finalUrl}:any= reqBody;
        // console.log(finalUrl)
        
        if(finalUrl.includes('https://www.youtube.com/')){
            const id = finalUrl.substring(finalUrl.indexOf('?v=')+ 3);
            console.log(id)
            const data:any = await getData(id);
            const finalData = [];
            for(let i = 0; i < data.formate.length; i++){
                const url = {
                    url: data.formate[i].url,
                    qualityLabel: data.formate[i].qualityLabel,
                    quality: data.formate[i].quality,
                    hasVideo: data.formate[i].hasVideo,
                    hasAudio: data.formate[i].hasAudio
                }
                finalData.push(url);
            }
            // console.log(data)
            return NextResponse.json({finalData, title: data.title});
        }else{
            console.log('ooooo')
            const firstMarker = finalUrl.indexOf('be/') + 3;
            const lastMarker = finalUrl.indexOf('?si');
            const id = finalUrl.substring(firstMarker, lastMarker)
            
            const data:any = await getData(id);
            const finalData = [];
            for(let i = 0; i < data.formate.length; i++){
                const url = {
                    url: data.formate[i].url,
                    qualityLabel: data.formate[i].qualityLabel,
                    quality: data.formate[i].quality,
                    hasVideo: data.formate[i].hasVideo,
                    hasAudio: data.formate[i].hasAudio
                }
                finalData.push(url);
            }
            return NextResponse.json({finalData, title: data.title});
            // console.log(data)
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'error'});
    }
}