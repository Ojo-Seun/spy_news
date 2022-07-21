import type { GetServerSideProps, NextPage } from 'next'
import db from '../utils/db'
import LandingPageData from '../models/landingPageDataSchema'
import { useEffect, useState } from 'react'
import RenderPage from '../components/RenderPage'

const Home: NextPage = ({ localData }: any) => {
  
  let LocalData = JSON.parse(localData)
  const [Data, setData] = useState(LocalData)

  useEffect(() => {
    
    const fetchData = async () => {
      const res = await fetch('api/home')
      const response = await res.json()
      if (response.length > 0) {
        setData(response)
      }
      return

    }
    
      fetchData()

  },[])
  

  return (
    <RenderPage Data={Data} title='Spy News'/>
  )
}

export default Home

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