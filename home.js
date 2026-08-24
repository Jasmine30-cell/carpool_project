/* =====================================================
   CHITKARA CARPOOL - HOME
===================================================== */


/* =====================================================
   CURRENT USER
===================================================== */

const currentUser =
    JSON.parse(
        localStorage.getItem("currentUser")
    );


/* =====================================================
   PROTECT PAGE
===================================================== */

if (!currentUser) {

    window.location.href =
        "index.html";

}


/* =====================================================
   DOM
===================================================== */

const pickup =
    document.getElementById("pickup");

const destination =
    document.getElementById("destination");

const date =
    document.getElementById("date");

const searchButton =
    document.getElementById("searchButton");

const rideContainer =
    document.getElementById("rideContainer");

const noResults =
    document.getElementById("noResults");

const resultCount =
    document.getElementById("resultCount");

const sortSelect =
    document.getElementById("sortSelect");

const userName =
    document.getElementById("userName");

const userEmail =
    document.getElementById("userEmail");

const userAvatar =
    document.getElementById("userAvatar");

const logoutButton =
    document.getElementById("logoutButton");


/* =====================================================
   STORAGE
===================================================== */

function getArray(key) {

    try {

        const value =
            JSON.parse(
                localStorage.getItem(key)
            );

        return Array.isArray(value)
            ? value
            : [];

    } catch (error) {

        console.error(
            `Could not read ${key}`,
            error
        );

        return [];

    }

}


function saveArray(
    key,
    value
) {

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );

}


/* =====================================================
   USER
===================================================== */

function displayUser() {

    if (!currentUser) {
        return;
    }


    const name =
        currentUser.name ||
        currentUser.fullName ||
        "Student";


    const email =
        currentUser.email ||
        "student@chitkara.edu.in";


    if (userName) {

        userName.textContent =
            name;

    }


    if (userEmail) {

        userEmail.textContent =
            email;

    }


    if (userAvatar) {

        userAvatar.textContent =
            name
                .charAt(0)
                .toUpperCase();

    }

}


displayUser();


/* =====================================================
   DEFAULT RIDES
===================================================== */

/*
   If you already have rides saved in Local Storage,
   those rides will be used.

   If not, these demo rides make your UI
   immediately usable for your evaluation.
*/

function createDefaultRides() {

    const existing =
        getArray("rides");


    if (existing.length > 0) {

        return existing;

    }


    const defaultRides = [

        {
            id: "ride-101",

            driverName:
                "Aarav Sharma",

            driverPhoto:
                "images/student1.jpg",

            rating: "4.9",

            reviewCount: 32,

            pickup:
                "Zirakpur",

            pickupDetail:
                "Near VIP Road",

            destination:
                "Chitkara University",

            destinationDetail:
                "Rajpura Campus",

            date:
                "2026-08-25",

            time:
                "08:00 AM",

            seats:
                3,

            price:
                40,

            carName:
                "Hyundai i20",

            carColor:
                "White",

            carNumber:
                "PB65AB1234",

            phone:
                "9876543210",

            status:
                "available"

        },


        {
            id: "ride-102",

            driverName:
                "Riya Kapoor",

            driverPhoto:
                "images/student2.jpg",

            rating: "4.8",

            reviewCount: 27,

            pickup:
                "Mohali",

            pickupDetail:
                "Phase 7",

            destination:
                "Chitkara University",

            destinationDetail:
                "Rajpura Campus",

            date:
                "2026-08-25",

            time:
                "08:20 AM",

            seats:
                2,

            price:
                50,

            carName:
                "Maruti Baleno",

            carColor:
                "Blue",

            carNumber:
                "PB65CD5678",

            phone:
                "9876543211",

            status:
                "available"

        },


        {
            id: "ride-103",

            driverName:
                "Kabir Singh",

            driverPhoto:
                "images/student3.jpg",

            rating: "4.7",

            reviewCount: 19,

            pickup:
                "Panchkula",

            pickupDetail:
                "Sector 20",

            destination:
                "Chitkara University",

            destinationDetail:
                "Rajpura Campus",

            date:
                "2026-08-25",

            time:
                "07:45 AM",

            seats:
                4,

            price:
                35,

            carName:
                "Swift Dzire",

            carColor:
                "Grey",

            carNumber:
                "HR68EF9087",

            phone:
                "9876543212",

            status:
                "available"

        },


        {
            id: "ride-104",

            driverName:
                "Ananya Mehta",

            driverPhoto:
                "images/student4.jpg",

            rating: "4.9",

            reviewCount: 41,

            pickup:
                "Patiala",

            pickupDetail:
                "Bus Stand",

            destination:
                "Chitkara University",

            destinationDetail:
                "Rajpura Campus",

            date:
                "2026-08-26",

            time:
                "07:30 AM",

            seats:
                2,

            price:
                60,

            carName:
                "Honda City",

            carColor:
                "Black",

            carNumber:
                "PB11GH4521",

            phone:
                "9876543213",

            status:
                "available"

        }

    ];


    saveArray(
        "rides",
        defaultRides
    );


    return defaultRides;

}


