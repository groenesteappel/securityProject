const express = require('express');
const feedRoutes = require('./routes/feedRoutes');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser'); // Add this line
app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

// Register routes
app.use('/api', feedRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
