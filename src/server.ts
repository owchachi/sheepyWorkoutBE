import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { ErrorType } from '@type/enums'
import i18next from 'i18next'
import i18NextBackend from 'i18next-fs-backend'
import i18NextMiddleware from 'i18next-http-middleware'
import swaggerDocs from '@utils/swagger'
import { protect } from '@modules/auth'
import { privateRouter, publicRouter } from '@routes/index'

i18next
  .use(i18NextBackend)
  .use(i18NextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    ns: ['errors'],
    backend: {
      loadPath: './locales/{{lng}}/{{ns}}.json',
    },
  })

const app = express()

app.use(i18NextMiddleware.handle(i18next))
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', protect, privateRouter)
app.use(publicRouter)
swaggerDocs(app, parseInt(process.env.PORT))

app.use((err, req, res, next) => {
  if (err.type === ErrorType.PRISMA) {
    return res.status(400).json({ message: err.message })
  } else if (err.type === ErrorType.INPUT) {
    return res.status(400).json({ message: req.t('invalid_input') })
  } else if (err.type === ErrorType.ENTITY_PARSE_FAILED) {
    return res.status(400).json({ message: req.t('wrong_request_body_format') })
  } else {
    return res.status(500).json({ message: req.t('internal_server_error') })
  }
})
app.use(function (req, res) {
  res.status(404).json({ message: req.t('internal_server_error') })
})

export default app
