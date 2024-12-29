const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const year = document.getElementById('year');
const loading = document.getElementById('loading');
const confettiContainer = document.getElementById('confetti-container');

const currentYear = new Date().getFullYear();
const newYearTime = new Date(`January 1 ${currentYear + 1} 00:00:00`);
year.innerText = currentYear + 1;

// Función para iniciar el confeti
function startConfetti() {
  const colors = ['#ff0', '#f00', '#0f0', '#00f', '#f0f', '#0ff'];
  for (let i = 0; i < 200; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.animationDuration = Math.random() * 2 + 3 + 's';
    confetti.style.animationDelay = Math.random() * 2 + 's';
    confetti.style.setProperty('--rotate-start', Math.random() * 360 + 'deg');
    confetti.style.setProperty('--rotate-end', Math.random() * 360 + 360 + 'deg');
    confettiContainer.appendChild(confetti);
  }

  // Elimina el confeti después de 5 segundos
  setTimeout(() => {
    confettiContainer.innerHTML = '';
  }, 5000);
}

// Llama al confeti al cargar la página
window.addEventListener('load', () => {
  startConfetti();
});

// Actualización del contador
function updateCountdown() {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;

  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor((diff / 1000 / 60 / 60) % 24);
  const m = Math.floor((diff / 1000 / 60) % 60);
  const s = Math.floor((diff / 1000) % 60);

  days.innerHTML = d;
  hours.innerHTML = h < 10 ? '0' + h : h;
  minutes.innerHTML = m < 10 ? '0' + m : m;
  seconds.innerHTML = s < 10 ? '0' + s : s;

  // Cuando llegue el Año Nuevo, detén el contador y muestra el confeti
  if (diff <= 0) {
    clearInterval(updateCountdown);
    countdown.innerHTML = "¡Feliz Año Nuevo!";
    startConfetti();
  }
}

// Muestra el contador después del spinner
setTimeout(() => {
  loading.style.display = 'none';
  countdown.style.display = 'flex';
}, 1000);

// Ejecuta el contador cada segundo
setInterval(updateCountdown, 1000);
