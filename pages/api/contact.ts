import type { NextApiRequest, NextApiResponse } from 'next'
import mailgun from 'mailgun-js'

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY!,
  domain: process.env.MAILGUN_DOMAIN!
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body

    console.log('Received form submission:', { name, email, message })

    const data = {
      from: process.env.MAILGUN_FROM || '',
      to: process.env.CONTACT_EMAIL || '',
      subject: `New contact form submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    }

    try {
      console.log('Attempting to send email...')
      const response = await mg.messages().send(data)
      console.log('Email sent successfully:', response)
      res.status(200).json({ message: 'Email sent successfully' })
    } catch (error) {
      console.error('Error sending email:', error)
      res.status(500).json({ 
        message: 'Error sending email', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
