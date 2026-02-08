const API_URL = "https://vt-turf.onrender.com";

document.addEventListener("DOMContentLoaded", function () {
    const durationSelect = document.getElementById("duration");
    const timeSelect = document.getElementById("time");

    const timeSlots = {
        1: [
            "6:00 AM - 7:00 AM", "7:00 AM - 8:00 AM", "8:00 AM - 9:00 AM", "9:00 AM - 10:00 AM",
            "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM", "12:00 PM - 1:00 PM", "1:00 PM - 2:00 PM",
            "2:00 PM - 3:00 PM", "3:00 PM - 4:00 PM", "4:00 PM - 5:00 PM", "5:00 PM - 6:00 PM",
            "6:00 PM - 7:00 PM", "7:00 PM - 8:00 PM", "8:00 PM - 9:00 PM", "9:00 PM - 10:00 PM"
        ]
    };

    function updateTimeSlots() {
        const duration = parseInt(durationSelect.value);
        timeSelect.innerHTML = "";

        timeSlots[duration].forEach(slot => {
            const option = document.createElement("option");
            option.value = slot;
            option.textContent = slot;
            timeSelect.appendChild(option);
        });
    }

    durationSelect.addEventListener("change", updateTimeSlots);
        updateTimeSlots();
});

document.addEventListener("DOMContentLoaded", function () {
    const durationSelect = document.getElementById("duration");
    const sportSelect = document.getElementById("sport");
    const playersInput = document.getElementById("players");
    const priceInput = document.getElementById("price");

    const pricing = {
        cricket: {
            1: [2000, 4000, 6000, 8000],
            2: [4000, 8000, 12000, 16000],
            3: [6000, 12000, 24000, 32000]
        },
        football: {
            1: [3000, 6000, 9000, 12000],
            2: [6000, 12000, 18000, 24000],
            3: [9000, 18000, 27000, 36000]
        },
        tennis: {
            1: [1500, 2500, 3500, 4500],
            2: [3000, 5000, 7000, 9000],
            3: [4500, 7500, 10500, 13500]
        }
    };

    function calculatePrice() {
        const duration = parseInt(durationSelect.value);
        const sport = sportSelect.value;
        const players = parseInt(playersInput.value);
        let price = 0;

        if (players >= 1 && players <= 5) {
            price = pricing[sport][duration][0];
        } else if (players >= 6 && players <= 11) {
            price = pricing[sport][duration][1];
        } else if (players >= 12 && players <= 16) {
            price = pricing[sport][duration][2];
        } else if (players >= 17 && players <= 22) {
            price = pricing[sport][duration][3];
        }

        priceInput.value = `₹${price}`;
    }

    durationSelect.addEventListener("change", calculatePrice);
    sportSelect.addEventListener("change", calculatePrice);
    playersInput.addEventListener("input", calculatePrice);

    
    calculatePrice();
});

document.querySelectorAll('a.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.hash !== "") {
            e.preventDefault();
            const target = document.querySelector(this.hash);

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    function updatePricing(sport, players, hours, price) {
        document.getElementById(`${sport}-${players}-${hours}`).textContent = price;
    }
});

function updatePlayerLimit() {
    const sport = document.getElementById("sport").value;
    const playersInput = document.getElementById("players");

    if (sport === "tennis") {
        playersInput.max = 8;
        
    } else {
        playersInput.max = 22;
    }
}

