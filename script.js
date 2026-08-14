const bakeryItems = [
    { name: "Country Sourdough", category: "Bread" },
    { name: "Honey Wheat Bread", category: "Bread" },
    { name: "Butter Croissant", category: "Pastry" },
    { name: "Cinnamon Roll", category: "Pastry" },
    { name: "Chocolate Celebration Cake", category: "Cake" },
    { name: "Vanilla Berry Cake", category: "Cake" }
];

const favoriteMessages = [
    "Great choice!",
    "That is one of our bakery favorites!",
    "We will remember your favorite for next time!"
];

const storageKeys = {
    favoriteItem: "northStarFavoriteItem"
};

const validationMessages = {
    nameRequired: "Please enter your name.",
    emailRequired: "Please enter your email address.",
    emailInvalid: "Please enter a valid email address."
};

function createFavoriteFeature() {
    const productsHeading = document.querySelector("h1");

    if (!productsHeading || !document.title.includes("Products")) {
        return;
    }

    const main = document.querySelector("main");

    const section = document.createElement("section");
    section.id = "favorite-section";

    const heading = document.createElement("h2");
    heading.textContent = "Choose Your Favorite Bakery Item";

    const description = document.createElement("p");
    description.textContent =
        "Select your favorite item and North Star Bakery will remember your choice.";

    const label = document.createElement("label");
    label.setAttribute("for", "favorite-item");
    label.textContent = "Favorite Item:";

    const select = document.createElement("select");
    select.id = "favorite-item";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select an item";
    select.append(defaultOption);

    bakeryItems.forEach(function (item) {
        const option = document.createElement("option");
        option.value = item.name;
        option.textContent = item.name + " - " + item.category;
        select.append(option);
    });

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Save Favorite";

    const result = document.createElement("p");
    result.id = "favorite-message";

    button.addEventListener("click", function () {
        saveFavorite(select, result);
    });

    section.append(heading, description, label, select, button, result);
    main.prepend(section);

    loadFavorite(select, result);
}

function saveFavorite(select, result) {
    const selectedItem = select.value;

    if (selectedItem === "") {
        result.textContent = "Please choose a bakery item first.";
        return;
    }

    localStorage.setItem(storageKeys.favoriteItem, selectedItem);

    const message =
        favoriteMessages[Math.floor(Math.random() * favoriteMessages.length)];

    result.textContent =
        message + " Your saved favorite is " + selectedItem + ".";
}

function loadFavorite(select, result) {
    const savedFavorite = localStorage.getItem(storageKeys.favoriteItem);

    if (savedFavorite) {
        select.value = savedFavorite;
        result.textContent =
            "Welcome back! Your saved favorite is " + savedFavorite + ".";
    }
}

function showError(field, message) {
    let error = document.getElementById(field.id + "-error");

    if (!error) {
        error = document.createElement("p");
        error.id = field.id + "-error";
        error.className = "error-message";
        field.insertAdjacentElement("afterend", error);
    }

    error.textContent = message;
}

function clearError(field) {
    const error = document.getElementById(field.id + "-error");

    if (error) {
        error.textContent = "";
    }
}

function validateContactForm() {
    const form = document.querySelector("form");

    if (!form) {
        return;
    }

    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");

    form.addEventListener("submit", function (event) {
        let isValid = true;

        clearError(nameField);
        clearError(emailField);

        if (nameField.value.trim() === "") {
            showError(nameField, validationMessages.nameRequired);
            isValid = false;
        }

        if (emailField.value.trim() === "") {
            showError(emailField, validationMessages.emailRequired);
            isValid = false;
        } else if (!emailField.value.includes("@")) {
            showError(emailField, validationMessages.emailInvalid);
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
        }
    });

    nameField.addEventListener("input", function () {
        clearError(nameField);
    });

    emailField.addEventListener("input", function () {
        clearError(emailField);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    createFavoriteFeature();
    validateContactForm();
});