/* =====================================================
   ALL RIDES
===================================================== */

let allRides =
    createDefaultRides();


/* =====================================================
   SELECTED RIDE
===================================================== */

function openRide(rideId) {

    const ride =
        allRides.find(
            item =>
                String(
                    item.id ||
                    item.rideId
                ) ===
                String(rideId)
        );


    if (!ride) {

        console.error(
            "Ride not found:",
            rideId
        );

        return;

    }


    /*
       IMPORTANT:

       ride.html reads selectedRide.
    */

    localStorage.setItem(
        "selectedRide",
        JSON.stringify(ride)
    );


    /*
       Also keep currentRide for
       compatibility with older JS.
    */

    localStorage.setItem(
        "currentRide",
        JSON.stringify(ride)
    );


    window.location.href =
        "ride.html";

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        String(value ?? "");

    return div.innerHTML;

}


/* =====================================================
   AVATAR FALLBACK
===================================================== */

function avatarFallback(
    name
) {

    const letter =
        String(name || "S")
            .charAt(0)
            .toUpperCase();


    const svg = `

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 100 100"
        >

            <rect
                width="100"
                height="100"
                fill="#e3f1e6"
            />

            <circle
                cx="50"
                cy="39"
                r="18"
                fill="#07883f"
            />

            <path
                d="
                    M20 100
                    C23 73 38 61 50 61
                    C62 61 77 73 80 100
                "
                fill="#07883f"
            />

            <text
                x="50"
                y="46"
                text-anchor="middle"
                fill="white"
                font-size="16"
                font-family="Arial"
                font-weight="bold"
            >
                ${letter}
            </text>

        </svg>

    `;


    return (
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(svg)
    );

}


/* =====================================================
   DISPLAY RIDES
===================================================== */

