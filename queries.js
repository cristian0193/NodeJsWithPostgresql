const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'configurations',
    password: 'admin123',
    port: 5432,
})

const getCompanies = (request, response) => {
    pool.query('SELECT * FROM company ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getCompanyById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM company WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createCompany = (request, response) => {
    const { name, sector } = request.body

    pool.query('INSERT INTO company (name, sector) VALUES ($1, $2)', [name, sector], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Company added with Name: ${name}`)
    })
}

const updateCompany = (request, response) => {

    const id = parseInt(request.params.id)
    const { name, sector } = request.body

    pool.query(
        'UPDATE company SET name = $1, sector = $2 WHERE id = $3', [name, sector, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Company modified with ID: ${id}`)
        }
    )
}

const deleteCompany = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM company WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Company deleted with ID: ${id}`)
    })
}

module.exports = {
    getCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany
}