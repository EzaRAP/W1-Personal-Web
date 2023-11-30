const express = require('express')
const path = require('path')
const app = express()
const port = 5000
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)


app.set("view engine", "hbs")
app.set("views", path.join(__dirname, 'src/views'))

app.use('/assets', express.static('src/assets'))
app.use(express.urlencoded({ extended: false }))

app.get('/', home)
app.get('/blog', blog)

app.get('/add-blog', addBlogView)
app.post('/add-blog', addBlog)

app.post('/delete-blog/:id', deleteBlog)

app.get('/update-blog/:id', updateBlogView)
app.post('/update-blog', updateBlog)

app.get('/blog-detail/:id', blogDetail)
app.get('/testimonial', testimonial)
app.get('/contact', contact)

const data = [

]

async function home(req, res) {
    const query = 'SELECT * FROM projects'
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    console.log('ini data dari database', obj)

    res.render('index', { data: obj })
}

async function blog(req, res) {
    const query = 'SELECT * FROM projects'
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    console.log('ini data dari database', obj)

    res.render('blog', { data: obj })
}

function addBlogView(req, res) {
    res.render('add-blog')
}


function addBlog(req, res) {
    const { title, startDate, endDate, content } = req.body

    console.log("title :", title)
    console.log("start Date :", startDate)
    console.log("end Date :", endDate)
    console.log("content :", content)

    const dataBlog = { title, startDate, endDate, content }
    data.unshift(dataBlog)

    res.redirect('/')
}

function deleteBlog(req, res) {
    const { id } = req.params

    data.splice(id, 1)

    console.log("delete :", id)

    res.redirect('/')
}

function updateBlogView(req, res) {
    const { id } = req.params

    const dataFilter = data[parseInt(id)]
    dataFilter.id = parseInt(id)
    console.log('data filter :', dataFilter)

    res.render('update-blog', { data: dataFilter })
}


function updateBlog(req, res) {
    const { title, startDate, endDate, content, id } = req.body

    console.log("id :", id)
    console.log("title :", title)
    console.log("start Date :", startDate)
    console.log("end Date :", endDate)
    console.log("content :", content)

    data[parseInt(id)] = {
        title,
        startDate,
        endDate,
        content
    }
    res.redirect('/blog')
}

function blogDetail(req, res) {
    const { id } = req.params // destructuring

    const title = "Title 1"
    const content = "Content 1"

    const data = {
        id,
        title,
        content
    }

    res.render('blog-detail', { data })
}

function testimonial(req, res) {
    res.render('testimonial')
}

function contact(req, res) {
    res.render('contact')
}

app.listen(port, () => {
    console.log(`server berjalan di port ${port}`)
})