function displayRides(
    rides
) {

    if (!rideContainer) {
        return;
    }


    rideContainer.innerHTML = "";


    if (
        !rides ||
        rides.length === 0
    ) {

        showNoResults();

        return;

    }


    hideNoResults();


    if (resultCount) {

        resultCount.textContent =
            `${rides.length} ride${
                rides.length !== 1
                    ? "s"
                    : ""
            } available`;

    }


    rides.forEach(
        (ride, index) => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "ride-card";


            card.style.animation =
                `rideAppear .45s ${
                    index * .06
                }s ease both`;


            const id =
                ride.id ||
                ride.rideId ||
                `ride-${index}`;


            const driverName =
                ride.driverName ||
                ride.name ||
                ride.driver ||
                "Chitkara Student";


            const photo =
                ride.driverPhoto ||
                ride.photo ||
                ride.image ||
                avatarFallback(
                    driverName
                );


            const rating =
                ride.rating ||
                ride.driverRating ||
                "4.8";


            const pickupValue =
                ride.pickup ||
                ride.pickupLocation ||
                ride.from ||
                "Pickup";


            const destinationValue =
                ride.destination ||
                ride.destinationLocation ||
                ride.to ||
                "Chitkara University";


            const rideDate =
                ride.date ||
                ride.rideDate ||
                "";


            const rideTime =
                ride.time ||
                ride.rideTime ||
                "08:00 AM";


            const seats =
                Number(
                    ride.seats ??
                    ride.seatsLeft ??
                    ride.availableSeats ??
                    0
                );


            const price =
                ride.price ??
                ride.pricePerSeat ??
                ride.fare ??
                40;


            card.innerHTML = `

                <img
                    class="ride-driver-photo"
                    src="${escapeHTML(photo)}"
                    alt="${escapeHTML(driverName)}"
                >


                <div class="ride-driver-info">

                    <h3>
                        ${escapeHTML(driverName)}
                    </h3>


                    <div>

                        <span class="rating">
                            ★ ${escapeHTML(rating)}
                        </span>

                        <span class="student">
                            Chitkara Student
                        </span>

                    </div>


                    <div class="ride-route">

                        <i class="fa-solid fa-location-dot"></i>

                        <strong>
                            ${escapeHTML(pickupValue)}
                        </strong>


                        <span class="route-arrow">
                            →
                        </span>


                        <i class="fa-solid fa-location-dot"></i>

                        <strong>
                            ${escapeHTML(destinationValue)}
                        </strong>

                    </div>


                    <div class="ride-meta">

                        <span>

                            <i class="fa-regular fa-calendar"></i>

                            ${escapeHTML(
                                formatShortDate(
                                    rideDate
                                )
                            )}

                        </span>


                        <span>

                            <i class="fa-regular fa-clock"></i>

                            ${escapeHTML(rideTime)}

                        </span>


                        <span>

                            <i class="fa-solid fa-user-group"></i>

                            ${seats}
                            seat${
                                seats !== 1
                                    ? "s"
                                    : ""
                            }

                        </span>

                    </div>

                </div>


                <div class="ride-action">

                    <div>

                        <div class="ride-price">

                            ₹${escapeHTML(price)}

                            <span>
                                / seat
                            </span>

                        </div>


                        <div class="seats-left">

                            ${seats}
                            seat${
                                seats !== 1
                                    ? "s"
                                    : ""
                            }
                            left

                        </div>

                    </div>


                    <button
                        class="view-ride"
                        data-ride-id="${escapeHTML(id)}"
                    >

                        View Ride

                        <i class="fa-solid fa-arrow-right"></i>

                    </button>

                </div>

            `;


            const image =
                card.querySelector(
                    ".ride-driver-photo"
                );


            if (image) {

                image.onerror =
                    function () {

                        this.src =
                            avatarFallback(
                                driverName
                            );

                    };

            }


            const viewButton =
                card.querySelector(
                    ".view-ride"
                );


            viewButton.addEventListener(
                "click",
                function () {

                    openRide(id);

                }
            );


            rideContainer.appendChild(
                card
            );

        }
    );

}


/* =====================================================
   DATE FORMAT
===================================================== */

function formatShortDate(
    date
) {

    if (!date) {

        return "Upcoming";

    }


    const d =
        new Date(date);


    if (
        isNaN(
            d.getTime()
        )
    ) {

        return String(date);

    }


    return d.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short"
        }
    );

}


/* =====================================================
   SHOW / HIDE NO RESULTS
===================================================== */

function showNoResults() {

    if (noResults) {

        noResults.classList.add(
            "show"
        );

    }

    if (resultCount) {

        resultCount.textContent =
            "No rides match your search";

    }

}


function hideNoResults() {

    if (noResults) {

        noResults.classList.remove(
            "show"
        );

    }

}


/* =====================================================
   SEARCH
===================================================== */

