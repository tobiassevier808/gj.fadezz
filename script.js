// Global variables
let currentWeek = new Date();
let selectedDay = '';
let appointments = JSON.parse(localStorage.getItem('barberAppointments') || '[]');
let timeSlots = JSON.parse(localStorage.getItem('barberTimeSlots') || '{}');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'barber.html' || currentPage === '') {
        initBarberDashboard();
    } else {
        initCustomerBooking();
    }
});

// Customer booking functionality
function initCustomerBooking() {
    const servicesCheckboxes = document.querySelectorAll('input[name="services"]');
    const totalPriceElement = document.getElementById('totalPrice');
    const appointmentDateInput = document.getElementById('appointmentDate');
    const timeSlotSelect = document.getElementById('timeSlot');
    const bookingForm = document.getElementById('bookingForm');

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    appointmentDateInput.min = today;

    // Calculate total price when services change
    servicesCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotalPrice);
    });

    // Load available time slots when date changes
    appointmentDateInput.addEventListener('change', loadAvailableTimeSlots);

    // Handle form submission
    bookingForm.addEventListener('submit', handleBookingSubmission);

    // Initialize price calculation
    calculateTotalPrice();
}

function calculateTotalPrice() {
    const servicesCheckboxes = document.querySelectorAll('input[name="services"]:checked');
    const totalPriceElement = document.getElementById('totalPrice');
    let total = 0;

    servicesCheckboxes.forEach(checkbox => {
        const serviceItem = checkbox.closest('.service-item');
        serviceItem.classList.add('selected');
        total += parseInt(checkbox.dataset.price);
    });

    // Remove selected class from unchecked items
    document.querySelectorAll('input[name="services"]:not(:checked)').forEach(checkbox => {
        const serviceItem = checkbox.closest('.service-item');
        serviceItem.classList.remove('selected');
    });

    totalPriceElement.textContent = total;
}

function loadAvailableTimeSlots() {
    const appointmentDate = document.getElementById('appointmentDate').value;
    const timeSlotSelect = document.getElementById('timeSlot');
    
    if (!appointmentDate) return;

    const selectedDate = new Date(appointmentDate);
    const dayKey = getDayKey(selectedDate);
    
    // Clear existing options
    timeSlotSelect.innerHTML = '<option value="">Select a time slot</option>';

    // Get available slots for the selected day
    const daySlots = timeSlots[dayKey] || [];
    const dayAppointments = appointments.filter(apt => apt.date === appointmentDate);

    daySlots.forEach(slot => {
        const isBooked = dayAppointments.some(apt => apt.timeSlot === slot.time);
        if (!isBooked) {
            const option = document.createElement('option');
            option.value = slot.time;
            option.textContent = `${slot.time} (${slot.duration} min)`;
            timeSlotSelect.appendChild(option);
        }
    });

    if (timeSlotSelect.children.length === 1) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No available slots for this date';
        option.disabled = true;
        timeSlotSelect.appendChild(option);
    }
}

function handleBookingSubmission(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const services = Array.from(document.querySelectorAll('input[name="services"]:checked'))
        .map(cb => ({ name: cb.value, price: parseInt(cb.dataset.price) }));
    
    if (services.length === 0) {
        alert('Please select at least one service.');
        return;
    }

    const appointment = {
        id: Date.now().toString(),
        customerName: formData.get('customerName'),
        customerPhone: formData.get('customerPhone'),
        customerEmail: formData.get('customerEmail'),
        services: services,
        date: formData.get('appointmentDate'),
        timeSlot: formData.get('timeSlot'),
        totalPrice: services.reduce((sum, service) => sum + service.price, 0),
        status: 'scheduled',
        createdAt: new Date().toISOString()
    };

    // Save appointment
    appointments.push(appointment);
    localStorage.setItem('barberAppointments', JSON.stringify(appointments));

    // Show confirmation
    showConfirmationModal(appointment);
    
    // Reset form
    event.target.reset();
    calculateTotalPrice();
}

