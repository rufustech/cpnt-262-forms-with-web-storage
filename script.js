// Load cookie preferences
window.onload = loadCookiePreferences;

document
  .getElementById("profile-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Common Variable
    const isRememberPreferences = document.getElementById("remember").checked;
    const userData = document.getElementById("username").value;
    const userColor = document.getElementById("color").value;
    const fontData = document.getElementById("font-size").value;

    saveLocalStorage(userData, userColor);
    saveFontSize(fontData);
    setCookie(userData, isRememberPreferences);
  });

// Function to set cookie
function setCookie(userData, isRememberPreferences) {
  if (isRememberPreferences === true) {
    document.cookie = `userData=${encodeURIComponent(
      userData
    )}; max-age=300; path=/`;
    console.log("Cookie  Set:", document.cookie);
  } else {
    console.log("user dont want yummy cookies");
  }
}
// save to local storage username and font
function saveLocalStorage(userData, userColor) {
  localStorage.setItem("username", userData);
  localStorage.setItem("color", userColor);
}
// Session for font
function saveFontSize(fontData) {
  sessionStorage.setItem("myFontSessionData", fontData);
}

function loadCookiePreferences() {
  const cookieUser = getCookie("userData");
  if (cookieUser) {
    document.getElementById("username").value = decodeURIComponent(cookieUser);
  }

  // Load userColor and font-size from storage
  const storedUsername = localStorage.getItem("username");
  const storedColor = localStorage.getItem("color");
  if (storedUsername) {
    document.getElementById("username").value = storedUsername;
  }
  if (storedColor) {
    document.getElementById("color").value = storedColor;
    document.body.style.backgroundColor = storedColor;
  }

  const savedfontSize = sessionStorage.getItem("myFontSessionData");
  if (savedfontSize) {
    document.body.style.fontSize = `${savedfontSize}px`;
    document.getElementById("font-size").value = savedfontSize;
  }
}

// Get Cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift(); 
}