function searchRides() {

    const pickupValue =
        pickup?.value.trim()
        || "";


    const destinationValue =
        destination?.value.trim()
        || "";


    const dateValue =
        date?.value
        || "";


    /*
       Store search for dashboard/other pages.
    */

    localStorage.setItem(
        "rideSearch",
        JSON.stringify({

            pickup:
                pickupValue,

            destination:
                destinationValue,

            date:
                dateValue

        })
    );


    let filtered =
        [...allRides];


    /* PICKUP */

    if (pickupValue) {

        filtered =
            filtered.filter(
                ride => {

                    const ridePickup =
                        String(
                            ride.pickup ||
                            ride.pickupLocation ||
                            ride.from ||
                            ""
                        ).toLowerCase();


                    return ridePickup
                        .includes(
                            pickupValue
                                .toLowerCase()
                        );

                }
            );

    }


    /* DESTINATION */

    if (destinationValue) {

        filtered =
            filtered.filter(
                ride => {

                    const rideDestination =
                        String(
                            ride.destination ||
                            ride.destinationLocation ||
                            ride.to ||
                            ""
                        ).toLowerCase();


                    return rideDestination
                        .includes(
                            destinationValue
                                .toLowerCase()
                        );

                }
            );

    }


    /* DATE */

    if (dateValue) {

        filtered =
            filtered.filter(
                ride => {

                    return String(
                        ride.date ||
                        ride.rideDate ||
                        ""
                    ) ===
                    String(
                        dateValue
                    );

                }
            );

    }


    sortRides(
        filtered,
        sortSelect?.value ||
        "time"
    );


    displayRides(
        filtered
    );


    /*
       Scroll smoothly to results.
    */

    const results =
        document.getElementById(
            "availableRidesSection"
        );


    if (results) {

        setTimeout(
            () => {

                results.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            },
            100
        );

    }

}


/* =====================================================
   SORT
===================================================== */

function sortRides(
    rides,
    type
) {

    if (!Array.isArray(rides)) {
        return;
    }


    if (type === "price") {

        rides.sort(
            (a, b) => {

                const priceA =
                    Number(
                        a.price ??
                        a.pricePerSeat ??
                        0
                    );


                const priceB =
                    Number(
                        b.price ??
                        b.pricePerSeat ??
                        0
                    );


                return priceA - priceB;

            }
        );

    }


    else if (type === "seats") {

        rides.sort(
            (a, b) => {

                const seatsA =
                    Number(
                        a.seats ??
                        a.seatsLeft ??
                        a.availableSeats ??
                        0
                    );


                const seatsB =
                    Number(
                        b.seats ??
                        b.seatsLeft ??
                        b.availableSeats ??
                        0
                    );


                return seatsB - seatsA;

            }
        );

    }


    else {

        rides.sort(
            (a, b) => {

                const timeA =
                    String(
                        a.time ||
                        a.rideTime ||
                        ""
                    );


                const timeB =
                    String(
                        b.time ||
                        b.rideTime ||
                        ""
                    );


                return timeA.localeCompare(
                    timeB
                );

            }
        );

    }

}


/* =====================================================
   SORT CHANGE
===================================================== */

if (sortSelect) {

    sortSelect.addEventListener(
        "change",
        function () {

            const visibleRides =
                getVisibleRides();


            sortRides(
                visibleRides,
                this.value
            );


            displayRides(
                visibleRides
            );

        }
    );

}


/* =====================================================
   CURRENT FILTER
===================================================== */

function getVisibleRides() {

    const pickupValue =
        pickup?.value.trim()
        || "";


    const destinationValue =
        destination?.value.trim()
        || "";


    const dateValue =
        date?.value
        || "";


    return allRides.filter(
        ride => {

            const ridePickup =
                String(
                    ride.pickup ||
                    ride.pickupLocation ||
                    ride.from ||
                    ""
                ).toLowerCase();


            const rideDestination =
                String(
                    ride.destination ||
                    ride.destinationLocation ||
                    ride.to ||
                    ""
                ).toLowerCase();


            const rideDate =
                String(
                    ride.date ||
                    ride.rideDate ||
                    ""
                );


            const pickupMatch =
                !pickupValue ||
                ridePickup.includes(
                    pickupValue.toLowerCase()
                );


            const destinationMatch =
                !destinationValue ||
                rideDestination.includes(
                    destinationValue.toLowerCase()
                );


            const dateMatch =
                !dateValue ||
                rideDate === dateValue;


            return (
                pickupMatch &&
                destinationMatch &&
                dateMatch
            );

        }
    );

}


/* =====================================================
   SEARCH BUTTON
===================================================== */

