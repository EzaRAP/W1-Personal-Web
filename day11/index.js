const express = require('express')
const path = require('path')
const app = express()
const port = 5000

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, 'src/views'))

app.use('/assets', express.static('src/assets'))
app.use(express.urlencoded({ extended: false }))

app.get('/', home)
app.get('/blog', blog)
app.get('/add-blog', addBlogView)
app.post('/add-blog', addBlog)
app.get('/blog-detail', blogDetail)
app.get('/testimonial', testimonial)
app.get('/contact', contact)

function home(req, res) {
    res.render('index')
}

function blog(req, res) {
    const data = [
        {
            title: "Title 1",
            content: "Content 1"
        },
        {
            title: "Title 2",
            content: "Content 2"
        }
    ]

    res.render('blog', { data })
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

    res.redirect('blog')
}

function blogDetail(req, res) {
    // const { id } = req.params // destructuring

    const id = "1"
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