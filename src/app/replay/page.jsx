"use client"
import axios from 'axios';
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';
import React, { useEffect, useRef, useState } from 'react';
import Plot from 'react-plotly.js';
import h337 from 'heatmap.js';

const page = () => {
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [replay, setReplay] = useState(false);
    const [heatmap, setHeatmap] = useState(false);
    const [pageURL, setPageURL] = useState('');

    const iframeRef = useRef(null);
    useEffect(() => {
        // Fetch data from your API or a data source
        axios.get('http://127.0.0.1/data_get')
            .then(response => {
                setData(response.data);
                setLoaded(true);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);


    const handleReplay = async (index) => {
        setReplay(true);
        const response = await axios.get('http://127.0.0.1/events_get');

        const userEventData = response.data;

        const events = userEventData[index].events;
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


    const generateHeatmap = (index, pageURL) => {
        setPageURL(pageURL)
        setHeatmap(true)
        const iframe = iframeRef.current;
        const iframeDocument = iframe.contentDocument;
        // console.log(iframeDocument.getElementById('heatmap'))
        // const containerDiv = iframeDocument.getElementById('heatmap');
        // Check if the div has already been added
        // let existingDiv = iframeDocument.getElementById('iframe-overlay');
        let existingDiv = iframeDocument.getElementById('iframe-overlay');

        if (!existingDiv) {
            // Create a div and set its size to match the body
            const div = document.createElement('div');
            div.id = 'iframe-overlay';
            div.style.width = iframeDocument.body.offsetWidth + 'px';
            div.style.height = iframeDocument.body.offsetHeight + 'px';

            iframeDocument.body.appendChild(div);
            // existingDiv = iframeDocument.getElementById('iframe-overlay');
            existingDiv = iframeDocument.getElementById('iframe-overlay');
            const divHeatmap = iframeDocument.createElement('div');
            divHeatmap.id = 'heatmap';
            divHeatmap.style.position = 'relative'
            divHeatmap.style.width = "100%";
            divHeatmap.style.height = "100%";
            existingDiv.appendChild(divHeatmap);


        }

        const containerDiv = iframeDocument.getElementById('heatmap');
        var heatmapInstance = h337.create({
            container: containerDiv,
        });

        data[index].positions.forEach((obj) => {
            heatmapInstance.addData({
                x: obj.x,
                y: obj.y,
                value: 1
            });

        })

    }

    return (
        <>
            {loaded ? (
                <>
                    <Plot
                        data={[
                            {
                                x: data.map(item => item.sessionStart),
                                y: data.map(item => item.pageTime),
                                type: 'bar',
                                text: data.map(item => item.pageTime),
                                marker: { color: 'blue' },
                            },
                        ]}
                        layout={{ title: 'Page Time for Each Page Title', xaxis: { tickangle: -45, tickmode: 'array', tickvals: data.map((item, index) => index) } }}
                    />
                    <Plot
                        data={[
                            {
                                labels: ["Windows", "Mac", "Linux", "Other"],
                                values: [40, 20, 20, 20],
                                type: 'pie',
                            },
                        ]}
                        layout={{ title: 'Percentage of OS Names' }}
                    />
                    <Plot
                        data={[
                            {
                                labels: ["Microsoft Edge", "Chrome", "Firefox", "Safari", "Opera", "Other"],
                                values: [40, 20, 20, 10, 5, 5],
                                type: 'pie',
                                marker: { colors: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'] },
                            },
                        ]}
                        layout={{ title: 'Percentage of Browser Names' }}
                    />
                </>
            ) : (<div>loading..</div>)}

            {/* {data.forEach((item, index) => (
                <div key={index} className='bg-gray-200 m-4 rounded-md pl-4 py-2 pr-8 w-fit flex items-center gap-4'>
                    <div className='h-[10px] w-[10px] rounded-full bg-green-500'></div>
                    <p>{item.userID}</p>
                </div>
            ))} */}
            {loaded &&
                data.map((item, index) => (
                    <div key={index} className='bg-gray-200 m-4 rounded-md pl-4 py-2 pr-8 w-fit flex items-center gap-4'>
                        <div className='h-[10px] w-[10px] rounded-full bg-green-500'></div>
                        <p>{item.userID} / {item.sessionStart} </p>
                        <div onClick={() => generateHeatmap(index, item.pageURL)} className='cursor-pointer bg-red-500 p-2 rounded-md'>Heatmap</div>
                        <div onClick={() => handleReplay(index)} className='cursor-pointer bg-green-500 p-2 rounded-md'>Replay</div>
                    </div>
                ))
            }
            {replay && (
                <>
                    <div onClick={() => setReplay(false)} className='fixed h-[50px] w-[50px] bg-red-600 top-4 right-4 cursor-pointer'> </div>
                    <div id="replayer-wrapper" className="fixed top-0 left-0"></div>
                </>)}

            {heatmap && (
                <>
                    <div onClick={() => setHeatmap(false)} className='fixed h-[50px] w-[50px] z-50 bg-red-600 top-4 right-4 cursor-pointer' ></div>

                </>
            )}

            <iframe ref={iframeRef} src={pageURL} className={`h-screen w-screen fixed top-0 left-0 ${heatmap ? "block" : "hidden"} pointer-events-none`} />

        </>
    )
}

export default page