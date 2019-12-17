import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { connectDB } from './connect-db'

const port = 3000
const app = express()

app.listen(port, console.log(`Server listening on http://localhost:${port}`))

// app.get('/', (req, res) => {
//     res.send("Hello world!")
// })

app.use(
    cors(),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json()
)

export const addNewTask = async task => {
    const db = await connectDB()
    let collection = db.collection('tasks')
    await collection.insertOne(task)
}

export const UpdateTask = async task => {
    const db = await connectDB()
    const { group, id, isComplete, name } = task
    let collection = db.collection('tasks')

    if (group) {
        await collection.updateOne({ id }, { $set: { group } })
    }

    if (name) {
        await collection.updateOne({ id }, { $set: { name } })
    }

    if (isComplete !== undefined) {
        await collection.updateOne({ id }, { $set: { isComplete } })
    }
}

app.post('/task/new', async (req, res) => {
    const task = req.body.task
    await addNewTask(task)
    res.status(200).send()
})

app.post('/task/update', async (req, res) => {
    const task = req.body.task
    await UpdateTask(task)
    res.status(200).send()
})