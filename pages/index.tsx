import type { GetServerSideProps, NextPage } from 'next'
import RenderPage from '../components/RenderPage'


const Home: NextPage = ({ localData }: any) => {
  
  

  return (
    <RenderPage Data={localData} title='Spy News'/>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const access_key = process.env.ACCESS_KEY
  
  try {
    
    const res = await fetch(`https://newsapi.org/v2/everything?domains=bbc.co.uk&apiKey=${access_key}`)
    const localData = await res.json()
  
    
   
    return {
      props: {
        localData: localData.articles
      }
    }
  } catch {
    return {
      notFound:true
    }
  }
}