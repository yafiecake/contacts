module.exports = (app, db) => {
  app.get('/api/contacts', async (req, res) => {
    const contacts = await db.contacts.findAll()
    res.json(contacts)
  })

  app.get('/api/contacts/:id', async (req, res) => {
    const contactId = req.params.id
    if (!Number.isInteger(parseInt(contactId))) {
      res.status(404).json({ error: 'not found' })
    }
    try {
      const contact = await db.contacts.findByPk(contactId)
      if (!contact) {
        res.status(404).json({ error: 'not found' })
      }
      res.json(contact)
    } catch (err) {
      res.json(err)
    }
  })

  // Create new contact
  app.post('/api/contacts', async (req, res) => {
    try {
      const {
        first_name,
        last_name,
        address,
        email_address,
        contact_number
      } = req.body
      const contact = await db.contacts.create({
        first_name,
        last_name,
        address,
        email_address,
        contact_number
      })
      res.status(201).json(contact)
    } catch (err) {
      res.status(422).json(err)
    }
  })

  // Update contact
  app.put('/api/contacts/:id', async (req, res) => {
    try {
      const contactId = req.params.id
      if (!Number.isInteger(parseInt(contactId))) {
        res.status(404).json({ error: 'not found' })
      }
      const contact = await db.contacts.findByPk(contactId)
      if (!contact) {
        res.status(404).json({ error: 'not found' })
      }
      const {
        first_name,
        last_name,
        address,
        email_address,
        contact_number
      } = req.body

      try {
        await db.contacts.update(
          {
            first_name,
            last_name,
            address,
            email_address,
            contact_number
          },
          { where: { id: req.params.id } }
        )
        const updated = await db.contacts.findByPk(req.params.id)
        res.json({ updated })
      } catch (error) {
        res.status(422).json(error)
      }
    } catch (err) {
      res.status(422).json(error)
    }
  })

  // Delete contact
  app.delete('/api/contacts/:id', async (req, res) => {
    try {
      const contact = await db.contacts.findByPk(req.params.id)
      if (!contact) {
        res.status(404).json({ error: 'not found' })
      }

      await db.contacts.destroy({
        where: {
          id: req.params.id
        }
      })
      res.status(204).json({ contact })
    } catch (err) {
      res.status(402).json(err)
    }
  })
}
