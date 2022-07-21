import mongoose from 'mongoose'
const Schema = mongoose.Schema

const landingPageDataSchema = new Schema({
    source: { id: String, name: String },
  title: String,
  description: String,        
  url: String,
  urlToImage: String,
  publishedAt: String,
  content: String

})

const LandingPageData = mongoose.models.LandingPageData || mongoose.model('LandingPageData', landingPageDataSchema)
export default LandingPageData