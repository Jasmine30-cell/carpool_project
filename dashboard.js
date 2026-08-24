/* =====================================================
   DASHBOARD JAVASCRIPT
===================================================== */


/* =====================================================
   GET CURRENT USER
===================================================== */

const currentUser =
    JSON.parse(
        localStorage.getItem("currentUser")
    );


/* =====================================================
   PROTECT DASHBOARD
===================================================== */

if (!currentUser) {

    window.location.href = "index.html";

}


/* =====================================================
   DOM ELEMENTS
===================================================== */

const dashboardUserName =
    document.getElementById("dashboardUserName");

const profileAvatar =
    document.getElementById("profileAvatar");

const upcomingRide =
    document.getElementById("upcomingRide");

const sideNotification =
    document.getElementById("sideNotification");

const topNotification =
    document.getElementById("topNotification");


/* =====================================================
   DISPLAY USER
===================================================== */

function displayUser() {

    if (!currentUser) {
        return;
    }


    const name =
        currentUser.name ||
        currentUser.fullName ||
        "Student";


    if (dashboardUserName) {

        dashboardUserName.textContent =
            name;

    }


    if (profileAvatar) {

        profileAvatar.textContent =
            name
                .charAt(0)
                .toUpperCase();

    }

}


displayUser();


/* =====================================================
   STORAGE HELPER
===================================================== */

function getStorageArray(key) {

    try {

        const data =
            JSON.parse(
                localStorage.getItem(key)
            );

        return Array.isArray(data)
            ? data
            : [];

    } catch (error) {

        console.error(
            `Error reading ${key}:`,
            error
        );

        return [];

    }

}


/* =====================================================
   GET RIDES
===================================================== */

let myRides =
    getStorageArray("myRides");

let requestedRides =
    getStorageArray("requestedRides");

let cancelledRides =
    getStorageArray("cancelledRides");


/* =====================================================
   CURRENT USER EMAIL
===================================================== */

const currentEmail =
    currentUser &&
    currentUser.email
        ? currentUser.email.toLowerCase()
        : "";


/* =====================================================
   CHECK IF RIDE BELONGS TO USER
===================================================== */

function isCurrentUserRide(ride) {

    if (!currentEmail) {

        return true;

    }


    const email =
        (
            ride.email ||
            ride.userEmail ||
            ride.requestedBy ||
            ride.passengerEmail ||
            ""
        ).toLowerCase();


    /*
       Old rides may not contain
       an email field.

       So don't accidentally hide them.
    */

    if (!email) {

        return true;

    }


    return email === currentEmail;

}


/* =====================================================
   USER REQUESTED RIDES
===================================================== */

const userRequestedRides =
    requestedRides.filter(
        isCurrentUserRide
    );


/* =====================================================
   USER MY RIDES
===================================================== */

const userMyRides =
    myRides.filter(
        isCurrentUserRide
    );


/* =====================================================
   FIND UPCOMING RIDE
===================================================== */

function getUpcomingRide() {

    const rides = [

        ...userMyRides,

        ...userRequestedRides

    ];


    /*
       Remove cancelled rides.
    */

    const activeRides =
        rides.filter(
            ride => {

                const status =
                    String(
                        ride.status ||
                        "pending"
                    ).toLowerCase();


                return (
                    status !== "cancelled" &&
                    status !== "rejected" &&
                    status !== "completed"
                );

            }
        );


    if (
        activeRides.length === 0
    ) {

        return null;

    }


    return activeRides[0];

}


/* =====================================================
   DISPLAY UPCOMING RIDE
===================================================== */

