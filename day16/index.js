const express = require('express')
const path = require('path')
const app = express()
const port = 5000
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')


app.set("view engine", "hbs")
app.set("views", path.join(__dirname, 'src/views'))

app.use('/assets', express.static('src/assets'))
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    name: "data",
    secret: 'rahasiabanget',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

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

app.get('/register', registerView)
app.post('/register', register)

app.get('/login', loginView)
app.post('/login', login)

const data = [

]

async function home(req, res) {
    const query = 'SELECT * FROM projects'
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    // console.log('ini data dari database', obj)

    const isLogin = req.session.isLogin

    res.render('index', { data: obj, isLogin, user: req.session.user })
}

async function blog(req, res) {
    const query = 'SELECT * FROM projects'
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    // console.log('ini data dari database', obj)

    const isLogin = req.session.isLogin
    user = req.session.user

    res.render('blog', { data: obj, isLogin, user })
}

function addBlogView(req, res) {
    res.render('add-blog')
}


async function addBlog(req, res) {
    const { title, content, startDate, endDate } = req.body
    const image = "cat.jpeg"
    const isLogin = req.session.isLogin

    if (!isLogin) {
        return res.redirect('/login')
    }

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
    const isLogin = req.session.isLogin

    if (!isLogin) {
        return res.redirect('/login')
    }

    // data.splice(id, 1)
    const query = `DELETE FROM projects WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.DELETE })

    // console.log("berhasil delete ", obj)

    res.redirect('/')
}

async function updateBlogView(req, res) {
    const { id } = req.params

    const query = `SELECT * FROM projects WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    // console.log('ini data dari database', obj)

    res.render('update-blog', { data: obj[0] })
}


async function updateBlog(req, res) {
    const { title, startDate, endDate, content, id } = req.body
    const isLogin = req.session.isLogin

    if (!isLogin) {
        return res.redirect('/login')
    }

    const query = `UPDATE projects SET title='${title}',"startDate"='${startDate}',"endDate"='${endDate}',content='${content}' WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.UPDATE })
    // console.log('berhasil di update', obj)

    res.redirect('/blog')
}

async function blogDetail(req, res) {
    const { id } = req.params // destructuring

    const query = `SELECT * FROM projects WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    // console.log('ini data dari database', obj)

    res.render('blog-detail', { data: obj[0] })
}

function testimonial(req, res) {
    res.render('testimonial')
}

function contact(req, res) {
    res.render('contact')
}

function registerView(req, res) {
    res.render('register')
}

async function register(req, res) {
    const { name, email, password } = req.body

    const salt = 10

    bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
            return console.error("password failed to be encrypted")
        }

        const query = `INSERT INTO registers(name, email, password) VALUES ('${name}','${email}','${hash}')`

        await sequelize.query(query, { type: QueryTypes.INSERT })
        req.flash('success', 'Register success!')
        res.redirect('/')
    })
}

function loginView(req, res) {
    res.render('login')
}

async function login(req, res) {
    const { email, password } = req.body
    const query = `SELECT * FROM registers WHERE email='${email}'`
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })

    if (!obj.length) {
        console.error('user not registered!')
        req.flash('danger', 'Login failed : email or password is wrong!')
        return res.redirect('/login')
    }

    bcrypt.compare(password, obj[0].password, (err, result) => {
        if (err) {
            return console.error("Login : Internal Server Error!")
        }

        if (!result) {
            console.error('password wrong')
            req.flash('danger', 'Login failed : email or password is wrong!')
            return res.redirect('/login')
        }

        req.session.isLogin = true
        req.session.user = {
            name: obj[0].name,
            email: obj[0].email
        }
        req.flash('success', 'Login success!')
        res.redirect('/')
    })
}

app.listen(port, () => {
    console.log(`server berjalan di port ${port}`)
})