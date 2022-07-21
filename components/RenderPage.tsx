import { GetServerSideProps } from 'next'
import React, { useEffect, useState } from 'react'
import Layout from './Layout'

function RenderPage({ Data, title }: any) {
  const [imageIndex, setImageIndex] = useState({ index1: 0, index2: 0 })

  let length = Data.length - 1



  const getPublishedDate = (formalDateAndTime:string) => {
    let formal = formalDateAndTime.split('T')[0]
    let time = formalDateAndTime.split('T')[1].replace('Z','')
    const formalDate = new Date(formal)
    const now = new Date()
    const diff = Math.abs(formalDate.getTime() - now.getTime())
    const s = diff / 1000
    const mins = s / 60
    let x = ''

    if (mins >= 1440) {
        x = `${(mins / (1440)).toFixed()}days ago`


    } else if (mins >= 60) {
        x = `${(mins / 60).toFixed()}hr ago`
      
    } else {
      x = `${mins.toFixed()}mins age`
    }
     
    return { x, time }
  }
    


  const toggleDescription = (e:any) => {
    const parent = e.target.parentElement
    const des = parent.querySelector('.description')
    if (des.style.display === 'block') {
      des.style.display = 'none'
      e.target.textContent = 'Read More'
    } else {
      des.style.display = 'block'
      e.target.textContent = 'Read Less'
    }
  }

  useEffect(() => {

    setInterval(() => {
      const index1 = Math.floor(Math.random() * length)
      const index2 = Math.floor(Math.random() * length)
      setImageIndex({ index1: index1, index2: index2 })
    },10000)
    
  },[length])

  return (
    <Layout title={title} Data={Data} index1={imageIndex.index1} index2={imageIndex.index2}>
      <div className='cards-container'>
        <div className='upperCards'>
          <div className='upperCard1'><img src={Data[imageIndex.index1]?.urlToImage} alt={Data[imageIndex.index1]?.title} /></div>
          <div className='upperCard2'><img src={Data[imageIndex.index2]?.urlToImage} alt={Data[imageIndex.index2]?.title} /></div>
        </div>
        <div className='cards'>
        {
         Data.map((data:any, index:number) => (
            <div key={index} className='card'>
             <img src={data.urlToImage} alt={data.title} />
             <div className='content-container'>
               <span className='title'>{data.title}</span>
               <p className='description'>{data.description}</p>
               <button className='readMore' onClick={(e) => toggleDescription(e)}>Read More...</button>
               <div style={{ color: 'grey', fontSize:'12px', padding:'5px'}}>{getPublishedDate(data.publishedAt).x}{' '}{getPublishedDate(data.publishedAt).time}</div>
             </div>
            </div>
          ))
        }
      </div>
      </div>
      
    </Layout>
  )
}

export default React.memo(RenderPage)