function showConfirmationModal(appointment) {
    const modal = document.getElementById('confirmationModal');
    const detailsDiv = document.getElementById('confirmationDetails');
    
    const servicesText = appointment.services.map(s => s.name).join(', ');
    
    detailsDiv.innerHTML = `
        <p><strong>Name:</strong> ${appointment.customerName}</p>
        <p><strong>Date:</strong> ${appointment.date}</p>
        <p><strong>Time:</strong> ${appointment.timeSlot}</p>
        <p><strong>Services:</strong> ${servicesText}</p>
        <p><strong>Total:</strong> $${appointment.totalPrice}</p>
        <p><strong>Phone:</strong> ${appointment.customerPhone}</p>
    `;
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('confirmationModal').style.display = 'none';
}

// Barber dashboard functionality
function initBarberDashboard() {
    updateWeekDisplay();
    renderScheduleGrid();
    loadTodayAppointments();
    loadUpcomingAppointments();
    
    // Week navigation
    document.getElementById('prevWeek').addEventListener('click', () => {
        currentWeek.setDate(currentWeek.getDate() - 7);
        updateWeekDisplay();
        renderScheduleGrid();
    });
    
    document.getElementById('nextWeek').addEventListener('click', () => {
        currentWeek.setDate(currentWeek.getDate() + 7);
        updateWeekDisplay();
        renderScheduleGrid();
    });

    // Add slot buttons
    document.querySelectorAll('.add-slot-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            selectedDay = e.target.dataset.day;
            showTimeSlotModal();
        });
    });

    // Time slot form
    document.getElementById('timeSlotForm').addEventListener('submit', handleTimeSlotSubmission);

    // Modal close handlers
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            e.target.closest('.modal').style.display = 'none';
        });
    });

    // Click outside modal to close
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

function updateWeekDisplay() {
    const weekStart = getWeekStart(currentWeek);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    const weekDisplay = document.getElementById('weekDisplay');
    weekDisplay.textContent = `${formatDate(weekStart)} - ${formatDate(weekEnd)}`;
}

