import { useEffect, useState } from 'react'
import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css'
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function App() {
  const [time, setTime] = useState({ start: "", end: ""})
  const [key, setKey] = useState(0); 
  const [todayDate, setDate] = useState(""); 
  const [isClicked, setIsClicked] = useState(false)
  const [isTimePause, setIsTimePause] = useState(true)

  useEffect(() => {
    const date = new Date().getDate()
    const month = new Date().getMonth() + 1
    const year = new Date().getFullYear()
    const fulldate = `${date}/${month}/${year}`
    setDate(fulldate)
  }, [])

  const getCurrentTime = () => {
    const hour = new Date().getHours()
    const min = new Date().getMinutes()
    const sec = new Date().getSeconds()
    const midday = hour >= 12 ? "PM" : "AM"
    const caltime = `${hour}:${min}:${sec} ${midday}`
    return caltime
  }

  const handleStart = () =>{
    setIsClicked(true)
    setIsTimePause(false)
    setTime({start: getCurrentTime(), end: ""})
  }
  
  const handleStop = () =>{
    setIsClicked(false)
    setIsTimePause(true)
    setKey((prevKey) => prevKey + 1); 
    setTime({...time, end: getCurrentTime()})
  }

  const handlePausePlay = () =>{
    if(isClicked){
      setIsTimePause(!isTimePause)
    }
  }

  const selectBox = (label, icon, option) => {
    return (
      <div className='is-flex is-align-items-center'> 
        <span className='icon-text mr-3'>
          <span className='icon is-size-6'>
            <i className={`fa-regular ${icon}`}></i>
          </span>
          <span>{label}</span>
        </span>
        <div class="select is-light">
          <select className='time-box'>
            {option.map((opt, index) => (
              <option key={index}>{opt}</option>
            ))}
          </select>
        </div>
      </div>
    )
  }

  const header = () => {
    return (
      <div className='is-flex is-align-items-center is-justify-content-space-between mb-6'>
        <div className='is-flex is-align-items-center is-justify-content-center'>
          <div className='has-text-weight-semibold mr-3'>Company</div>
          <div className='company-box'></div>
        </div>
        {selectBox("Device Number", "fa-clipboard", ["option","option"])}
        {selectBox("Account", "fa-user", ["option","option"])}
        <button className='start-btn button py-1' onClick={handleStart} disabled={isClicked}>
          START
        </button>
      </div>
    )
  }

  const renderTime = ({ remainingTime }) => {
    // if (remainingTime === 0) {
    //   return <div className="timer">Too lale...</div>;
    // }

    const pausebtnStyle = isClicked ? isTimePause ? 'play-btn' : 'pause-btn ' : "disable-btn"
  
    return (
      <div className="has-text-centered">
        <div className="is-size-2 has-text-weight-semibold mb-3" style={{color: "rgb(0, 179, 0)"}}>00:{remainingTime ?? "00"}</div>
        <span className={"timer-btn " + pausebtnStyle} onClick={()=>handlePausePlay()}>
          <span className='icon is-size-4'>
            <i class={`fa-regular fa-${isTimePause ? "circle-play" : "circle-pause"}`}></i>
          </span>
        </span>
      </div>
    );
  };

  const counter = [
    {label: "Start", index: "start", default: "--:00 --"},
    {label: "End", index: "end", default: "--:-- --"},
  ]

  const body = () => {
    return (
      <div className='timer-body columns'> 
        <div className='column'>
          {/* {selectBox("Date", "fa-calendar-days", ["option","option"])} */}
          <div className='is-flex is-align-items-center'> 
            <span className='icon-text mr-3'>
              <span className='icon is-size-5'>
                <i className='fa fa-calendar-days'></i>
              </span>
              <span>Date</span>
            </span>
            <div className='time-box'>{todayDate}</div>
          </div>
        </div>

        <div className="column">
          <CountdownCircleTimer
            key={key} 
            isPlaying={!isTimePause}
            duration={60}
            colors={['#03c100', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            onComplete={() => ({ delay: 1 })}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>

        <div className='startEnd-time'>
          {counter.map((item, index) => (
            <div className='is-flex is-justify-content-space-between mb-3 is-align-items-center' key={index}>
              <span className='icon-text'>
                <span className='icon is-size-5'>
                  <i className='fa-regular fa-clock'></i>
                </span>
                <span>{item.label}</span>
              </span>
              <div className='time-box pr-6'>{time[item.index] ? time[item.index] : item.default}</div>
            </div>
          ))}

          {isClicked && !isTimePause && <div className='is-flex is-justify-content-end mt-6'>
            <button className='stop-btn button py-1' onClick={handleStop}>
              STOP
            </button>
          </div>}
        </div>
      </div>
    )
  }

  return (
    <div className='p-6'>
    {header()}
    {body()}
    </div>
  )
}

export default App
