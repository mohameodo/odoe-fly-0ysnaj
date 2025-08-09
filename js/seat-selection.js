document.addEventListener('DOMContentLoaded', () => {
    const seatMapContainer = document.getElementById('seat-map');
    const flightSummary = document.getElementById('flight-summary');
    const confirmBtn = document.getElementById('confirm-btn');

    // Load flight details from sessionStorage
    const flightDetails = JSON.parse(sessionStorage.getItem('flightDetails')) || null;

    if (!flightDetails) {
        alert('No flight details found. Redirecting to home.');
        window.location.href = 'index.html';
        return;
    }

    // Display flight summary
    flightSummary.innerHTML = `<p><strong>From:</strong> ${flightDetails.from}</p><p><strong>To:</strong> ${flightDetails.to}</p><p><strong>Date:</strong> ${flightDetails.date}</p><p><strong>Passengers:</strong> ${flightDetails.passengers}</p>`;

    // Seat map configuration
    const rows = 10;
    const cols = 7; // 7 seats per row
    const totalSeats = rows * cols;

    // Randomly mark some seats as occupied
    const occupiedSeats = new Set();
    while (occupiedSeats.size < Math.floor(totalSeats * 0.15)) { // 15% seats occupied
        occupiedSeats.add(Math.floor(Math.random() * totalSeats));
    }

    // Track selected seats
    const selectedSeats = new Set();

    // Generate seat labels (A-G)
    const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    // Render seats
    for (let i = 0; i < totalSeats; i++) {
        const seat = document.createElement('div');
        seat.classList.add('seat');

        const row = Math.floor(i / cols) + 1;
        const col = i % cols;
        const seatLabel = `${row}${seatLetters[col]}`;

        seat.textContent = seatLabel;

        if (occupiedSeats.has(i)) {
            seat.classList.add('occupied');
        }

        seat.addEventListener('click', () => {
            if (seat.classList.contains('occupied')) return;

            if (seat.classList.contains('selected')) {
                seat.classList.remove('selected');
                selectedSeats.delete(seatLabel);
            } else {
                if (selectedSeats.size < flightDetails.passengers) {
                    seat.classList.add('selected');
                    selectedSeats.add(seatLabel);
                } else {
                    alert(`You can only select up to ${flightDetails.passengers} seat(s).`);
                }
            }
        });

        seatMapContainer.appendChild(seat);
    }

    // Confirm button handler
    confirmBtn.addEventListener('click', () => {
        if (selectedSeats.size !== flightDetails.passengers) {
            alert(`Please select exactly ${flightDetails.passengers} seat(s) before proceeding.`);
            return;
        }

        // Save selected seats
        sessionStorage.setItem('selectedSeats', JSON.stringify(Array.from(selectedSeats)));

        // Redirect to confirmation page
        window.location.href = 'confirmation.html';
    });
});
