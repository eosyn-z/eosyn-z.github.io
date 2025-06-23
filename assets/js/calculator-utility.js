// Minimal Calculator implementation
(function() {
  const container = document.getElementById('calculator-container');
  if (!container) return;
  container.innerHTML = `
    <div class="calc-wrapper" style="display:grid;gap:1rem;justify-items:center;">
      <input id="calc-display" class="glass-input" style="width:220px;text-align:right;font-size:1.5rem;" readonly />
      <div class="calc-buttons" style="display:grid;grid-template-columns:repeat(4,50px);gap:0.5rem;">
        <button class="glass-button" data-val="7">7</button>
        <button class="glass-button" data-val="8">8</button>
        <button class="glass-button" data-val="9">9</button>
        <button class="glass-button" data-val="/">&divide;</button>
        <button class="glass-button" data-val="4">4</button>
        <button class="glass-button" data-val="5">5</button>
        <button class="glass-button" data-val="6">6</button>
        <button class="glass-button" data-val="*">&times;</button>
        <button class="glass-button" data-val="1">1</button>
        <button class="glass-button" data-val="2">2</button>
        <button class="glass-button" data-val="3">3</button>
        <button class="glass-button" data-val="-">&minus;</button>
        <button class="glass-button" data-val="0">0</button>
        <button class="glass-button" data-val=".">.</button>
        <button class="glass-button" data-val="C">C</button>
        <button class="glass-button" data-val="+">+</button>
        <button class="glass-button" data-val="=">=</button>
      </div>
    </div>
  `;
  const display = container.querySelector('#calc-display');
  let expr = '';
  container.querySelectorAll('.glass-button').forEach(btn => {
    btn.onclick = () => {
      const val = btn.getAttribute('data-val');
      if (val === 'C') {
        expr = '';
        display.value = '';
      } else if (val === '=') {
        try {
          display.value = eval(expr);
          expr = display.value;
        } catch {
          display.value = 'Error';
          expr = '';
        }
      } else {
        expr += val;
        display.value = expr;
      }
    };
  });
})(); 