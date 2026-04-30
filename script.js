"use strict";

// ---------------------------------------------------------
// REGISTER FORM / WEB STORAGE
// function handles form, validates both inputs, and saves to localStorage
function registerAdventurer(e) {
    // don't let form submit normally
    e.preventDefault();

    // grab both inputs
    let charNameInput = document.getElementById("charName");
    let homeProvinceInput = document.getElementById("homeProvince");

    // error paragraphs under each input
    let errorMessages = document.querySelectorAll("#registerForm .message");

    // clear out old errors before check again
    charNameInput.classList.remove("errorInput");
    homeProvinceInput.classList.remove("errorInput");
    for (let msg of errorMessages) {
        msg.classList.remove("error");
    }

    let isValid = true;

    // make sure name isn't blank
    if (charNameInput.value === "") {
        charNameInput.classList.add("errorInput");
        errorMessages[0].classList.add("error");
        isValid = false;
    }

        if (homeProvinceInput.value === "") {
        homeProvinceInput.classList.add("errorInput");
        errorMessages[1].classList.add("error");
        isValid = false;
    }

        if (isValid) {
        localStorage.setItem("charName", charNameInput.value);
        localStorage.setItem("homeProvince", homeProvinceInput.value);

        showGreeting();

        // clear the fields
        charNameInput.value = "";
        homeProvinceInput.value = "";
    }
}

// updates the h2 to the greeting and hides the form
function showGreeting() {
    let greeting = document.getElementById("greeting");
    let registerForm = document.getElementById("registerForm");

    greeting.textContent = `Welcome to Skyrim, ${localStorage.getItem("charName")} of ${localStorage.getItem("homeProvince")}!`;
    registerForm.classList.add("hidden");
}


// ---------------------------------------------------------
// AJAX / JSON - RACE CARDS
// fetches races.json and builds a card for each race
function loadRaces() {
    let racesContainer = $("#races-container");

    $.ajax({
        url: "races.json",
        dataType: "json"
    }).done(function (data) {
        // loop through the data and build the html string
        let html = "";

        for (let i = 0; i < data.length; i++) {
            html += `
                <div class="race-card">
                    <h3>${data[i].name}</h3>
                    <span class="bonus">${data[i].bonus}</span>
                    <p>${data[i].desc}</p>
                </div>`;
        }

        // add to page
        racesContainer.html(html);

    }).fail(function (jqXHR) {
        // something went wrong with the request
        racesContainer.html("<p>There was a problem loading the race data. Please try again later.</p>");
        console.error(jqXHR.responseText);
    });
}


// ---------------------------------------------------------
// run everything on page load
$(function () {

    // init the slick carousel
    $("#carouselSlider").slick({
        autoplay: true,
        dots: true,
        arrows: true
    });

    // init the accordion - collapsible and closed by default
    $("#playstyleAccordion").accordion({
        collapsible: true,
        active: false
    });

    // if there's already a name in storage, skip the form
    if (localStorage.getItem("charName")) {
        showGreeting();
    }

    // load the race cards
    loadRaces();

    // listen for the register button click
    document.getElementById("registerBtn").addEventListener("click", registerAdventurer);

});