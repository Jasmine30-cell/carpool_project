/* =====================================================
   CHITKARA CARPOOL - DASHBOARD
===================================================== */


/* =====================================================
   CURRENT USER
===================================================== */

const currentUser =
    JSON.parse(
        localStorage.getItem("currentUser")
    );


/* =====================================================
   PAGE PROTECTION
===================================================== */

if (!currentUser) {

    window.location.href =
        "index.html";

}


/* =====================================================
   DOM
===================================================== */

const dashboardUserName =
    document.getElementById(
        "dashboardUserName"
    );

const profileAvatar =
    document.getElementById(
        "profileAvatar"
    );

const pickup =
    document.getElementById(
        "pickup"
    );

const destination =
    document.getElementById(
        "destination"
    );

const date =
    document.getElementById(
        "date"
    );

const rideContainer =
    document.getElementById(
        "rideContainer"
    );

const noResults =
    document.getElementById(
        "noResults"
    );

const resultCount =
    document.getElementById(
        "resultCount"
    );

const sortSelect =
    document.getElementById(
        "sortSelect"
    );



/* =====================================================
   USER
===================================================== */

const loggedUserName =
    currentUser?.name ||
    currentUser?.fullName ||
    "Student";


if (dashboardUserName) {

    dashboardUserName.textContent =
        loggedUserName;

}


if (profileAvatar) {

    profileAvatar.textContent =
        loggedUserName
            .charAt(0)
            .toUpperCase();

}



/* =====================================================
   RIDE DATA
===================================================== */

let allRides = [];


/* =====================================================
   GET RIDES FROM LOCAL STORAGE
===================================================== */

function getPostedRides() {

    try {

        const rides =
            JSON.parse(
                localStorage.getItem(
                    "postedRides"
                )
            );


        return Array.isArray(rides)
            ? rides
            : [];

    } catch {

        return [];

    }

}


/* =====================================================
   SAMPLE RIDES
   Used only if no rides have been posted yet.
===================================================== */

function getSampleRides() {

    return [

        {
            id: "sample1",

            driverName: "Aarav Sharma",

            driverEmail:
                "aarav@chitkara.edu.in",

            pickup:
                "Zirakpur",

            destination:
                "Chitkara University",

            date:
                getTomorrow(),

            time:
                "08:00",

            seats:
                3,

            seatsLeft:
                3,

            price:
                40,

            carModel:
                "Swift Dzire",

            carColor:
                "White",

            carNumber:
                "PB65AB1234",

            rating:
                4.8,

            reviews:
                24,

            notes:
                "Leaving from Zirakpur Bus Stand."

        },


        {
            id: "sample2",

            driverName: "Simran Kaur",

            driverEmail:
                "simran@chitkara.edu.in",

            pickup:
                "VIP Road",

            destination:
                "Chitkara University",

            date:
                getTomorrow(),

            time:
                "08:30",

            seats:
                2,

            seatsLeft:
                2,

            price:
                45,

            carModel:
                "Honda City",

            carColor:
                "Black",

            carNumber:
                "PB12CD4567",

            rating:
                4.9,

            reviews:
                31,

            notes:
                "Pickup near VIP Road."

        },


        {
            id: "sample3",

            driverName: "Rohan Verma",

            driverEmail:
                "rohan@chitkara.edu.in",

            pickup:
                "Mohali",

            destination:
                "Chitkara University",

            date:
                getTomorrow(),

            time:
                "07:45",

            seats:
                4,

            seatsLeft:
                4,

            price:
                35,

            carModel:
                "Hyundai i20",

            carColor:
                "Blue",

            carNumber:
                "PB65EF7890",

            rating:
                4.7,

            reviews:
                18,

            notes:
                "Morning ride to campus."

        }

    ];

}


/* =====================================================
   TOMORROW
===================================================== */

function getTomorrow() {

    const date =
        new Date();

    date.setDate(
        date.getDate() + 1
    );


    return date
        .toISOString()
        .split("T")[0];

}


/* =====================================================
   LOAD RIDES
===================================================== */

function loadRides() {

    const postedRides =
        getPostedRides();


    if (
        postedRides.length > 0
    ) {

        allRides =
            postedRides;

    } else {

        allRides =
            getSampleRides();

    }


    displayRides(
        allRides
    );

    loadUpcomingRide();

}


/* =====================================================
   DISPLAY RIDES
===================================================== */

function displayRides(
    rides
) {

    rideContainer.innerHTML =
        "";


    if (
        rides.length === 0
    ) {

        noResults.style.display =
            "block";

        resultCount.textContent =
            "No matching rides found.";

        return;

    }


    noResults.style.display =
        "none";


    resultCount.textContent =
        `Showing ${rides.length} available ride${
            rides.length === 1
                ? ""
                : "s"
        }`;


    rides.forEach(
        ride => {

            const card =
                createRideCard(
                    ride
                );


            rideContainer.appendChild(
                card
            );

        }
    );

}


