document.addEventListener('DOMContentLoaded', () => {
    const bookingDetailsDiv = document.getElementById('booking-details');

    const flightDetails = JSON.parse(sessionStorage.getItem('flightDetails')) || null;
    const selectedSeats = JSON.parse(sessionStorage.getItem('selectedSeats')) || null;

    if (!flightDetails || !selectedSeats) {
        alert('Booking information incomplete. Redirecting to home.');
        window.location.href = 'index.html';
        return;
    }

    const detailsHTML = `
        <p><strong>From:</strong> ${flightDetails.from}</p>
        <p><strong>To:</strong> ${flightDetails.to}</p>
        <p><strong>Date:</strong> ${flightDetails.date}</p>
        <p><strong>Passengers:</strong> ${flightDetails.passengers}</p>
        <p><strong>Selected Seat(s):</strong> ${selectedSeats.join(', ')}</p>
    `;

    bookingDetailsDiv.innerHTML = detailsHTML;
});
