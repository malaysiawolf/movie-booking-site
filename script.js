const halls = {
  hall1: generateSeats('A', 'J', 20),
  hall2: generateSeats('A', 'H', 30, { G: 26, H: [5, 26] }),
  hall11: generateSeats('A', 'H', 13, { A: 10 })
};

const hallSelect = document.getElementById('hallSelect');
const seatMap = document.getElementById('seatMap');
const bookBtn = document.getElementById('bookBtn');
let selected = null;

hallSelect.onchange = renderSeats;

function renderSeats() {
  selected = null;
  bookBtn.disabled = true;
  seatMap.innerHTML = '';
  const hall = halls[hallSelect.value];
  hall.forEach(s => {
    const btn = document.createElement('div');
    btn.innerText = s.id;
    btn.className = `seat ${s.couple ? 'couple' : 'single'}`;
    btn.onclick = () => {
      document.querySelectorAll('.seat').forEach(el => el.classList.remove('selected'));
      btn.classList.add('selected');
      selected = s.id;
      bookBtn.disabled = false;
    };
    seatMap.appendChild(btn);
  });
}
bookBtn.onclick = () => {
  window.location.href = `form.html?hall=${hallSelect.value}&seat=${selected}`;
};
renderSeats();

function generateSeats(startChar, endChar, maxSeats, exceptions = {}) {
  const seats = [];
  for (let c = startChar.charCodeAt(0); c <= endChar.charCodeAt(0); c++) {
    const row = String.fromCharCode(c);
   	const config = exceptions[row];
    let start = 1, end = maxSeats;
    if (config !== undefined) {
      if (Array.isArray(config)) [start, end] = config;
      else end = config;
    }
    for (let n = start; n <= end; n++) {
      seats.push({ id: row + n, couple: false });
    }
  }
  return seats;
}
