import React, { useEffect, useRef, useState } from 'react'
import NavLink from 'next/link'
import { useRouter } from 'next/router'

function NavBar() {
  const { pathname } = useRouter();
  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
    setToggle(!toggle)
}

   
  
  useEffect(() => {

    //STYLE ACTIVE PAGE


    const styleActivePage = () => {
      const paths = document.querySelectorAll('.menu li a')
      for (let i = 0; i < paths.length; i++){
        paths[i].classList.remove('active')
        if (paths[i].getAttribute("href") === pathname) {
          paths[i].classList.add("active")
        }
        
      }
      
    }
    
styleActivePage()

  },[pathname])
  
  
  
  return (
    <nav className='menu-container'>
      <div className='toggle-container'><button className='toggle-btn' onClick={handleToggle}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
      </button></div>
      <ul className={`menu ${toggle &&'showMenu'}`}>
              <li><NavLink  href='/politics-news'><a>Politics</a></NavLink></li>
              <li><NavLink href='/sports-news'><a>Sports</a></NavLink></li>
              <li><NavLink href='/technology-news'><a>Technology</a></NavLink></li>
              <li><NavLink href='/science-news'><a>Science</a></NavLink></li>
              <li><NavLink href='/computer-science'><a>Computer Science</a></NavLink></li>
          </ul>
    </nav>
  )
}

export default NavBar