const DOCTORS = [
  {
    id: 'doc-001',
    name: 'Dr. Sarah Jenkins',
    specialty: 'Cardiologist',
    qualifications: 'MD, FACC - Harvard Medical School',
    experience: 14,
    rating: 4.9,
    reviews: 128,
    fee: 150,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    clinic: 'Heart & Vascular Pavilion, Suite 402',
    availableToday: true
  },
  {
    id: 'doc-002',
    name: 'Dr. Marcus Vance',
    specialty: 'Dermatologist',
    qualifications: 'MD, FAAD - Johns Hopkins Medicine',
    experience: 11,
    rating: 4.8,
    reviews: 94,
    fee: 120,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
    clinic: 'ClearSkin Specialty Clinic',
    availableToday: true
  },
  {
    id: 'doc-003',
    name: 'Dr. Elena Rostova',
    specialty: 'Neurologist',
    qualifications: 'MD, PhD - Stanford Medicine',
    experience: 16,
    rating: 4.95,
    reviews: 162,
    fee: 180,
    avatar: 'https://images.unsplash.com/photo-1594824813511-1406e127cc48?auto=format&fit=crop&q=80&w=300',
    clinic: 'Neurological Sciences Institute',
    availableToday: false
  },
  {
    id: 'doc-004',
    name: 'Dr. Michael Chen',
    specialty: 'Pediatrician',
    qualifications: 'MD, FAAP - Columbia University',
    experience: 9,
    rating: 4.85,
    reviews: 210,
    fee: 95,
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300',
    clinic: 'Happy Sprouts Pediatric Care',
    availableToday: true
  },
  {
    id: 'doc-005',
    name: 'Dr. Priya Patel',
    specialty: 'General Physician',
    qualifications: 'MBBS, MD - Yale School of Medicine',
    experience: 12,
    rating: 4.9,
    reviews: 340,
    fee: 80,
    avatar: 'https://images.unsplash.com/photo-1559839734-70e1762c2f2c?auto=format&fit=crop&q=80&w=300',
    clinic: 'Family Wellness Clinic',
    availableToday: true
  },
  {
    id: 'doc-006',
    name: 'Dr. David Miller',
    specialty: 'Orthopedic',
    qualifications: 'MD, FAAOS - Duke University',
    experience: 15,
    rating: 4.75,
    reviews: 115,
    fee: 160,
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300',
    clinic: 'Summit Orthopedic & Sports Medicine',
    availableToday: false
  }
];

const SPECIALTIES = ['All Specialties', 'Cardiologist', 'Dermatologist', 'Neurologist', 'Pediatrician', 'General Physician', 'Orthopedic'];

let state = {
  role: 'patient',
  activeView: 'view-patient-dashboard',
  selectedSpecialty: 'All Specialties',
  appointmentTab: 'upcoming',
  selectedDoctorForBooking: null,
  appointments: JSON.parse(localStorage.getItem('mc_appointments') || 'null') || [
    {
      id: 'APT-8421',
      doctorName: 'Dr. Sarah Jenkins',
      doctorSpecialty: 'Cardiologist',
      doctorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
      patientName: 'Alex Morgan',
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      time: '10:00 AM',
      type: 'in-person',
      status: 'upcoming',
      fee: 150,
      reason: 'Routine cardiovascular checkup and ECG review'
    },
    {
      id: 'APT-6520',
      doctorName: 'Dr. Priya Patel',
      doctorSpecialty: 'General Physician',
      doctorAvatar: 'https://images.unsplash.com/photo-1559839734-70e1762c2f2c?auto=format&fit=crop&q=80&w=300',
      patientName: 'Alex Morgan',
      date: '2026-08-20',
      time: '09:00 AM',
      type: 'in-person',
      status: 'completed',
      fee: 80,
      reason: 'Annual comprehensive wellness physical'
    },
    {
      id: 'APT-4281',
      doctorName: 'Dr. David Miller',
      doctorSpecialty: 'Orthopedic',
      doctorAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300',
      patientName: 'Alex Morgan',
      date: '2026-07-15',
      time: '11:00 AM',
      type: 'in-person',
      status: 'cancelled',
      fee: 160,
      reason: 'Knee joint pain consultation'
    }
  ]
};

function saveAppointments() {
  localStorage.setItem('mc_appointments', JSON.stringify(state.appointments));
}

document.addEventListener('DOMContentLoaded', () => {
  renderNavigation();
  renderSpecialties();
  renderDoctors();
  renderPatientDashboard();
  renderAppointments();
  renderDoctorAgenda();
  lucide.createIcons();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateInput = document.getElementById('bookingDate');
  if (dateInput) dateInput.value = tomorrow.toISOString().split('T')[0];
});

