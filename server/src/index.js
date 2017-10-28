import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import books from './routes/books'

const app = express()
app.use(bodyParser.json());

//Routes
app.use('/api/books', books)

app.get('/*', (req,res)=>{
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(8080,() => console.log("Running on localhost:8080"))