if (searchButton) {

    searchButton.addEventListener(
        "click",
        searchRides
    );

}


/* =====================================================
   SWAP LOCATIONS
===================================================== */

const swapButton =
    document.getElementById(
        "swapLocations"
    );


if (swapButton) {

    swapButton.addEventListener(
        "click",
        function () {

            const oldPickup =
                pickup.value;


            pickup.value =
                destination.value;


            destination.value =
                oldPickup;

        }
    );

}


/* =====================================================
   QUICK SEARCH
===================================================== */

document
    .querySelectorAll(
        ".quick-search"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                function () {

                    const location =
                        this.dataset.location;


                    pickup.value =
                        location;


                    destination.value =
                        "Chitkara University";


                    searchRides();

                }
            );

        }
    );


/* =====================================================
   UPCOMING RIDE
===================================================== */

function displayUpcomingRide() {

    const container =
        document.getElementById(
            "upcomingRide"
        );


    if (!container) {
        return;
    }


    const myRides =
        getArray(
            "myRides"
        );


    const requestedRides =
        getArray(
            "requestedRides"
        );


    const email =
        String(
            currentUser?.email ||
            ""
        ).toLowerCase();


    const userRides = [

        ...myRides,

        ...requestedRides

    ].filter(
        ride => {

            const rideEmail =
                String(
                    ride.email ||
                    ride.userEmail ||
                    ride.requestedBy ||
                    ""
                ).toLowerCase();


            return (
                !rideEmail ||
                rideEmail === email
            );

        }
    );


    const activeRide =
        userRides.find(
            ride => {

                const status =
                    String(
                        ride.status ||
                        "pending"
                    ).toLowerCase();


                return (
                    status !== "cancelled" &&
                    status !== "completed" &&
                    status !== "rejected"
                );

            }
        );


    if (!activeRide) {

        return;

    }


    const ridePickup =
        activeRide.pickup ||
        activeRide.from ||
        "Pickup";


    const rideDestination =
        activeRide.destination ||
        activeRide.to ||
        "Chitkara University";


    const rideDate =
        activeRide.date ||
        activeRide.rideDate ||
        "";


    const rideTime =
        activeRide.time ||
        activeRide.rideTime ||
        "";


    const driver =
        activeRide.driverName ||
        activeRide.name ||
        "Student";


    container.innerHTML = `

        <div class="dashboard-upcoming">

            <div class="upcoming-date">

                <strong>
                    ${escapeHTML(
                        formatShortDate(
                            rideDate
                        )
                    )}
                </strong>

                <span>
                    ${escapeHTML(rideTime)}
                </span>

            </div>


            <div class="upcoming-route">

                <span>
                    UPCOMING JOURNEY
                </span>


                <strong>

                    ${escapeHTML(
                        ridePickup
                    )}

                    →

                    ${escapeHTML(
                        rideDestination
                    )}

                </strong>


                <p>
                    Driver:
                    ${escapeHTML(driver)}
                </p>

            </div>


            <a
                href="myride.html"
                class="upcoming-view"
            >
                View Ride
            </a>

        </div>

    `;

}


/* =====================================================
   NOTIFICATIONS
===================================================== */

function updateNotifications() {

    const requested =
        getArray(
            "requestedRides"
        );


    const email =
        String(
            currentUser?.email ||
            ""
        ).toLowerCase();


    const pending =
        requested.filter(
            ride => {

                const rideEmail =
                    String(
                        ride.email ||
                        ride.userEmail ||
                        ride.requestedBy ||
                        ""
                    ).toLowerCase();


                const status =
                    String(
                        ride.status ||
                        "pending"
                    ).toLowerCase();


                return (
                    rideEmail === email &&
                    status === "pending"
                );

            }
        );


    const count =
        pending.length;


    document
        .querySelectorAll(
            ".notification-dot"
        )
        .forEach(
            element => {

                element.textContent =
                    count;

                element.style.display =
                    count > 0
                        ? "flex"
                        : "none";

            }
        );


    const headerCount =
        document.querySelector(
            ".header-icon span"
        );


    if (headerCount) {

        headerCount.textContent =
            count;

        headerCount.style.display =
            count > 0
                ? "flex"
                : "none";

    }

}


