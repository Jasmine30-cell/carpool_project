/* =====================================================
   PROFILE PAGE
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadProfile();

    loadStatistics();

    setupProfileImage();

});


/* =====================================================
   GET CURRENT USER
===================================================== */

function getCurrentUser() {

    const keys = [
        "currentUser",
        "loggedInUser",
        "user"
    ];


    for (const key of keys) {

        const data =
            localStorage.getItem(key);

        if (!data) continue;


        try {

            const user =
                JSON.parse(data);

            if (user) {

                return user;

            }

        }

        catch (error) {

            console.log(
                "Invalid user data"
            );

        }

    }


    const name =
        localStorage.getItem("userName");

    const email =
        localStorage.getItem("userEmail");


    if (name || email) {

        return {

            name:
                name || "Student",

            email:
                email ||
                "student@chitkara.edu.in"

        };

    }


    return null;

}


/* =====================================================
   SAVE CURRENT USER
===================================================== */

function saveCurrentUser(user) {

    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );


    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
    );


    localStorage.setItem(
        "userName",
        user.name || "Student"
    );


    localStorage.setItem(
        "userEmail",
        user.email || ""
    );

}


/* =====================================================
   LOAD PROFILE
===================================================== */

function loadProfile() {

    const user =
        getCurrentUser();


    const profileName =
        document.getElementById(
            "profileName"
        );

    const profileEmail =
        document.getElementById(
            "profileEmail"
        );

    const profilePhoto =
        document.getElementById(
            "profilePhoto"
        );

    const topUserName =
        document.getElementById(
            "topUserName"
        );

    const topUserAvatar =
        document.getElementById(
            "topUserAvatar"
        );


    if (!user) {

        if (profileName)
            profileName.textContent =
                "Student";


        if (profileEmail)
            profileEmail.textContent =
                "No account data";


        if (profilePhoto)
            profilePhoto.textContent =
                "?";


        if (topUserName)
            topUserName.textContent =
                "Student";


        if (topUserAvatar)
            topUserAvatar.textContent =
                "?";


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

    if (profileName) {

        profileName.textContent =
            name;

    }


    if (topUserName) {

        topUserName.textContent =
            name;

    }


    /* EMAIL */

    if (profileEmail) {

        profileEmail.textContent =
            email;

    }


    /* PHOTO */

    const photo =
        user.photo ||
        user.profilePhoto;


    if (photo) {

        if (profilePhoto) {

            profilePhoto.innerHTML =
                `<img
                    src="${photo}"
                    alt="Profile photo"
                >`;

        }


        if (topUserAvatar) {

            topUserAvatar.innerHTML =
                `<img
                    src="${photo}"
                    alt="Profile photo"
                >`;

        }

    }

    else {

        const initial =
            name.charAt(0)
                .toUpperCase();


        if (profilePhoto) {

            profilePhoto.textContent =
                initial;

        }


        if (topUserAvatar) {

            topUserAvatar.textContent =
                initial;

        }

    }

}


/* =====================================================
   STATISTICS
===================================================== */

function loadStatistics() {

    /*
        No fake statistics are displayed.

        This function is kept so that if your
        project later stores actual ride data,
        it can be used.
    */

}


/* =====================================================
   OPEN EDIT PROFILE
===================================================== */

function editProfile() {

    const user =
        getCurrentUser();


    if (!user) {

        alert(
            "Please login first."
        );

        return;

    }


    /* NAME */

    document.getElementById(
        "editName"
    ).value =
        user.name ||
        user.fullName ||
        "";


    /* EMAIL */

    document.getElementById(
        "editEmail"
    ).value =
        user.email ||
        "";


    /* PHONE */

    document.getElementById(
        "editPhone"
    ).value =
        user.phone ||
        user.phoneNumber ||
        "";


    /* DEPARTMENT */

    document.getElementById(
        "editDepartment"
    ).value =
        user.department ||
        "";


    /* YEAR */

    document.getElementById(
        "editYear"
    ).value =
        user.year ||
        "";


    /* GENDER */

    document.getElementById(
        "editGender"
    ).value =
        user.gender ||
        "";


    /* ADDRESS */

    document.getElementById(
        "editAddress"
    ).value =
        user.address ||
        "";


    /* STUDENT ID */

    document.getElementById(
        "editStudentId"
    ).value =
        user.studentId ||
        user.studentID ||
        "";


    /* PHOTO */

    updateEditPhotoPreview(
        user.photo ||
        user.profilePhoto ||
        null
    );


    /* REMOVE ERROR */

    document.getElementById(
        "editProfileError"
    ).textContent =
        "";


    /* OPEN MODAL */

    document.getElementById(
        "editProfileModal"
    ).classList.add("show");


    document.body.style.overflow =
        "hidden";

}


/* =====================================================
   CLOSE EDIT PROFILE
===================================================== */

function closeEditProfile() {

    const modal =
        document.getElementById(
            "editProfileModal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }


    document.body.style.overflow =
        "";

}


/* =====================================================
   SAVE PROFILE CHANGES
===================================================== */

function saveProfileChanges(event) {

    event.preventDefault();


    const user =
        getCurrentUser();


    if (!user) {

        return;

    }


    const name =
        document.getElementById(
            "editName"
        ).value.trim();


    const phone =
        document.getElementById(
            "editPhone"
        ).value.trim();


    const department =
        document.getElementById(
            "editDepartment"
        ).value.trim();


    const year =
        document.getElementById(
            "editYear"
        ).value;


    const gender =
        document.getElementById(
            "editGender"
        ).value;


    const address =
        document.getElementById(
            "editAddress"
        ).value.trim();


    const studentId =
        document.getElementById(
            "editStudentId"
        ).value.trim();


    const errorElement =
        document.getElementById(
            "editProfileError"
        );


    /* =================================================
       VALIDATION
    ================================================= */

    if (!name) {

        errorElement.textContent =
            "Please enter your full name.";

        return;

    }


    if (
        phone &&
        !/^[0-9]{10}$/.test(phone)
    ) {

        errorElement.textContent =
            "Phone number must contain 10 digits.";

        return;

    }


    if (!department) {

        errorElement.textContent =
            "Please enter your department.";

        return;

    }


    if (!year) {

        errorElement.textContent =
            "Please select your year.";

        return;

    }


    if (!gender) {

        errorElement.textContent =
            "Please select your gender.";

        return;

    }


    if (!address) {

        errorElement.textContent =
            "Please enter your address.";

        return;

    }


    if (!studentId) {

        errorElement.textContent =
            "Please enter your student ID.";

        return;

    }


    /* =================================================
       UPDATE USER
    ================================================= */

    user.name =
        name;

    user.fullName =
        name;

    user.phone =
        phone;

    user.phoneNumber =
        phone;

    user.department =
        department;

    user.year =
        year;

    user.gender =
        gender;

    user.address =
        address;

    user.studentId =
        studentId;

    user.studentID =
        studentId;


    /* =================================================
       SAVE
    ================================================= */

    saveCurrentUser(user);


    /* =================================================
       UPDATE PROFILE PAGE
    ================================================= */

    loadProfile();


    /* =================================================
       CLOSE MODAL
    ================================================= */

    closeEditProfile();


    /* =================================================
       SUCCESS
    ================================================= */

    setTimeout(() => {

        alert(
            "Profile updated successfully!"
        );

    }, 150);

}


/* =====================================================
   PROFILE IMAGE SETUP
===================================================== */

function setupProfileImage() {

    const input =
        document.getElementById(
            "profileImageInput"
        );


    if (!input) return;


    input.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];


            if (!file) {

                return;

            }


            if (
                !file.type.startsWith(
                    "image/"
                )
            ) {

                alert(
                    "Please select an image file."
                );

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    const image =
                        event.target.result;


                    const user =
                        getCurrentUser();


                    if (!user) {

                        return;

                    }


                    user.photo =
                        image;

                    user.profilePhoto =
                        image;


                    saveCurrentUser(
                        user
                    );


                    updateEditPhotoPreview(
                        image
                    );


                    loadProfile();

                };


            reader.readAsDataURL(file);

        }
    );

}