function displayUpcomingRide() {

    if (!upcomingRide) {
        return;
    }


    const ride =
        getUpcomingRide();


    if (!ride) {

        upcomingRide.innerHTML = `

            <div class="empty-upcoming">

                <strong>
                    No upcoming rides
                </strong>

                <span>
                    Find a ride and start your journey.
                </span>

            </div>

        `;

        return;

    }


    const pickup =
        ride.pickup ||
        ride.from ||
        ride.start ||
        "Pickup Location";


    const destination =
        ride.destination ||
        ride.to ||
        ride.drop ||
        "Chitkara University";


    const date =
        ride.date ||
        ride.rideDate ||
        "Upcoming";


    const time =
        ride.time ||
        ride.rideTime ||
        "09:00 AM";


    const driver =
        ride.driverName ||
        ride.name ||
        ride.driver ||
        "Chitkara Student";


    upcomingRide.innerHTML = `

        <div class="upcoming-card">


            <div class="upcoming-time">

                <strong>
                    ${escapeHTML(
                        formatDate(date)
                    )}
                </strong>

                <span>
                    ${escapeHTML(time)}
                </span>

            </div>


            <div class="upcoming-route">

                <span>
                    ROUTE
                </span>

                <strong>

                    ${escapeHTML(pickup)}

                    →

                    ${escapeHTML(destination)}

                </strong>


                <div class="upcoming-driver">

                    Driver:
                    ${escapeHTML(driver)}

                </div>

            </div>


            <a
                href="myride.html"
                class="upcoming-action"
            >
                View Ride Details
            </a>


        </div>

    `;

}


/* =====================================================
   DATE FORMAT
===================================================== */

function formatDate(date) {

    if (!date) {

        return "UP";

    }


    const dateObject =
        new Date(date);


    if (
        isNaN(
            dateObject.getTime()
        )
    ) {

        return String(date);

    }


    const month =
        dateObject.toLocaleString(
            "en-US",
            {
                month: "short"
            }
        );


    const day =
        dateObject.getDate();


    return `${month} ${day}`;

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        String(value);

    return div.innerHTML;

}


/* =====================================================
   NOTIFICATIONS
===================================================== */

function updateNotifications() {

    /*
       Count pending requests.

       You can later expand this to include
       accepted / cancelled / new messages.
    */

    const pending =
        userRequestedRides.filter(
            ride => {

                const status =
                    String(
                        ride.status ||
                        "pending"
                    ).toLowerCase();


                return status === "pending";

            }
        );


    const count =
        pending.length;


    if (sideNotification) {

        sideNotification.textContent =
            count;


        if (count > 0) {

            sideNotification.classList.add(
                "show"
            );

        } else {

            sideNotification.classList.remove(
                "show"
            );

        }

    }


    if (topNotification) {

        topNotification.textContent =
            count;


        if (count > 0) {

            topNotification.classList.add(
                "show"
            );

        } else {

            topNotification.classList.remove(
                "show"
            );

        }

    }

}


/* =====================================================
   FIND RIDE
===================================================== */

function goToFindRide() {

    window.location.href =
        "home.html";

}


/* =====================================================
   OFFER RIDE
===================================================== */

function goToOfferRide() {

    /*
       Change this if your actual file
       has another name.
    */

    window.location.href =
        "offer.html";

}


/* =====================================================
   MY RIDES
===================================================== */

function goToMyRides() {

    window.location.href =
        "myride.html";

}


/* =====================================================
   SEARCH RIDE
===================================================== */

function searchRide() {

    const pickup =
        document
            .getElementById(
                "pickupLocation"
            )
            .value
            .trim();


    const destination =
        document
            .getElementById(
                "destination"
            )
            .value
            .trim();


    /*
       Basic validation
    */

    if (!pickup) {

        alert(
            "Please enter your pickup location."
        );

        return;

    }


    if (!destination) {

        alert(
            "Please enter your destination."
        );

        return;

    }


    /*
       Store search information.

       home.js can use this later.
    */

    localStorage.setItem(
        "rideSearch",
        JSON.stringify({

            pickup: pickup,

            destination: destination

        })
    );


    window.location.href =
        "home.html";

}


/* =====================================================
   QUICK SEARCH
===================================================== */

