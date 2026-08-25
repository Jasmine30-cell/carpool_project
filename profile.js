document.addEventListener("DOMContentLoaded", () => {

    loadProfile();

    loadStatistics();

});



/* =========================================
   GET CURRENT USER
========================================= */

function getCurrentUser() {

    const keys = [
        "currentUser",
        "loggedInUser",
        "user"
    ];


    for (const key of keys) {

        const data = localStorage.getItem(key);

        if (!data) continue;


        try {

            const user = JSON.parse(data);

            if (user) {
                return user;
            }

        } catch (error) {

            console.log("Invalid user data");

        }

    }


    /* Use the values saved by your login/signup */

    const name =
        localStorage.getItem("userName");

    const email =
        localStorage.getItem("userEmail");


    if (name || email) {

        return {

            name: name || "Student",

            email:
                email ||
                "student@chitkara.edu.in"

        };

    }


    return null;

}



/* =========================================
   LOAD PROFILE
========================================= */

function loadProfile() {

    const user = getCurrentUser();


    if (!user) {

        document.getElementById("profileName")
            .textContent = "Student";

        document.getElementById("profileEmail")
            .textContent = "No account data";

        document.getElementById("profilePhoto")
            .textContent = "?";

        document.getElementById("topUserName")
            .textContent = "Student";

        document.getElementById("topUserAvatar")
            .textContent = "?";

        return;

    }


    const name =
        user.name ||
        user.fullName ||
        "Student";


    const email =
        user.email ||
        "No email";


    /* NAME */

    document.getElementById("profileName")
        .textContent = name;


    document.getElementById("topUserName")
        .textContent = name;



    /* EMAIL */

    document.getElementById("profileEmail")
        .textContent = email;



    /* PHOTO */

    const photo =
        user.photo ||
        user.profilePhoto;


    if (photo) {

        document.getElementById("profilePhoto")
            .innerHTML =
            `<img src="${photo}" alt="Profile photo">`;


        document.getElementById("topUserAvatar")
            .innerHTML =
            `<img src="${photo}" alt="Profile photo">`;

    }

    else {

        const initial =
            name.charAt(0).toUpperCase();


        document.getElementById("profilePhoto")
            .textContent = initial;


        document.getElementById("topUserAvatar")
            .textContent = initial;

    }

}



/* =========================================
   STATISTICS
========================================= */

function loadStatistics() {

    /*
       IMPORTANT:

       We don't put fake numbers here.

       If there are no rides:
       Rides Taken = 0
       Rides Offered = 0
       Rating = —
    */


    let ridesTaken = 0;

    let ridesOffered = 0;


    /* Requested / booked rides */

    const requestedKeys = [

        "myRides",

        "requestedRides",

        "bookedRides"

    ];


    for (const key of requestedKeys) {

        const data =
            localStorage.getItem(key);


        if (!data) continue;


        try {

            const rides =
                JSON.parse(data);


            if (Array.isArray(rides)) {

                ridesTaken =
                    rides.length;

                break;

            }

        } catch (error) {

            console.log(error);

        }

    }



    /* Posted rides */

    const offeredKeys = [

        "offeredRides",

        "postedRides",

        "myPostedRides"

    ];


    for (const key of offeredKeys) {

        const data =
            localStorage.getItem(key);


        if (!data) continue;


        try {

            const rides =
                JSON.parse(data);


            if (Array.isArray(rides)) {

                ridesOffered =
                    rides.length;

                break;

            }

        } catch (error) {

            console.log(error);

        }

    }


    document.getElementById("ridesTaken")
        .textContent = ridesTaken;


    document.getElementById("ridesOffered")
        .textContent = ridesOffered;


    /*
       Rating is NOT fake.

       Only display it if an actual
       rating exists in localStorage.
    */

    const user = getCurrentUser();


    if (
        user &&
        user.rating !== undefined &&
        user.rating !== null
    ) {

        document.getElementById("rating")
            .textContent = user.rating;

    }

    else {

        document.getElementById("rating")
            .textContent = "—";

    }

}



/* =========================================
   EDIT PROFILE
========================================= */

function editProfile() {

    const user = getCurrentUser();


    if (!user) {

        alert("Please login first.");

        return;

    }


    const newName =
        prompt(
            "Enter your name:",
            user.name || ""
        );


    if (!newName) return;


    const name =
        newName.trim();


    if (!name) return;


    user.name = name;


    /* Save everywhere your project uses */

    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );


    localStorage.setItem(
        "userName",
        name
    );


    loadProfile();

}



/* =========================================
   NAVIGATION
========================================= */

function openMyRides() {

    window.location.href =
        "myride.html";

}


function openPayment() {

    alert(
        "Payment Methods page will be connected here."
    );

}


function openContacts() {

    alert(
        "Trusted Contacts page will be connected here."
    );

}


function openHelp() {

    alert(
        "Help & Support page will be connected here."
    );

}


function openSettings(event) {

    if (event) {
        event.preventDefault();
    }


    alert(
        "Settings page will be connected here."
    );

}


function openMessages(event) {

    if (event) {
        event.preventDefault();
    }


    alert(
        "Messages page will be connected here."
    );

}


function openNotifications(event) {

    if (event) {
        event.preventDefault();
    }


    alert(
        "Notifications will be connected here."
    );

}



/* =========================================
   LOGOUT
========================================= */

function logout() {

    localStorage.removeItem("currentUser");

    localStorage.removeItem("loggedInUser");

    localStorage.removeItem("user");

    localStorage.removeItem("userName");

    localStorage.removeItem("userEmail");


    window.location.href =
        "index.html";

}