function getWeekStart(date) {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(start.setDate(diff));
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getDayKey(date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function renderScheduleGrid() {
    const weekStart = getWeekStart(currentWeek);
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    days.forEach((day, index) => {
        const currentDate = new Date(weekStart);
        currentDate.setDate(currentDate.getDate() + index);
        const dayKey = getDayKey(currentDate);
        
        const slotsContainer = document.getElementById(`${day}-slots`);
        slotsContainer.innerHTML = '';
        
        const daySlots = timeSlots[dayKey] || [];
        const dayAppointments = appointments.filter(apt => apt.date === currentDate.toISOString().split('T')[0]);
        
        daySlots.forEach(slot => {
            const appointment = dayAppointments.find(apt => apt.timeSlot === slot.time);
            const slotElement = createTimeSlotElement(slot, appointment, currentDate.toISOString().split('T')[0]);
            slotsContainer.appendChild(slotElement);
        });
    });
}

function createTimeSlotElement(slot, appointment, date) {
    const slotDiv = document.createElement('div');
    slotDiv.className = `time-slot ${appointment ? 'booked' : 'available'}`;
    slotDiv.dataset.time = slot.time;
    slotDiv.dataset.date = date;
    
    if (appointment) {
        slotDiv.addEventListener('click', () => showAppointmentDetails(appointment));
    }
    
    slotDiv.innerHTML = `
        <span class="slot-time">${slot.time}</span>
        <span class="slot-status ${appointment ? 'booked' : 'available'}">
            ${appointment ? 'Booked' : 'Available'}
        </span>
    `;
    
    return slotDiv;
}

function showTimeSlotModal() {
    document.getElementById('timeSlotModal').style.display = 'block';
}

function closeTimeSlotModal() {
    document.getElementById('timeSlotModal').style.display = 'none';
    document.getElementById('timeSlotForm').reset();
}

function handleTimeSlotSubmission(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const time = formData.get('slotTime');
    const duration = formData.get('slotDuration');
    
    // Get the date for the selected day
    const weekStart = getWeekStart(currentWeek);
    const dayIndex = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].indexOf(selectedDay);
    const slotDate = new Date(weekStart);
    slotDate.setDate(slotDate.getDate() + dayIndex);
    
    const dayKey = getDayKey(slotDate);
    
    if (!timeSlots[dayKey]) {
        timeSlots[dayKey] = [];
    }
    
    // Check if slot already exists
    const existingSlot = timeSlots[dayKey].find(slot => slot.time === time);
    if (existingSlot) {
        alert('A time slot already exists at this time.');
        return;
    }
    
    timeSlots[dayKey].push({
        time: time,
        duration: parseInt(duration)
    });
    
    // Sort slots by time
    timeSlots[dayKey].sort((a, b) => a.time.localeCompare(b.time));
    
    localStorage.setItem('barberTimeSlots', JSON.stringify(timeSlots));
    
    closeTimeSlotModal();
    renderScheduleGrid();
}

function loadTodayAppointments() {
    const today = new Date().toISOString().split('T')[0];
    const todayAppointments = appointments.filter(apt => 
        apt.date === today && apt.status === 'scheduled'
    );
    
    const container = document.getElementById('todayAppointments');
    
    if (todayAppointments.length === 0) {
        container.innerHTML = '<p class="no-appointments">No appointments scheduled for today.</p>';
        return;
    }
    
    container.innerHTML = todayAppointments.map(apt => createAppointmentElement(apt)).join('');
}

function loadUpcomingAppointments() {
    const today = new Date().toISOString().split('T')[0];
    const upcomingAppointments = appointments.filter(apt => 
        apt.date > today && apt.status === 'scheduled'
    ).sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const container = document.getElementById('upcomingAppointments');
    
    if (upcomingAppointments.length === 0) {
        container.innerHTML = '<p class="no-appointments">No upcoming appointments.</p>';
        return;
    }
    
    container.innerHTML = upcomingAppointments.slice(0, 10).map(apt => createAppointmentElement(apt)).join('');
}

function createAppointmentElement(appointment) {
    const servicesText = appointment.services.map(s => s.name).join(', ');
    return `
        <div class="appointment-item" onclick="showAppointmentDetails('${appointment.id}')">
            <div class="appointment-time">${appointment.date} at ${appointment.timeSlot}</div>
            <div class="appointment-customer">${appointment.customerName}</div>
            <div class="appointment-services">${servicesText}</div>
            <div class="appointment-price">Total: $${appointment.totalPrice}</div>
        </div>
    `;
}

function showAppointmentDetails(appointmentId) {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (!appointment) return;
    
    const modal = document.getElementById('appointmentModal');
    const detailsDiv = document.getElementById('appointmentDetails');
    
    const servicesText = appointment.services.map(s => `${s.name} ($${s.price})`).join(', ');
    
    detailsDiv.innerHTML = `
        <p><strong>Customer:</strong> ${appointment.customerName}</p>
        <p><strong>Phone:</strong> ${appointment.customerPhone}</p>
        <p><strong>Email:</strong> ${appointment.customerEmail}</p>
        <p><strong>Date:</strong> ${appointment.date}</p>
        <p><strong>Time:</strong> ${appointment.timeSlot}</p>
        <p><strong>Services:</strong> ${servicesText}</p>
        <p><strong>Total:</strong> $${appointment.totalPrice}</p>
        <p><strong>Status:</strong> ${appointment.status}</p>
    `;
    
    // Set up action buttons
    const completeBtn = document.getElementById('completeAppointment');
    const cancelBtn = document.getElementById('cancelAppointment');
    
    completeBtn.onclick = () => completeAppointment(appointmentId);
    cancelBtn.onclick = () => cancelAppointment(appointmentId);
    
    modal.style.display = 'block';
}

function completeAppointment(appointmentId) {
    const appointmentIndex = appointments.findIndex(apt => apt.id === appointmentId);
    if (appointmentIndex !== -1) {
        appointments[appointmentIndex].status = 'completed';
        localStorage.setItem('barberAppointments', JSON.stringify(appointments));
        closeAppointmentModal();
        loadTodayAppointments();
        loadUpcomingAppointments();
        renderScheduleGrid();
    }
}

function cancelAppointment(appointmentId) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
        const appointmentIndex = appointments.findIndex(apt => apt.id === appointmentId);
        if (appointmentIndex !== -1) {
            appointments[appointmentIndex].status = 'cancelled';
            localStorage.setItem('barberAppointments', JSON.stringify(appointments));
            closeAppointmentModal();
            loadTodayAppointments();
            loadUpcomingAppointments();
            renderScheduleGrid();
        }
    }
}

function closeAppointmentModal() {
    document.getElementById('appointmentModal').style.display = 'none';
}

// Helper function to get day name from date
function getDayName(date) {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[date.getDay()];
}