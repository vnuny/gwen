import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import cheerio from 'cheerio';




async function trackDataGet(url: any) {
    const songData: any = {
        artist: '',
        posterUrl: '',
        duration: '',
        year: '',
        url: '',
        songName: ''
    };
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const name = $('.b81TNrTkVyPCOH0aDdLG a').text();
        const posterUrl = $('.rFLCDqCggWGtqULmRkQm img').attr('src');
        const duration = $('.fjP8GyQyM5IWQvTxWk6W span').eq(2).text();
        const year = $('.fjP8GyQyM5IWQvTxWk6W span').eq(1).text();
        const urllIndex = url.indexOf('track/');
        const urll = url.substring(urllIndex + 6);
        const songName = $('.gj6rSoF7K4FohS2DJDEm').text();
        songData.artist = name;
        songData.posterUrl = posterUrl;
        songData.duration = duration;
        songData.year = year;
        songData.url = `spotify:track/${urll}`;
        songData.songName = songName;
        return songData;
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function getData() {
    try {
        // const url = 'https://open.spotify.com/playlist/031QvXHmfmpAOocj2ZFwP4?si=2ebdd580dcd54ca4';
        const url = 'https://open.spotify.com/playlist/2qAS74mqfD7VD95gH7GylB?si=e4a8f30c60004330';
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const songMetaTags = $('meta[name="music:song"]');
        const urls = songMetaTags.map((index, element) => $(element).attr('content')).get();
        const trackDataPromises = urls.map(url => trackDataGet(url));
        const fullData = await Promise.all(trackDataPromises);
        return fullData.filter(data => data !== null);
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function GET(request: NextRequest) {
    try {
        const tracks = await getData();
        return NextResponse.json({ tracks });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error });
    }
}



// [
//     { role: "user", parts: myData },
//     { role: "model", parts: "I will not forget it" },
//     { role: "user", parts: "Can you add emojis to your response?" },
//     { role: "model", parts: "Sure" },
//     { role: "user", parts: ["When I ask you about time, respond with that time, but don't send it until I ask you, okay?", "And"] },
//     { role: "model", parts: "Sure" },
//     { role: "user", parts: `When I ask about it, send the song name and song URL ${JSON.stringify(tracks)}`},
//     { role: "model", parts: 'Sure, Diaa' },
//     { role: "user", parts: `Now, when I ask you to play a song, I will give you the song name, and you get the URL from the songs data I give you, and return it like this:
//     pplaying {
//         "name": "<song name>",
//         "url": "<song URL>",
//         "poster": "<song poster>",
//         "artist": "<song artist>",
//         "time": "<song time>"
//     }`},
//     { role: "model", parts: 'Sure' },
//     { role: "user", parts: 'Play "I Miss You, I Am Sorry" song' },
//     {
//         role: "model", parts: `pplaying {
//             "name": "I'm Miss You, I'm Sorry",
//             "url": "spotify:track:4nyF5lmSziBAt7ESAUjpbx",
//             "poster": "https://i.scdn.co/image/ab67616d0000b27355c38bc34d1fe852f2657c2e",
//             "artist": "Gracie Abrams",
//             "time": "2:47"
//         }`
//     }
// ];