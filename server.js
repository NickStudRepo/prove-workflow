const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/calculate', (req, res) => {
  const { left, operator, right } = req.body;

  if (typeof left !== 'number' || !Number.isFinite(left) ||
      typeof right !== 'number' || !Number.isFinite(right)) {
    return res.status(400).json({ error: 'Left and right must be finite numbers' });
  }

  const ops = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  };

  if (!ops[operator]) {
    return res.status(400).json({ error: 'Invalid operator' });
  }

  if (operator === '/' && right === 0) {
    return res.status(400).json({ error: 'Division by zero' });
  }

  res.json({ result: ops[operator](left, right) });
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
