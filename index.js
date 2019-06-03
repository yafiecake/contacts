const app = require('express')()
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')
const chalk = require('chalk')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const db = require('./db/models')

const contactAPi = require('./api/contact')

const PORT = process.env.PORT || 8000

app.use(cors())
app.use(logger('combined'))
app.use(bodyParser.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

contactAPi(app, db)

app.get('/', (req, res) => {
  res.json({
    hello: 'world'
  })
})

db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(chalk.green(`App running on port ${PORT}`))
    })    
  })
  .catch(() => {
    console.log(chalk.red('Unable to connect to database'))
  })

