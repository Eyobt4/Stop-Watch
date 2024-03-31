import React, {useState,useEffect,useRef} from 'react'; 
function Stopwatch(){

    const [isRunning,setIsRunning]=useState(false);
    const [elpsedTime,setElpsedTime]=useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {

        if(isRunning){
            intervalIdRef.current = setInterval(()=>{ 
                setElpsedTime(Date.now()-startTimeRef.current);
            }, 10);
        }
        return () => {
            clearInterval(intervalIdRef.current);
        }

    }, [isRunning]);

    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now()-elpsedTime;
    }
    function stop(){
        setIsRunning(false);
    }
    function reset(){
        setElpsedTime(0);
        setIsRunning(false);
        
    }
    function formatTime(){

        let hours = Math.floor(elpsedTime / (1000*60*60));
        let minutes = Math.floor(elpsedTime / (1000*60) %60);
        let seconds = Math.floor(elpsedTime / (1000)%60);
        let milliseconds = Math.floor((elpsedTime % 1000) / 10);

        hours = String(hours).padStart(2,"0");
        minutes = String(minutes).padStart(2,"0");
        seconds = String(seconds).padStart(2,"0");
        milliseconds = String(milliseconds).padStart(2,"0");
        return(`${minutes}:${seconds}:${milliseconds}`);

    }

    return( <div className="stopwatch">
                <div className="display">{formatTime()}</div>
                <div className="controls">
                    
                    <button onClick={start} className="start-btn">start</button>
                    <button onClick={stop} className="stop-btn">stop</button>
                    <button onClick={reset} className="reset-btn">reset</button>

                </div>
            </div>
    );
}
export default Stopwatch

/* <button onClick={start()} className="start-btn">start</button>
                    <button  onClick={stop()} className="stop-btn">stop</button>
                    <button onClick={reset()} className="reset-btn">reset</button> */