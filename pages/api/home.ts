// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
const access_key =process.env.ACCESS_KEY



export default function handler(req: NextApiRequest, res: NextApiResponse) {
  axios.get(`https://newsapi.org/v2/everything?domains=bbc.co.uk&apiKey=${access_key}`)

      .then(result => {

          const data = result.data.articles.filter((x: any) => x.urlToImage !== null)
          res.status(200).json(data)
      })
      .catch(err => {
        res.send([])
      })
}