/* =====================================================
   LOGOUT
===================================================== */

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function () {

            /*
               Remove ONLY logged-in user.

               Registered users and rides
               remain in Local Storage.
            */

            localStorage.removeItem(
                "currentUser"
            );


            window.location.href =
                "index.html";

        }
    );

}


/* =====================================================
   MOBILE SIDEBAR
===================================================== */

const menuButton =
    document.getElementById(
        "menuButton"
    );

const sidebar =
    document.querySelector(
        ".sidebar"
    );

const overlay =
    document.getElementById(
        "sidebarOverlay"
    );


function closeSidebar() {

    if (sidebar) {

        sidebar.classList.remove(
            "open"
        );

    }


    if (overlay) {

        overlay.classList.remove(
            "show"
        );

    }

}


if (menuButton) {

    menuButton.addEventListener(
        "click",
        function () {

            sidebar.classList.toggle(
                "open"
            );


            overlay.classList.toggle(
                "show"
            );

        }
    );

}


if (overlay) {

    overlay.addEventListener(
        "click",
        closeSidebar
    );

}


/* =====================================================
   NAVIGATION
===================================================== */

const messagesNav =
    document.getElementById(
        "messagesNav"
    );


if (messagesNav) {

    messagesNav.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            alert(
                "Messages feature is coming soon."
            );

        }
    );

}


const notificationsNav =
    document.getElementById(
        "notificationsNav"
    );


if (notificationsNav) {

    notificationsNav.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            const requested =
                getArray(
                    "requestedRides"
                );


            if (
                requested.length === 0
            ) {

                alert(
                    "You don't have any ride notifications."
                );

                return;

            }


            alert(
                `You have ${requested.length} ride request notification${
                    requested.length > 1
                        ? "s"
                        : ""
                }.`
            );

        }
    );

}


/* =====================================================
   PROFILE
===================================================== */

const profileNav =
    document.getElementById(
        "profileNav"
    );


if (profileNav) {

    profileNav.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            alert(
                "Profile page is coming soon."
            );

        }
    );

}


/* =====================================================
   SETTINGS
===================================================== */

const settingsNav =
    document.getElementById(
        "settingsNav"
    );


if (settingsNav) {

    settingsNav.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            alert(
                "Settings page is coming soon."
            );

        }
    );

}


/* =====================================================
   SAFETY
===================================================== */

const safetyLink =
    document.querySelector(
        ".safety-card a"
    );


if (safetyLink) {

    safetyLink.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            alert(

                "Chitkara Carpool Safety Tips\n\n" +

                "✓ Travel with verified students\n" +

                "✓ Confirm the vehicle details\n" +

                "✓ Meet at the selected pickup point\n" +

                "✓ Share your ride details with someone you trust\n" +

                "✓ Report suspicious activity"

            );

        }
    );

}


/* =====================================================
   ANIMATION STYLE
===================================================== */

const animationStyle =
    document.createElement(
        "style"
    );


animationStyle.textContent = `

    @keyframes rideAppear {

        from {

            opacity: 0;

            transform:
                translateY(10px);

        }

        to {

            opacity: 1;

            transform:
                translateY(0);

        }

    }

`;


document.head.appendChild(
    animationStyle
);


/* =====================================================
   INITIAL LOAD
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayUser();

        displayUpcomingRide();

        updateNotifications();


        /*
           Load a previously stored search.
        */

        const savedSearch =
            JSON.parse(
                localStorage.getItem(
                    "rideSearch"
                )
            );


        if (savedSearch) {

            if (
                pickup &&
                savedSearch.pickup
            ) {

                pickup.value =
                    savedSearch.pickup;

            }


            if (
                destination &&
                savedSearch.destination
            ) {

                destination.value =
                    savedSearch.destination;

            }


            if (
                date &&
                savedSearch.date
            ) {

                date.value =
                    savedSearch.date;

            }

        }


        /*
           Initially show all rides.
        */

        sortRides(
            allRides,
            "time"
        );


        displayRides(
            allRides
        );

    }
);