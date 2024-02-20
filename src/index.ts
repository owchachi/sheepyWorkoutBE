import app from './server'
import * as dotenv from 'dotenv'

dotenv.config()

app.listen(process.env.PORT, () => {
  console.log('hello on http://localhost:3001')
})
