import express from 'express'
const port = 4000

const app = express()

// middleware
app.use(express.urlencoded({ extended: false }))
app.use('/js', express.static('js'))
app.use('/images', express.static('images'))

// view Engine
app.set('views', app.use('/views', express.static('views')))
app.set('view engine', 'ejs')
app.set('views', 'views')

app.get("/", (req, res) => res.render('bugetApplication'))
app.listen(port, () => console.log(` app listening on port port! 3000 /n http://localhost:${port}`));