function renderNavigation() {
  const container = document.getElementById('navContainer');
  if (!container) return;

  if (state.role === 'patient') {
    container.innerHTML = `
      <button onclick="switchView('view-patient-dashboard')" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${state.activeView === 'view-patient-dashboard' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-slate-100'}">
        <i data-lucide="layout-dashboard" class="w-4 h-4"></i> Dashboard
      </button>
      <button onclick="switchView('view-doctor-search')" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${state.activeView === 'view-doctor-search' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-slate-100'}">
        <i data-lucide="search" class="w-4 h-4"></i> Find Doctors
      </button>
      <button onclick="switchView('view-my-appointments')" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${state.activeView === 'view-my-appointments' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-slate-100'}">
        <i data-lucide="calendar-check" class="w-4 h-4"></i> My Appointments
      </button>
    `;
  } else {
    container.innerHTML = `
      <button onclick="switchView('view-doctor-dashboard')" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${state.activeView === 'view-doctor-dashboard' ? 'bg-teal-700 text-white' : 'text-slate-600 hover:bg-slate-100'}">
        <i data-lucide="layout-dashboard" class="w-4 h-4"></i> Doctor Dashboard
      </button>
      <button onclick="switchView('view-doctor-dashboard')" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100">
        <i data-lucide="calendar" class="w-4 h-4"></i> Practice Schedule
      </button>
      <button onclick="switchView('view-doctor-dashboard')" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100">
        <i data-lucide="clock" class="w-4 h-4"></i> Patient Queue
      </button>
    `;
  }
  lucide.createIcons();
}

function switchView(viewId) {
  state.activeView = viewId;
  ['view-patient-dashboard', 'view-doctor-search', 'view-my-appointments', 'view-doctor-dashboard'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden', id !== viewId);
  });
  renderNavigation();
  renderPatientDashboard();
  renderAppointments();
}

function toggleRole() {
  if (state.role === 'patient') {
    state.role = 'doctor';
    state.activeView = 'view-doctor-dashboard';
    document.getElementById('sidebarRoleLabel').innerText = 'Doctor Portal';
    document.getElementById('sidebarUserName').innerText = 'Dr. Sarah Jenkins';
    document.getElementById('roleSwitchBtnText').innerText = 'Switch to Patient UI';
    document.getElementById('pageTitleBadge').innerText = 'Doctor Portal Active';
    document.getElementById('pageTitleBadge').className = 'text-xs font-semibold px-3 py-1 bg-teal-50 text-teal-800 border border-teal-200 rounded-full';
    document.getElementById('topUserName').innerText = 'Dr. Sarah Jenkins';
    document.getElementById('topUserRole').innerText = 'Cardiologist';
    document.getElementById('userAvatar').src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=120';
    showToast('Role Switched', 'Switched to Doctor practice view');
  } else {
    state.role = 'patient';
    state.activeView = 'view-patient-dashboard';
    document.getElementById('sidebarRoleLabel').innerText = 'Patient Portal';
    document.getElementById('sidebarUserName').innerText = 'Alex Morgan';
    document.getElementById('roleSwitchBtnText').innerText = 'Switch to Doctor UI';
    document.getElementById('pageTitleBadge').innerText = 'Patient Portal Active';
    document.getElementById('pageTitleBadge').className = 'text-xs font-semibold px-3 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded-full';
    document.getElementById('topUserName').innerText = 'Alex Morgan';
    document.getElementById('topUserRole').innerText = 'Patient';
    document.getElementById('userAvatar').src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120';
    showToast('Role Switched', 'Switched to Patient view');
  }
  switchView(state.activeView);
}

function autoFillPatientDemo() {
  if (state.role !== 'patient') toggleRole();
}

function autoFillDoctorDemo() {
  if (state.role !== 'doctor') toggleRole();
}

function renderSpecialties() {
  const container = document.getElementById('specialtyPills');
  if (!container) return;
  container.innerHTML = SPECIALTIES.map(s => `
    <button onclick="setSpecialty('${s}')" class="px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${state.selectedSpecialty === s ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
      ${s}
    </button>
  `).join('');
}

function setSpecialty(s) {
  state.selectedSpecialty = s;
  renderSpecialties();
  filterDoctors();
}

function filterDoctors() {
  const query = (document.getElementById('doctorSearchInput')?.value || '').toLowerCase();
  const filtered = DOCTORS.filter(doc => {
    const matchesSpec = state.selectedSpecialty === 'All Specialties' || doc.specialty === state.selectedSpecialty;
    const matchesQuery = !query || doc.name.toLowerCase().includes(query) || doc.specialty.toLowerCase().includes(query) || doc.clinic.toLowerCase().includes(query);
    return matchesSpec && matchesQuery;
  });
  renderDoctorCards(filtered);
}