/* =====================================================
   UPDATE EDIT PHOTO PREVIEW
===================================================== */

function updateEditPhotoPreview(
    photo
) {

    const preview =
        document.getElementById(
            "editPhotoPreview"
        );


    if (!preview) {

        return;

    }


    const user =
        getCurrentUser();


    const name =
        user &&
        (
            user.name ||
            user.fullName
        )
            ? (
                user.name ||
                user.fullName
            )
            : "Student";


    if (photo) {

        preview.innerHTML =
            `<img
                src="${photo}"
                alt="Profile photo"
            >`;

    }

    else {

        preview.textContent =
            name.charAt(0)
                .toUpperCase();

    }

}


/* =====================================================
   DELETE PROFILE PICTURE
===================================================== */

function deleteProfilePicture() {

    const user =
        getCurrentUser();


    if (!user) {

        return;

    }


    delete user.photo;

    delete user.profilePhoto;


    saveCurrentUser(
        user
    );


    updateEditPhotoPreview(
        null
    );


    loadProfile();

}


/* =====================================================
   CLICK OUTSIDE MODAL
===================================================== */

document.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById(
                "editProfileModal"
            );


        if (
            modal &&
            event.target === modal
        ) {

            closeEditProfile();

        }

    }
);


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closeEditProfile();

        }

    }
);


/* =====================================================
   NAVIGATION
===================================================== */

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


    window.location.href =
        "setting.html";

}


function openMessages(event) {

    if (event) {

        event.preventDefault();

    }


    alert(
        "Messages will be connected here."
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


/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    localStorage.removeItem(
        "currentUser"
    );

    localStorage.removeItem(
        "loggedInUser"
    );

    localStorage.removeItem(
        "user"
    );

    localStorage.removeItem(
        "userName"
    );

    localStorage.removeItem(
        "userEmail"
    );


    window.location.href =
        "index.html";

}