/* =====================================================
   CREATE RIDE CARD
===================================================== */

function createRideCard(
    ride
) {

    const card =
        document.createElement(
            "div"
        );


    card.className =
        "ride-card";


    const initial =
        (
            ride.driverName ||
            "S"
        )
            .charAt(0)
            .toUpperCase();


    const rating =
        ride.rating ||
        4.8;


    const reviews =
        ride.reviews ||
        24;


    const seatsLeft =
        ride.seatsLeft ??
        ride.seats ??
        0;


    const price =
        ride.price ||
        0;


    card.innerHTML = `

        <div class="ride-driver">

            <div class="ride-avatar">
                ${initial}
            </div>

            <div class="ride-driver-info">

                <strong>
                    ${escapeHTML(
                        ride.driverName ||
                        "Chitkara Student"
                    )}
                </strong>

                <span>
                    ★ ${rating}
                    (${reviews} reviews)
                </span>

            </div>

            <div class="verified-small">
                ✓ Verified
            </div>

        </div>


        <div class="ride-route">

            <div class="route-location">

                <div class="route-dot pickup-dot">
                    ●
                </div>

                <div>

                    <small>
                        PICKUP
                    </small>

                    <strong>
                        ${escapeHTML(
                            ride.pickup ||
                            ride.pickupLocation ||
                            "Pickup"
                        )}
                    </strong>

                </div>

            </div>


            <div class="route-line-small"></div>


            <div class="route-location">

                <div class="route-dot destination-dot">
                    ●
                </div>

                <div>

                    <small>
                        DESTINATION
                    </small>

                    <strong>
                        ${escapeHTML(
                            ride.destination ||
                            ride.destinationLocation ||
                            "Chitkara University"
                        )}
                    </strong>

                </div>

            </div>

        </div>


        <div class="ride-meta">

            <span>
                ◷
                ${formatTime(
                    ride.time ||
                    ride.rideTime ||
                    "08:00"
                )}
            </span>

            <span>
                ◉
                ${seatsLeft} seats
            </span>

            <strong>
                ₹${price}
            </strong>

        </div>


        <div class="ride-card-footer">

            <div>

                <small>
                    ${formatDate(
                        ride.date ||
                        ride.rideDate
                    )}

                </small>

                <span>
                    ${escapeHTML(
                        ride.carModel ||
                        ride.carName ||
                        "Car"
                    )}
                    •
                    ${escapeHTML(
                        ride.carColor ||
                        "Car"
                    )}
                </span>

            </div>


            <button
                class="view-ride-button"
                onclick="viewRide('${ride.id}')"
            >
                View Ride →
            </button>

        </div>

    `;


    return card;

}


/* =====================================================
   SEARCH
===================================================== */

