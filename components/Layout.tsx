import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Header from './Header'
import NavBar from './NavBar'

type layoutType = {
  title: string,
  Data: { title: string }[],
  index1: number,
  index2:number,
  children:React.ReactNode
}


function Layout({ title,Data,index1,index2, children }: layoutType) {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT']
  
  
  const [dayNumber, setDayNumber] = useState(0)
  const [time, setTime] = useState({ h: '00', m: '00', s: '00',period: 'AM' })
  const [date,setDate] = useState({month:'JUNE',day:'THUR',year:1990})

 
  
  
  useEffect(() => {
    const months = ['JAN', 'FEB', 'MAR', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    
    const date = () => {
      setInterval(() => {
        const date = new Date()
        setDayNumber(date.getDay())

      const month = months[date.getMonth()]
      const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`
      setDate({month: month,day:day, year:date.getFullYear()})
        
      },1000)
      
    }



    const Time = () => {
      setInterval(() => {
        const date = new Date()
      let H =  date.getHours()
      let M = date.getMinutes()
      let S = date.getSeconds()
      const hour = H < 10 ? `0${H}` : `${H}`
      const minutes = M < 10 ? `0${M}` : `${M}`
      const seconds = S < 10 ? `0${S}` : `${S}`
        const hoursToMins = (H * 60) + M
        const period = hoursToMins > 720 ? 'PM' : 'AM'

        setTime({h:hour,m:minutes,s:seconds,period: period})
      
    },1000)
    }
    
      date()
      Time()
  },[])

  return (
    <div className='container'>
      <Head>
        <title>{title}</title>
        <meta name="description" content={`${title} News`} />
      </Head>
      <Header />
      <NavBar/>

      <main className='main'>
          <div className="grid">
        <div className="right-bar">
            <div className="top-main-wrapper">
              <div className='top-main'>
                <div className="slider1 outer">
                  <div className="inner">{Data[index1]?.title}</div>
                </div>
                <div className="clock">
                  <div className='outer-rect'>
                    <div className='dayNames'>
                      {
                        days.map((day, index) => {
                          return (
                            dayNumber === index ? <span key={index} style={{color:'red',fontWeight:'bold'}}>{day}</span>:
                            <span key={index}>{day}</span>
                          )
                        })
                      }
                    </div>
                    <div className='date'>
                      <span>{date.month}</span>
                      <span>{date.day}</span>
                      <span>{date.year}</span>
                    </div>
                    <div className='time'>
                      <span>{time.h}</span>
                      <span className='blink'>:</span>
                      <span>{time.m}</span>
                      <span className='blink'>:</span>
                      <span>{time.s}</span>
                      <span className='period'>{time.period}</span>
                    </div>
                  </div>
                </div>
                <div className="slider2 outer">
                  <div className="inner">
                    {Data[index2]?.title}
                  </div>
                  
                </div>
              </div>
                
            </div>
            <div className="main-news">{children}</div>
        </div>
        <div className="left-bar">Left bar</div>
        
    </div>
      </main>

      <footer className='footer'>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className='logo'>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Layout