function renderDoctors() {
  renderDoctorCards(DOCTORS);
}

function renderDoctorCards(list) {
  const grid = document.getElementById('doctorsGrid');
  if (!grid) return;

  grid.innerHTML = list.map(doc => `
    <div class="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-sky-300 transition-all">
      <div>
        <div class="flex items-start gap-3.5">
          <img src="${doc.avatar}" alt="${doc.name}" class="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100">
          <div class="min-w-0 flex-1">
            <div class="flex items-center justify-between">
              <h4 class="font-bold text-slate-900 text-sm truncate">${doc.name}</h4>
              ${doc.availableToday ? '<span class="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Available Today</span>' : ''}
            </div>
            <p class="text-xs font-semibold text-teal-600">${doc.specialty}</p>
            <p class="text-[11px] text-slate-400 truncate">${doc.qualifications}</p>
            <div class="flex items-center gap-2 mt-1.5 text-xs text-slate-600">
              <span class="text-amber-500 font-bold">★ ${doc.rating}</span>
              <span class="text-slate-300">•</span>
              <span>${doc.experience} yrs exp</span>
            </div>
          </div>
        </div>
        <div class="mt-3.5 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-1.5">
          <i data-lucide="map-pin" class="w-3.5 h-3.5 text-slate-400"></i>
          <span class="truncate">${doc.clinic}</span>
        </div>
      </div>
      <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span class="text-[10px] text-slate-400 block">Consultation Fee</span>
          <span class="text-base font-extrabold text-slate-900">$${doc.fee}</span>
        </div>
        <button onclick="openBookingModal('${doc.id}')" class="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center gap-1.5">
          <i data-lucide="calendar-plus" class="w-3.5 h-3.5"></i> Book Now
        </button>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

function renderPatientDashboard() {
  const upcoming = state.appointments.filter(a => a.status === 'upcoming');
  const completed = state.appointments.filter(a => a.status === 'completed');
  const cancelled = state.appointments.filter(a => a.status === 'cancelled');

  document.getElementById('statUpcoming').innerText = upcoming.length;
  document.getElementById('statCompleted').innerText = completed.length;
  document.getElementById('statCancelled').innerText = cancelled.length;

  const nextContainer = document.getElementById('nextAppointmentContainer');
  if (!nextContainer) return;

  const next = upcoming[0];
  if (!next) {
    nextContainer.innerHTML = `<div class="py-6 text-center text-xs text-slate-400">No upcoming appointments scheduled.</div>`;
    return;
  }

  nextContainer.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
      <div class="flex items-center gap-3.5">
        <img src="${next.doctorAvatar}" alt="${next.doctorName}" class="w-12 h-12 rounded-xl object-cover ring-2 ring-sky-500/20">
        <div>
          <h4 class="font-bold text-slate-800 text-sm">${next.doctorName}</h4>
          <p class="text-xs text-teal-600 font-semibold">${next.doctorSpecialty}</p>
          <p class="text-[11px] text-slate-500 mt-0.5">${next.reason}</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="text-right text-xs">
          <p class="font-bold text-slate-800">${next.date}</p>
          <p class="text-sky-600 font-semibold">${next.time}</p>
        </div>
        <button onclick="cancelAppointment('${next.id}')" class="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold text-xs border border-rose-200 rounded-xl">
          Cancel
        </button>
      </div>
    </div>
  `;
  lucide.createIcons();
}

function setAppointmentTab(tab) {
  state.appointmentTab = tab;
  ['upcoming', 'completed', 'cancelled'].forEach(t => {
    const btn = document.getElementById('tab-' + t);
    if (btn) {
      btn.className = (t === tab)
        ? 'px-4 py-1.5 rounded-xl text-xs font-semibold bg-white text-slate-900 shadow-xs'
        : 'px-4 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900';
    }
  });
  renderAppointments();
}

function renderAppointments() {
  const container = document.getElementById('appointmentsList');
  if (!container) return;

  const filtered = state.appointments.filter(a => a.status === state.appointmentTab);
  if (filtered.length === 0) {
    container.innerHTML = `<div class="col-span-2 py-10 text-center text-xs text-slate-400">No ${state.appointmentTab} appointments found.</div>`;
    return;
  }

  container.innerHTML = filtered.map(apt => `
    <div class="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
      <div class="flex items-center justify-between pb-2.5 border-b border-slate-100 text-xs">
        <span class="font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">${apt.id}</span>
        <span class="capitalize font-semibold text-xs ${apt.status === 'completed' ? 'text-emerald-600' : apt.status === 'cancelled' ? 'text-rose-600' : 'text-sky-600'}">${apt.status}</span>
      </div>
      <div class="flex items-start gap-3">
        <img src="${apt.doctorAvatar}" class="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100">
        <div>
          <h4 class="font-bold text-slate-900 text-sm">${apt.doctorName}</h4>
          <p class="text-xs text-teal-600 font-semibold">${apt.doctorSpecialty}</p>
          <p class="text-[11px] text-slate-500 mt-1">${apt.reason}</p>
        </div>
      </div>
      <div class="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between text-xs text-slate-700">
        <span>📅 ${apt.date}</span>
        <span>⏰ ${apt.time}</span>
        <span class="font-bold">$${apt.fee}</span>
      </div>
      ${apt.status === 'upcoming' ? `
        <div class="pt-2 flex justify-end">
          <button onclick="cancelAppointment('${apt.id}')" class="px-3 py-1.5 text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100">Cancel Appointment</button>
        </div>
      ` : ''}
    </div>
  `).join('');
}

function renderDoctorAgenda() {
  const container = document.getElementById('doctorAgendaList');
  if (!container) return;

  container.innerHTML = state.appointments.map(apt => `
    <div class="py-3.5 flex items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <span class="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">${apt.time}</span>
        <div>
          <h4 class="font-bold text-slate-900 text-xs">${apt.patientName} <span class="text-[10px] text-slate-400 font-normal">(${apt.id})</span></h4>
          <p class="text-xs text-slate-500">${apt.reason}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xs capitalize font-semibold ${apt.status === 'completed' ? 'text-emerald-600' : apt.status === 'cancelled' ? 'text-rose-600' : 'text-sky-600'}">${apt.status}</span>
        ${apt.status === 'upcoming' ? `
          <button onclick="completeAppointment('${apt.id}')" class="px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700">Complete</button>
        ` : ''}
      </div>
    </div>
  `).join('');
}

function openBookingModal(docId) {
  const doc = DOCTORS.find(d => d.id === docId);
  if (!doc) return;
  state.selectedDoctorForBooking = doc;

  document.getElementById('modalDoctorDetails').innerHTML = `
    <img src="${doc.avatar}" class="w-10 h-10 rounded-xl object-cover">
    <div>
      <h4 class="font-bold text-slate-900 text-xs">${doc.name}</h4>
      <p class="text-[11px] text-teal-600">${doc.specialty} • $${doc.fee}</p>
    </div>
  `;
  document.getElementById('modalFee').innerText = `$${doc.fee}.00`;
  const modal = document.getElementById('bookingModal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function confirmBooking(e) {
  e.preventDefault();
  const doc = state.selectedDoctorForBooking;
  if (!doc) return;

  const date = document.getElementById('bookingDate').value;
  const time = document.getElementById('bookingTime').value;
  const reason = document.getElementById('bookingReason').value;
  const type = document.querySelector('input[name="modalType"]:checked').value;

  const newApt = {
    id: 'APT-' + Math.floor(1000 + Math.random() * 9000),
    doctorName: doc.name,
    doctorSpecialty: doc.specialty,
    doctorAvatar: doc.avatar,
    patientName: 'Alex Morgan',
    date,
    time,
    type,
    status: 'upcoming',
    fee: doc.fee,
    reason
  };

  state.appointments.unshift(newApt);
  saveAppointments();
  closeBookingModal();
  renderPatientDashboard();
  renderAppointments();
  renderDoctorAgenda();
  showToast('Booking Confirmed!', `Appointment scheduled with ${doc.name} on ${date} at ${time}`);
}

function cancelAppointment(id) {
  if (!confirm('Are you sure you want to cancel this appointment?')) return;
  state.appointments = state.appointments.map(a => a.id === id ? { ...a, status: 'cancelled' } : a);
  saveAppointments();
  renderPatientDashboard();
  renderAppointments();
  renderDoctorAgenda();
  showToast('Cancelled', 'Your appointment has been cancelled.');
}

function completeAppointment(id) {
  state.appointments = state.appointments.map(a => a.id === id ? { ...a, status: 'completed' } : a);
  saveAppointments();
  renderPatientDashboard();
  renderAppointments();
  renderDoctorAgenda();
  showToast('Completed', 'Patient consultation marked as completed.');
}

function showToast(title, msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'bg-slate-900 text-white p-3.5 rounded-2xl shadow-xl text-xs max-w-sm flex items-start gap-2.5 transition-all duration-300 pointer-events-auto';
  toast.innerHTML = `
    <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i>
    <div>
      <h5 class="font-bold">${title}</h5>
      <p class="text-[11px] text-slate-300 mt-0.5">${msg}</p>
    </div>
  `;
  container.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}