document.getElementById('turf-booking-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const turfId = urlParams.get('id');

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;
    const timeSlot = document.getElementById('time').value;
    const sport = document.getElementById('sport').value;
    const players = document.getElementById('players').value;
    const price = document.getElementById('price').value;

    if (!name || !date || !timeSlot || !sport || !players || !price || !email) {
        return Swal.fire('Please fill in all the required fields.');
    }

    const result = await Swal.fire({
        icon: 'question',
        title: 'Confirm Booking Details',
        html: `<p>Name: ${name}</p><p>Date: ${date}</p><p>Time Slot: ${timeSlot}</p><p>Sport: ${sport}</p><p>Players: ${players}</p><p>Price: ${price}</p>`,
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        width: '50%',
        customClass: {
            popup: 'swal-responsive'
        }
    });

    if (result.isConfirmed) {
        try {
            const response = await fetch(`${API_URL}/api/turf/${turfId}/book`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, date, timeSlot, playerCount: players, sport, price })
            });

            if (response.ok) {
                await Swal.fire({
                    title: 'Booking Confirmed!',
                    text: 'Your booking was successful.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    width: '50%',
                    customClass: {
                        popup: 'swal-responsive'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        const { jsPDF } = window.jspdf;
                        const doc = new jsPDF();
                        const turfImage = document.getElementById('turfImage');
                        const turfName = document.getElementById('turfName').textContent;
                        const turfLocation = document.getElementById('turfLocation').textContent;
                        
                        doc.addImage(turfImage.src, 'JPEG', 10, 10, 180, 100);
                        doc.setFontSize(20);
                        doc.setTextColor(0, 102, 204);
                        doc.setFont("helvetica", "bold");
                        doc.text('Booking Confirmation', 10, 120);
                        
                        doc.setFontSize(12);
                        doc.setTextColor(0, 0, 0); 
                        doc.setFont("helvetica", "normal");
                        
                        const details = [
                            `Name: ${name}`,
                            `Email: ${email}`,
                            `Date: ${date}`,
                            `Time Slot: ${timeSlot}`,
                            `Sport: ${sport}`,
                            `Players: ${players}`,
                            `Estimated Price: ₹${price}`,
                            `Turf: ${turfName}`,
                            `Location: ${turfLocation}`
                        ];
                        
                        let yPosition = 140;
                        details.forEach((detail) => {
                            doc.text(detail, 10, yPosition);
                            yPosition += 10;
                        });
                        
                        const qrText = `Booking Details: \nName: ${name}\nEmail: ${email}\nDate: ${date}\nTime Slot: ${timeSlot}\nSport: ${sport}\nPlayers: ${players}\nPrice: ₹${price}\nTurf: ${turfName}\nLocation: ${turfLocation}`;
                        const qrCodeCanvas = document.createElement('canvas');
                        QRCode.toCanvas(qrCodeCanvas, qrText, function (error) {
                            if (error) {
                                console.error(error);
                            } else {
                                const qrCodeImage = qrCodeCanvas.toDataURL('image/png');
                                doc.addImage(qrCodeImage, 'PNG', 140, 140, 40, 40);
                            }
                        });
                        doc.setFontSize(10);
                        doc.setTextColor(150);
                        doc.text('Thank you for booking with us!', 10, yPosition + 10);
                        doc.save(`Booking_Confirmation_${name}.pdf`);
                        
                        window.location.href = "landingpage.html";
                    }
                });
            } else if (response.status === 409) {
                const data = await response.json();
                Swal.fire({
                    icon: 'warning',
                    title: 'Time Slot Unavailable',
                    text: `This slot is already booked. ${data.message || 'Please select another time.'}`,
                    confirmButtonText: 'OK',
                    width: '50%',
                    padding: '1rem',
                    customClass: {
                        popup: 'swal-responsive'
                    }
                });
            } else {
                Swal.fire('Error', 'Failed to confirm booking. Try again.', 'error');
            }
        } catch (error) {
            console.error('Error during booking confirmation:', error);
        }
    }
});
document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const turfId = urlParams.get('id');

    if (turfId) {
        try {
            const response = await fetch(`${API_URL}/api/turf/${turfId}`);
            const turf = await response.json();
            document.getElementById('turfImage').src = turf.image;
            document.getElementById('turfImage').alt = turf.name;
            document.getElementById('turfName').textContent = turf.name;
            document.getElementById('turfLocation').textContent = turf.location;
        } catch (error) {
            console.error('Failed to load turf details:', error);
        }
    }
});

