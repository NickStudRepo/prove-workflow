const display = document.getElementById('display');
const expressionEl = document.getElementById('expression');

let left = '';
let operator = '';
let right = '';
let state = 'LEFT'; // LEFT | OPERATOR | RIGHT | RESULT

function updateDisplay() {
  display.classList.remove('error');

  if (state === 'LEFT') {
    expressionEl.textContent = '';
    display.textContent = left || '0';
  } else if (state === 'OPERATOR') {
    expressionEl.textContent = left + ' ' + operator;
    display.textContent = left;
  } else if (state === 'RIGHT') {
    expressionEl.textContent = left + ' ' + operator + ' ' + right;
    display.textContent = right || '0';
  }
}

function clear() {
  left = '';
  operator = '';
  right = '';
  state = 'LEFT';
  display.classList.remove('error');
  expressionEl.textContent = '';
  display.textContent = '0';
}

function handleDigit(digit) {
  if (state === 'RESULT') {
    left = '';
    state = 'LEFT';
  }

  if (state === 'LEFT') {
    if (digit === '.' && left.includes('.')) return;
    left += digit;
  } else if (state === 'OPERATOR') {
    state = 'RIGHT';
    if (digit === '.' && right.includes('.')) return;
    right += digit;
  } else {
    if (digit === '.' && right.includes('.')) return;
    right += digit;
  }
  updateDisplay();
}

function handleOperator(op) {
  if (left === '') return;
  if (state === 'RESULT') {
    state = 'OPERATOR';
  }
  operator = op;
  state = 'OPERATOR';
  updateDisplay();
}

async function handleEquals() {
  if (state !== 'RIGHT' || right === '') return;

  const fullExpression = left + ' ' + operator + ' ' + right;

  const res = await fetch('/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      left: parseFloat(left),
      operator: operator,
      right: parseFloat(right),
    }),
  });

  const data = await res.json();

  if (res.ok) {
    expressionEl.textContent = fullExpression + ' =';
    display.textContent = data.result;
    left = String(data.result);
    operator = '';
    right = '';
    state = 'RESULT';
  } else {
    expressionEl.textContent = fullExpression;
    display.textContent = data.error || 'Error';
    display.classList.add('error');
    left = '';
    operator = '';
    right = '';
    state = 'LEFT';
  }
}

// Button clicks
document.querySelector('.buttons').addEventListener('click', (e) => {
  const btn = e.target;
  if (btn.dataset.digit !== undefined) {
    handleDigit(btn.dataset.digit);
  } else if (btn.dataset.operator) {
    handleOperator(btn.dataset.operator);
  } else if (btn.dataset.action === 'equals') {
    handleEquals();
  } else if (btn.dataset.action === 'clear') {
    clear();
  }
});

// Keyboard input
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9' || e.key === '.') {
    handleDigit(e.key);
  } else if (['+', '-', '*', '/'].includes(e.key)) {
    handleOperator(e.key);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    handleEquals();
  } else if (e.key === 'Escape' || e.key === 'c') {
    clear();
  }
});
