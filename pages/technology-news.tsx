import { GetServerSideProps } from 'next'
import React from 'react'
import RenderPage from '../components/RenderPage'

function Technology({Data}:any) {
  
  return (
      <RenderPage Data={Data} title='Technology News'/>
  )
}

export default Technology

export const getServerSideProps: GetServerSideProps = async (context) => {
  const access_key = process.env.ACCESS_KEY
  const path = context.resolvedUrl.replace('/','')
  try {
    
    const res = await fetch(`https://newsapi.org/v2/everything?q=${path}&apiKey=${access_key}`)
    const Data = await res.json()
  
    
   
    return {
      props: {
        Data: Data?Data.articles:[]
      }
    }
  } catch {
    return {
      notFound:true
    }
  }
}