function quickSearch(location) {

    localStorage.setItem(
        "rideSearch",
        JSON.stringify({

            pickup: location,

            destination:
                "Chitkara University"

        })
    );


    window.location.href =
        "home.html";

}


/* =====================================================
   MESSAGES
===================================================== */

function openMessages() {

    /*
       If you already have messages.html,
       simply change this line.
    */

    if (
        fileExists("messages.html")
    ) {

        window.location.href =
            "messages.html";

    } else {

        alert(
            "Messages feature is coming soon."
        );

    }

}


/* =====================================================
   NOTIFICATIONS
===================================================== */

function openNotifications() {

    const pending =
        userRequestedRides.filter(
            ride => {

                return (
                    String(
                        ride.status ||
                        "pending"
                    ).toLowerCase()
                    === "pending"
                );

            }
        );


    if (pending.length === 0) {

        alert(
            "You don't have any new notifications."
        );

        return;

    }


    alert(
        `You have ${pending.length} pending ride request${
            pending.length > 1
                ? "s"
                : ""
        }.`
    );

}


/* =====================================================
   PROFILE
===================================================== */

function openProfile() {

    /*
       Change to profile.html if you
       create the page.
    */

    if (
        fileExists("profile.html")
    ) {

        window.location.href =
            "profile.html";

    } else {

        alert(
            "Profile page is coming soon."
        );

    }

}


/* =====================================================
   SETTINGS
===================================================== */

function openSettings() {

    if (
        fileExists("settings.html")
    ) {

        window.location.href =
            "settings.html";

    } else {

        alert(
            "Settings page is coming soon."
        );

    }

}


/* =====================================================
   SAFETY
===================================================== */

function showSafety() {

    alert(
        "Safety Tips:\n\n" +
        "• Travel with verified Chitkara students.\n" +
        "• Confirm the vehicle and driver details.\n" +
        "• Be punctual at the pickup point.\n" +
        "• Share your ride details with someone you trust.\n" +
        "• Report anything suspicious."
    );

}


/* =====================================================
   MOBILE SIDEBAR
===================================================== */

function toggleSidebar() {

    const sidebar =
        document.querySelector(
            ".sidebar"
        );


    if (!sidebar) {
        return;
    }


    sidebar.classList.toggle(
        "open"
    );


    let overlay =
        document.querySelector(
            ".sidebar-overlay"
        );


    /*
       Create overlay dynamically.
    */

    if (!overlay) {

        overlay =
            document.createElement(
                "div"
            );

        overlay.className =
            "sidebar-overlay";

        document.body.appendChild(
            overlay
        );


        overlay.addEventListener(
            "click",
            function () {

                sidebar.classList.remove(
                    "open"
                );

                overlay.classList.remove(
                    "show"
                );

            }
        );

    }


    overlay.classList.toggle(
        "show",
        sidebar.classList.contains(
            "open"
        )
    );

}


/* =====================================================
   CLOSE SIDEBAR WHEN LINK CLICKED
===================================================== */

document
    .querySelectorAll(
        ".sidebar-item"
    )
    .forEach(
        item => {

            item.addEventListener(
                "click",
                function () {

                    if (
                        window.innerWidth <= 900
                    ) {

                        const sidebar =
                            document.querySelector(
                                ".sidebar"
                            );

                        const overlay =
                            document.querySelector(
                                ".sidebar-overlay"
                            );


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

                }
            );

        }
    );


/* =====================================================
   FILE EXISTS HELPER
===================================================== */

function fileExists(filename) {

    /*
       This doesn't make a network request.
       It is only used to avoid sending the user
       to pages that don't exist in the project.

       For your local project, returning false
       by default is safer.
    */

    return false;

}


/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    /*
       IMPORTANT:

       We remove ONLY currentUser.

       Registered account data,
       rides,
       requests,
       cancelled rides etc.
       remain in Local Storage.
    */

    localStorage.removeItem(
        "currentUser"
    );


    window.location.href =
        "index.html";

}


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayUser();

        displayUpcomingRide();

        updateNotifications();

    }
);