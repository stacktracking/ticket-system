// Change this if your backend runs somewhere other than localhost:5000
const API_BASE = 'http://localhost:5000/api';

function getToken() {
  return localStorage.getItem('token');
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch (e) {
    return null;
  }
}

function isLoggedIn() {
  return !!getToken();
}

function setSession(token, user) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}
window.logout = logout;

// Toggle guest-nav / user-nav based on login state. Every page's navbar
// should have <div id="guest-nav"> and <div id="user-nav" class="d-none">.
function updateNav() {
  const guestNav = document.getElementById('guest-nav');
  const userNav = document.getElementById('user-nav');
  if (!guestNav || !userNav) return;

  if (isLoggedIn()) {
    guestNav.classList.add('d-none');
    userNav.classList.remove('d-none');
  } else {
    guestNav.classList.remove('d-none');
    userNav.classList.add('d-none');
  }
}

// Called by bus.html / train.html / plane.html once the user picks seats.
// data shape: { transportType, route: {from, to}, date, seats: [...], totalPrice }
async function bookTicket(data) {
  if (!isLoggedIn()) {
    alert('Please log in to complete your booking.');
    window.location.href = 'login.html';
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (res.ok) {
      localStorage.setItem('lastBooking', JSON.stringify(result.booking));
      window.location.href = 'confirm.html';
    } else {
      alert(result.error || 'Booking failed, please try again.');
    }
  } catch (err) {
    console.error('Booking error:', err);
    alert('Could not reach the server. Make sure the backend is running.');
  }
}
window.bookTicket = bookTicket;

// Called by profile.html on load.
async function loadProfile() {
  const user = getUser();
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  const nameEl = document.getElementById('userName');
  const emailEl = document.getElementById('userEmail');
  if (nameEl) nameEl.textContent = user.name;
  if (emailEl) emailEl.textContent = user.email;

  const list = document.getElementById('bookingList');
  if (!list) return;

  try {
    const res = await fetch(`${API_BASE}/bookings/my`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });

    if (res.status === 401) {
      logout();
      return;
    }

    const bookings = await res.json();
    list.innerHTML = '';

    if (!bookings.length) {
      list.innerHTML =
        '<div class="col-12 text-center text-muted py-5">No bookings yet. Go book a ticket!</div>';
      return;
    }

    bookings.forEach((b) => {
      const dateStr = b.date || 'N/A';
      const fromTo = b.route ? `${b.route.from || ''} → ${b.route.to || ''}` : '';
      list.innerHTML += `
        <div class="col-md-6">
          <div class="card booking-card p-3 h-100">
            <h5 class="mb-1">${b.transportType} ${fromTo ? '· ' + fromTo : ''}</h5>
            <p class="mb-1 text-muted">Date: ${dateStr}</p>
            <p class="mb-1">Seats: ${b.seats.join(', ')}</p>
            <p class="mb-0 fw-bold">Total: ৳${b.totalPrice}</p>
          </div>
        </div>`;
    });
  } catch (err) {
    console.error('Profile load error:', err);
    list.innerHTML =
      '<div class="col-12 text-center text-danger py-5">Could not load bookings.</div>';
  }
}
window.loadProfile = loadProfile;

document.addEventListener('DOMContentLoaded', updateNav);
