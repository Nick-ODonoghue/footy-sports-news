// Grab packages
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

// Set port
const PORT = process.env.PORT || 5555

const app = express()

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
