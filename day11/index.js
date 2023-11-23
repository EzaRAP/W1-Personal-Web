const express = require('express')
const path = require('path')
const app = express()
const port = 5000

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, 'src/views'))

app.use('/assets', express.static('src/assets'))

app.get('/', home)
app.get('/blog', blog)
app.get('/add-blog', addBlog)
app.get('/blog-detail', blogDetail)
app.get('/testimonial', testimonial)
app.get('/contact', contact)

function home(req, res) {
    res.render('index')
}

function blog(req, res) {
    res.render('blog')
}

function addBlog(req, res) {
    res.render('add-blog')
}

function blogDetail(req, res) {
    res.render('blog-detail')
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