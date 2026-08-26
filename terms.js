document.addEventListener("DOMContentLoaded", function () {

    loadAgreement();

});


/* =====================================================
   CHECK IF TERMS ARE ALREADY ACCEPTED
===================================================== */

function loadAgreement() {

    const accepted =
        localStorage.getItem("termsAccepted") === "true";


    if (accepted) {

        setAgreedState();

    }

}


/* =====================================================
   AGREE TO TERMS
===================================================== */

function agreeToTerms() {

    localStorage.setItem(
        "termsAccepted",
        "true"
    );

    setAgreedState();

}


/* =====================================================
   CHANGE BUTTON AFTER ACCEPTING
===================================================== */

function setAgreedState() {

    const button =
        document.getElementById("agreeButton");

    const icon =
        document.getElementById("agreeIcon");

    const text =
        document.getElementById("agreeText");

    const message =
        document.getElementById("agreementMessage");


    if (!button) {
        return;
    }


    // Change button appearance
    button.classList.add("agreed");


    // Blue tick
    if (icon) {

        icon.textContent = "✓";

    }


    // Change button text
    if (text) {

        text.textContent =
            "Terms & Conditions Accepted";

    }


    // Confirmation message
    if (message) {

        message.textContent =
            "✓ Your agreement has been saved.";

    }

}