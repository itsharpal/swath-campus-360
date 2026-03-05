import env from '#start/env'
import { defineConfig, transports } from '@adonisjs/mail'

const mailConfig = defineConfig({
  default: 'smtp',

  from: env.get('MAIL_FROM'),
  replyTo: env.get('MAIL_FROM'),

  mailers: {
    smtp: transports.smtp({
      service: 'gmail',
      auth: {
        type: 'login',
        user: env.get('SMTP_USERNAME'),
        pass: env.get('SMTP_PASSWORD'),
      },
    }),
  },
})

export default mailConfig
