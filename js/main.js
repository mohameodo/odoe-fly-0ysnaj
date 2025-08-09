document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('flight-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const from = form.from.value;
        const to = form.to.value;
        const date = form.date.value;
        const passengers = parseInt(form.passengers.value, 10);

        if (from === to) {
            alert('Departure and destination cannot be the same.');
            return;
        }

        // Save flight details to sessionStorage for next page
        const flightDetails = { from, to, date, passengers };
        sessionStorage.setItem('flightDetails', JSON.stringify(flightDetails));

        // Redirect to seat selection page
        window.location.href = 'seat-selection.html';
    });
});
