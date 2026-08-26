/* =====================================================
   TERMS & CONDITIONS
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupTerms();

    }
);


/* =====================================================
   SETUP
===================================================== */

function setupTerms() {

    const checkbox =
        document.getElementById(
            "termsCheckbox"
        );

    const message =
        document.getElementById(
            "agreementMessage"
        );


    if (!checkbox) return;


    /*
       Check whether the user has
       already accepted the terms.
    */

    const accepted =
        localStorage.getItem(
            "termsAccepted"
        );


    /*
       Only check it if the user
       previously accepted.
    */

    if (accepted === "true") {

        checkbox.checked = true;

        showAcceptedMessage(message);

    }


    /*
       When user clicks checkbox
    */

    checkbox.addEventListener(
        "change",
        function () {

            if (this.checked) {

                /*
                   SAVE ACCEPTANCE
                */

                localStorage.setItem(
                    "termsAccepted",
                    "true"
                );


                showAcceptedMessage(
                    message
                );

            }

            else {

                /*
                   User unchecked it.
                   Remove saved acceptance.
                */

                localStorage.removeItem(
                    "termsAccepted"
                );


                if (message) {

                    message.textContent =
                        "You have not accepted the Terms & Conditions.";

                }

            }

        }
    );

}


/* =====================================================
   ACCEPTED MESSAGE
===================================================== */

function showAcceptedMessage(message) {

    if (!message) return;

    message.textContent =
        "✓ Terms & Conditions accepted and saved.";

}


/* =====================================================
   OPTIONAL FUNCTION
===================================================== */

function agreeToTerms() {

    const checkbox =
        document.getElementById(
            "termsCheckbox"
        );


    if (!checkbox) return;


    checkbox.checked = true;


    localStorage.setItem(
        "termsAccepted",
        "true"
    );

}


/* =====================================================
   DONE BUTTON
===================================================== */

function goToSettings() {

    window.location.href = "setting.html";

}