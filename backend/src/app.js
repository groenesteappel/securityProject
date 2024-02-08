const express = require('express');
const feedRoutes = require('./routes/feedRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Register routes
app.use('/api', feedRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
