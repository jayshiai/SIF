"use client"
import React, { useEffect, useRef } from 'react'
import { record } from 'rrweb';
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';
import h337 from 'heatmap.js';
import axios from 'axios';
import Bowser from "bowser";

const page = () => {
    let stopfn;

    let userEventData = {
        events: [],
    }

    let userInteractionData = {
        positions: [],
        geolocation: {
            latitude: null,
            longitude: null
        },
        clicks: [],
    }
    // Function to handle the replay
    const handleReplay = () => {

        const replayerWrapper = document.getElementById('replayer-wrapper');
        const events = userEventData.events;
        if (replayerWrapper) {
            replayerWrapper.classList.remove('hidden');
            const replayer = new rrwebPlayer({
                target: replayerWrapper,
                props: {
                    events,
                },
            });

            replayer.play();
        }

    };


    // Function to handle the page unload
    const handlePageUnload = () => {
        // Send the events data to your API link here
        // You can use fetch or any other method to send the data
        const postEventData = JSON.stringify(userEventData)
        axios.post('http://127.0.0.1:80/events', postEventData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                // Handle the successful response here
                console.log(response.data);
            })
            .catch(error => {
                // Handle errors here
                console.error('Error:', error);
            });

        userInteractionData.sessionEnd = new Date().getTime();
        const postInteractionData = JSON.stringify(userInteractionData)
        axios.post('http://127.0.0.1:80/data', postInteractionData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                // Handle the successful response here
                console.log(response.data);
            })
            .catch(error => {
                // Handle errors here
                console.error('Error:', error);
            });
    };

    const generateHeatmap = () => {
        // const iframe = iframeRef.current;
        // const iframeDocument = iframe.contentDocument;
        // console.log(iframeDocument.getElementById('heatmap'))
        // const containerDiv = iframeDocument.getElementById('heatmap');
        // Check if the div has already been added
        // let existingDiv = iframeDocument.getElementById('iframe-overlay');
        let existingDiv = document.getElementById('iframe-overlay');
        if (!existingDiv) {
            // Create a div and set its size to match the body
            const div = document.createElement('div');
            div.id = 'iframe-overlay';
            div.style.width = document.body.offsetWidth + 'px';
            div.style.height = document.body.offsetHeight + 'px';
            div.style.border = '1px solid blue'; // Optional: Add a border for visibility
            // body.appendChild(div);
            document.body.appendChild(div);
            // existingDiv = iframeDocument.getElementById('iframe-overlay');
            existingDiv = document.getElementById('iframe-overlay');
            const divHeatmap = document.createElement('div');
            divHeatmap.id = 'heatmap';
            divHeatmap.style.position = 'relative'
            divHeatmap.style.width = "100%";
            divHeatmap.style.height = "100%";
            existingDiv.appendChild(divHeatmap);


        }

        const containerDiv = document.getElementById('heatmap');
        var heatmapInstance = h337.create({
            container: containerDiv,
        });

        userInteractionData.positions.forEach((obj) => {
            heatmapInstance.addData({
                x: obj.x,
                y: obj.y,
                value: 1
            });

        })

    }


    useEffect(() => {


        stopfn = record(
            {
                emit(event) {
                    // push event into the events array
                    userEventData.events.push(event);
                },
            }
        );


        return () => {
            stopfn()
        };

    }, []);

    const successCallback = (position) => {
        userInteractionData.geolocation.latitude = position.coords.latitude;
        userInteractionData.geolocation.longitude = position.coords.longitude;
    };

    const errorCallback = (error) => {
        console.log(error);
    };

    const handleMouseClick = (e) => {
        let click = { x: e.pageX, y: e.pageY }
        userInteractionData.clicks.push(click)
    }
    useEffect(() => {



        const browser = Bowser.getParser(window.navigator.userAgent); // Use getParser instead of parse
        const parsedBrowser = browser.getResult();

        console.log(parsedBrowser);

        userEventData.pageURL = window.location.href;
        userEventData.pageName = document.title;
        userInteractionData.pageURL = window.location.href;
        userInteractionData.pageName = document.title;
        let userID = localStorage.getItem('userID');

        if (!userID) {
            userID = crypto.randomUUID();
            localStorage.setItem('userID', userID);
        }

        let sessionID = sessionStorage.getItem('sessionID');

        if (!sessionID) {
            sessionID = new Date().getTime();
            sessionStorage.setItem('sessionID', sessionID);
        }
        userEventData.userID = userID;
        userInteractionData.userID = userID;
        const currentTimestamp = new Date().getTime();
        userEventData.sessionID = currentTimestamp;
        userInteractionData.sessionID = sessionID;
        userInteractionData.sessionStart = currentTimestamp;
        userInteractionData.browserName = parsedBrowser.browser.name
        userInteractionData.browserVersion = parsedBrowser.browser.version
        userInteractionData.osName = parsedBrowser.os.name
        userInteractionData.platform = parsedBrowser.platform.type
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        console.log(userInteractionData);

        const handleMouseMove = (e) => {
            let pos = { x: e.pageX, y: e.pageY }
            userInteractionData.positions.push(pos)
            // console.log(e)
        };

        const handleMouseLeave = (e) => {
            e.target.style.border = '0px';

        };

        // // Check if the div has already been added
        // // let existingDiv = iframeDocument.getElementById('iframe-overlay');
        // let existingDiv = document.getElementById('iframe-overlay');
        // if (!existingDiv) {
        //     // Create a div and set its size to match the body
        //     const div = document.createElement('div');
        //     div.id = 'iframe-overlay';
        //     div.style.width = document.body.offsetWidth + 'px';
        //     div.style.height = document.body.offsetHeight + 'px';
        //     div.style.border = '1px solid blue'; // Optional: Add a border for visibility
        //     // body.appendChild(div);
        //     document.body.appendChild(div);
        //     // existingDiv = iframeDocument.getElementById('iframe-overlay');
        //     existingDiv = document.getElementById('iframe-overlay');
        //     const divHeatmap = document.createElement('div');
        //     divHeatmap.id = 'heatmap';
        //     divHeatmap.style.position = 'relative'
        //     divHeatmap.style.width = "100%";
        //     divHeatmap.style.height = "100%";
        //     existingDiv.appendChild(divHeatmap);


        // }
        document.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('beforeunload', handlePageUnload);
        document.addEventListener('click', handleMouseClick);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('beforeunload', handlePageUnload);
            document.removeEventListener('click', handleMouseClick);
        };

    }, []);

    return (
        <main className='w-screen h-screen bg-slate-300'>

            <div className=' fixed bottom-4 right-4'>
                <div onClick={handleReplay} className='bg-red-500 cursor-pointer p-4 w-[200px] mt-4 flex justify-center items-center text-white rounded-lg'>Replay</div>
                <div onClick={generateHeatmap} className='bg-green-500 cursor-pointer p-4 w-[200px] mt-4 flex justify-center items-center text-white rounded-lg'>Heatmap</div>
            </div>
            <div id='replayer-wrapper' className='fixed top-0 left-0 hidden z-50 h-screen w-screen'></div>
        </main>

    )
}

export default page