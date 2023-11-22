const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
    res.send('hello Eza')
})
app.get('/home', (req, res) => {
    res.send('how are you today')
})

// buat json di server sendiri
app.get('/testimonial', (req, res) => {
    res.json([
        {
            author: "Rezha Akbar Pradana",
            content: "Tutornya baik, dijelasin secara rinci. keren banget",
            image: "https://images.pexels.com/photos/3754285/pexels-photo-3754285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            rating: 5
        },
        {
            author: "Novri",
            content: "good. penjelasan mudah dipahami",
            image: "https://images.pexels.com/photos/3754285/pexels-photo-3754285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            rating: 5
        },
        {
            author: "Denis",
            content: "penjelasannya kurang, terlalu cepat dan singkat",
            image: "https://images.pexels.com/photos/3468827/pexels-photo-3468827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            rating: 1
        },
        {
            author: "Febry",
            content: "Oke deh!",
            image: "https://images.pexels.com/photos/3468827/pexels-photo-3468827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            rating: 4
        }
    ])
})

app.listen(port, () => {
    console.log(`server berjalan di port ${port}`)
})