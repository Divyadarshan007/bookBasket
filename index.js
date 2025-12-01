import express from 'express'
import Book from './models/bookModels.js';
import connectDb from './config/db.js';

const app = express()
const PORT = 3000;
connectDb()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    const bookData = await Book.find()

    return res.render('index', {
        bookData
    });
})
app.post('/add-book', async (req, res) => {
    const newBook = new Book(req.body)
    await newBook.save()
    return res.redirect('/')
})

app.get('/edit-book/:editId', async (req, res) => {
    const { editId } = req.params

    const thatOneData = await Book.findById(editId)
    console.log(thatOneData);

    return res.render('edit', {
        thatOneData
    })

})
app.post('/edit-book/:editId', async (req, res) => {
    const { editId } = req.params

    await Book.findByIdAndUpdate(editId, req.body)
    return res.redirect('/')

})

app.get('/delete-book/:deleteId', async (req, res) => {
    const { deleteId } = req.params
    await Book.findByIdAndDelete(deleteId)
    return res.redirect('/')
})

app.listen(PORT, () => { })