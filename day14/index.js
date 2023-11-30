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


async function addBlog(req, res) {
    const { title, content, startDate, endDate } = req.body
    const image = "cat.jpg"

    const query = `INSERT INTO projects(title, content, image, "startDate", "endDate") VALUES ('${title}','${content}','${image}', '${startDate}', '${endDate}')`
    const obj = await sequelize.query(query, { type: QueryTypes.INSERT })

    console.log("data berhasil di insert", obj)

    // if (obj[1] <= 0) {
    //     console.log("data gagal ditambahkan, silahkan coba kembali")
    // }

    res.redirect('/')
}

async function deleteBlog(req, res) {
    const { id } = req.params

    // data.splice(id, 1)
    const query = `DELETE FROM projects WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.DELETE })

    console.log("berhasil delete ", obj)

    res.redirect('/')
}

async function updateBlogView(req, res) {
    const { id } = req.params

    const query = `SELECT * FROM projects WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    console.log('ini data dari database', obj)

    res.render('update-blog', { data: obj[0] })
}


async function updateBlog(req, res) {
    const { title, startDate, endDate, content, id } = req.body

    // console.log("id :", id)
    // console.log("title :", title)
    // console.log("start Date :", startDate)
    // console.log("end Date :", endDate)
    // console.log("content :", content)

    const query = `UPDATE projects SET title='${title}',"startDate"='${startDate}',"endDate"='${endDate}',content='${content}' WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.UPDATE })
    console.log('berhasil di update', obj)

    res.redirect('/blog')
}

async function blogDetail(req, res) {
    const { id } = req.params // destructuring

    const query = `SELECT * FROM projects WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    console.log('ini data dari database', obj)

    res.render('blog-detail', { data: obj[0] })
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