const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/companies', db.getCompanies)
app.get('/company/:id', db.getCompanyById)
app.post('/company', db.createCompany)
app.put('/company/:id', db.updateCompany)
app.delete('/company/:id', db.deleteCompany)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})