function searchRides() {

    const selectedPickup =
        pickup.value
            .trim()
            .toLowerCase();


    const selectedDestination =
        destination.value
            .trim()
            .toLowerCase();


    const selectedDate =
        date.value;


    let filtered =
        [...allRides];


    if (
        selectedPickup
    ) {

        filtered =
            filtered.filter(
                ride => {

                    const ridePickup =
                        (
                            ride.pickup ||
                            ride.pickupLocation ||
                            ""
                        )
                            .toLowerCase();


                    return ridePickup
                        .includes(
                            selectedPickup
                        );

                }
            );

    }


    if (
        selectedDestination
    ) {

        filtered =
            filtered.filter(
                ride => {

                    const rideDestination =
                        (
                            ride.destination ||
                            ride.destinationLocation ||
                            ""
                        )
                            .toLowerCase();


                    return rideDestination
                        .includes(
                            selectedDestination
                        );

                }
            );

    }


    if (
        selectedDate
    ) {

        filtered =
            filtered.filter(
                ride => {

                    return (
                        ride.date ||
                        ride.rideDate
                    ) === selectedDate;

                }
            );

    }


    displayRides(
        filtered
    );


    document
        .querySelector(
            ".results-section"
        )
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =====================================================
   SORT
===================================================== */

sortSelect.addEventListener(
    "change",
    function () {

        let sorted =
            [...allRides];


        if (
            this.value === "price"
        ) {

            sorted.sort(
                (
                    a,
                    b
                ) =>
                    Number(
                        a.price || 0
                    ) -
                    Number(
                        b.price || 0
                    )
            );

        }


        else if (
            this.value === "seats"
        ) {

            sorted.sort(
                (
                    a,
                    b
                ) =>
                    Number(
                        b.seatsLeft ??
                        b.seats ??
                        0
                    ) -
                    Number(
                        a.seatsLeft ??
                        a.seats ??
                        0
                    )
            );

        }


        else {

            sorted.sort(
                (
                    a,
                    b
                ) =>
                    (
                        a.time ||
                        a.rideTime ||
                        ""
                    ).localeCompare(
                        b.time ||
                        b.rideTime ||
                        ""
                    )
            );

        }


        displayRides(
            sorted
        );

    }
);


/* =====================================================
   QUICK SEARCH
===================================================== */

function quickSearch(
    location
) {

    pickup.value =
        location;


    destination.value =
        "Chitkara University";


    searchRides();

}


/* =====================================================
   VIEW RIDE
===================================================== */

function viewRide(
    rideId
) {

    const ride =
        allRides.find(
            item =>
                String(
                    item.id
                ) === String(
                    rideId
                )
        );


    if (!ride) {

        alert(
            "Ride details could not be found."
        );

        return;

    }


    /*
       Save the entire ride so ride.js
       can display it.
    */

    localStorage.setItem(
        "selectedRide",
        JSON.stringify(
            ride
        )
    );


    localStorage.setItem(
        "selectedRideId",
        ride.id
    );


    window.location.href =
        "ride.html";

}


/* =====================================================
   UPCOMING RIDE
===================================================== */

function loadUpcomingRide() {

    const container =
        document.getElementById(
            "upcomingRide"
        );


    if (!container) {
        return;
    }


    let myRides = [];


    try {

        myRides =
            JSON.parse(
                localStorage.getItem(
                    "myRides"
                )
            ) || [];

    } catch {

        myRides = [];

    }


    const upcoming =
        myRides.find(
            ride =>
                ride.status === "upcoming" ||
                ride.status === "pending"
        );


    if (!upcoming) {

        container.innerHTML = `

            <div class="empty-upcoming">

                <div>
                    🚗
                </div>

                <p>
                    No upcoming rides yet.
                </p>

                <button
                    onclick="scrollToFindRide()"
                >
                    Find a Ride
                </button>

            </div>

        `;

        return;

    }


    container.innerHTML = `

        <div class="upcoming-ride-card">

            <div>

                <span>
                    ${formatDate(
                        upcoming.date ||
                        upcoming.rideDate
                    )}
                </span>

                <h3>
                    ${escapeHTML(
                        upcoming.pickup ||
                        "Pickup"
                    )}
                    →
                    ${escapeHTML(
                        upcoming.destination ||
                        "Destination"
                    )}
                </h3>

                <p>
                    ${formatTime(
                        upcoming.time ||
                        upcoming.rideTime ||
                        "08:00"
                    )}
                </p>

            </div>


            <span class="upcoming-status">
                ${upcoming.status || "upcoming"}
            </span>

        </div>

    `;

}


/* =====================================================
   SCROLL TO FIND RIDE
===================================================== */

function scrollToFindRide() {

    const section =
        document.getElementById(
            "findRide"
        );


    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =====================================================
   POST RIDE
===================================================== */

function goToOfferRide() {

    window.location.href =
        "postride.html";

}


/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    localStorage.removeItem(
        "currentUser"
    );


    window.location.href =
        "index.html";

}


/* =====================================================
   SIDEBAR
===================================================== */

function toggleSidebar() {

    const sidebar =
        document.getElementById(
            "sidebar"
        );


    sidebar.classList.toggle(
        "open"
    );

}


/* =====================================================
   NAVIGATION PLACEHOLDERS
===================================================== */

function openMessages() {

    alert(
        "Messages feature coming soon."
    );

}


function openNotifications() {

    alert(
        "You have no new notifications."
    );

}


function openProfile() {

    alert(
        "Profile feature coming soon."
    );

}


function openSettings() {

    alert(
        "Settings feature coming soon."
    );

}


function showSafety() {

    alert(
        "CHITKARA CARPOOL SAFETY\n\n" +
        "✓ Travel with verified students\n" +
        "✓ Confirm vehicle details\n" +
        "✓ Meet at the selected pickup point\n" +
        "✓ Be punctual\n" +
        "✓ Report suspicious activity"
    );

}


/* =====================================================
   DATE
===================================================== */

function formatDate(
    value
) {

    if (!value) {
        return "Date not set";
    }


    const date =
        new Date(
            value + "T00:00:00"
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return value;

    }


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


/* =====================================================
   TIME
===================================================== */

function formatTime(
    value
) {

    if (!value) {
        return "Time not set";
    }


    const parts =
        value.split(":");


    if (
        parts.length < 2
    ) {

        return value;

    }


    let hour =
        Number(
            parts[0]
        );


    const minute =
        parts[1];


    const period =
        hour >= 12
            ? "PM"
            : "AM";


    hour =
        hour % 12 || 12;


    return `${hour}:${minute} ${period}`;

}


/* =====================================================
   HTML ESCAPE
===================================================== */

function escapeHTML(
    value
) {

    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =====================================================
   INITIAL LOAD
===================================================== */

loadRides();