"use client"
import React, { useEffect, useRef } from 'react'
import { record } from 'rrweb';
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';
import h337 from 'heatmap.js';
const page = () => {
    const iframeRef = useRef(null);
    let stopfn;
    let events = []
    let positions = []
    // Function to handle the replay
    const handleReplay = () => {
        console.log(events)
        const replayerWrapper = document.getElementById('replayer-wrapper');

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

    const generateHeatmap = () => {
        const iframe = iframeRef.current;
        const iframeDocument = iframe.contentDocument;
        // console.log(iframeDocument.getElementById('heatmap'))
        var heatmapInstance = h337.create({
            container: iframeDocument.getElementById('heatmap'),
        });

        positions.forEach((obj) => {
            heatmapInstance.addData({
                x: obj.x,
                y: obj.y,
                value: 1
            });

        })

    }


    useEffect(() => {
        const iframe = iframeRef.current;

        if (iframe) {


            stopfn = record(
                {
                    emit(event) {
                        // push event into the events array
                        events.push(event);
                    },
                }
            );


            return () => {
                stopfn()
            };
        }
    }, []);

    useEffect(() => {
        const iframe = iframeRef.current;

        if (iframe) {
            const handleMouseMove = (e) => {
                e.target.style.border = '1px solid red';
                let pos = { x: e.x, y: e.y }
                positions.push(pos)
            };

            const handleMouseLeave = (e) => {
                e.target.style.border = '0px';

            };

            const iframeDocument = iframe.contentDocument;
            const body = iframeDocument.body;

            // Check if the div has already been added
            let existingDiv = iframeDocument.getElementById('iframe-overlay');
            if (!existingDiv) {
                // Create a div and set its size to match the body
                const div = document.createElement('div');
                div.id = 'iframe-overlay';
                div.style.width = body.offsetWidth + 'px';
                div.style.height = body.offsetHeight + 'px';
                div.style.border = '1px solid blue'; // Optional: Add a border for visibility
                body.appendChild(div);

                existingDiv = iframeDocument.getElementById('iframe-overlay');
                const divHeatmap = document.createElement('div');
                divHeatmap.id = 'heatmap';
                divHeatmap.style.position = 'relative'
                divHeatmap.style.width = "100%";
                divHeatmap.style.height = "100%";
                existingDiv.appendChild(divHeatmap);


            }
            iframeDocument.addEventListener('mousemove', handleMouseMove);
            iframeDocument.addEventListener('mouseout', handleMouseLeave);

            return () => {
                iframeDocument.removeEventListener('mousemove', handleMouseMove);
                iframeDocument.removeEventListener('mouseout', handleMouseLeave);
            };
        }
    }, []);

    return (
        <main className='grid grid-cols-3 h-screen bg-slate-300'>
            <div className=' col-span-2 rounded-lg overflow-hidden m-2'>
                <iframe
                    ref={iframeRef}
                    src="/pages/home" className='w-full h-full' ></iframe>
            </div>
            <div className=' col-span-1'>
                <div onClick={handleReplay} className='bg-red-500 cursor-pointer p-4 w-1/2 mt-4 flex justify-center items-center text-white rounded-lg'>Replay</div>
                <div onClick={generateHeatmap} className='bg-green-500 cursor-pointer p-4 w-1/2 mt-4 flex justify-center items-center text-white rounded-lg'>Heatmap</div>
            </div>
            <div id='replayer-wrapper' className='absolute hidden h-screen w-screen'></div>
        </main>

    )
}

export default page