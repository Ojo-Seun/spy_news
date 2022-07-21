import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
const access_key = process.env.ACCESS_KEY





export  default function handler  (req: NextApiRequest, res: NextApiResponse){
    if (req.method === 'POST') {
        const pathName = req.body
        axios.get(`https://newsapi.org/v2/everything?q=${pathName}&apiKey=${access_key}`)

      .then(result => {

          const data = result.data.articles.filter((x: any) => x.urlToImage !== null || undefined || '')
          res.status(200).json(data)
      })
      .catch(err => {
      res.status(404).json({data:[]})
      })

        
    }
}