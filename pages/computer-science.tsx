import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import RenderPage from '../components/RenderPage'
import LandingPageData from '../models/landingPageDataSchema'
import db from '../utils/db'
import fetchData from '../utils/fetchData'

function IT({ localData }:any) {
  let LocalData = JSON.parse(localData)
  const [Data, setData] = useState(LocalData)
  const router = useRouter()

  useEffect(() => {
    
    
    fetchData(router.pathname.replace('/', '')).then(result => {
      if (result.length > 0) {
        setData(result)
      }
      return
    })

  },[router])
  return (
    <RenderPage Data ={Data} title='Information Technology'/>
     
  )
}

export default IT


export const getServerSideProps: GetServerSideProps = async ()=>{
  await db.connect()
  const localData = await LandingPageData.find({})
  db.disconnect()

  return {
    props: {
      localData: localData ? JSON.stringify(localData):[]
    }
  }
}