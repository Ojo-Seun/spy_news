


const fetchData = async (pathname:string) => {
   const res = await fetch('api/apiData', {
      method: 'POST',
      headers: {
        "Content-Type":"application/json"
      },
      body:JSON.stringify(pathname)
      
   })
      
   const response = await res.json()
   return response
}
    
export default fetchData