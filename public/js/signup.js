// Validate user input and send login request
const handleSignupSubmit = async (event) => {
  event.preventDefault();
  try {
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();
    const fullName  = document.querySelector("#full-name").value.trim();
    const age  = document.querySelector("#user-age").value.trim();
    const desirePet  = document.querySelector("#desired-pet").value.trim();
    const familySize  = document.querySelector("#family-size").value.trim();
    const income  = document.querySelector("#income").value.trim();
    const bio  = document.querySelector("#bio").value.trim();
    const confirmPassword = document
      .querySelector("#confirm-password")
      .value.trim();

    if (!username || !password) {
      alert("You must provide a username and password.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords to not match.");
      return;
    }

    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, password,fullName,age,desirePet,familySize,income,bio }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      alert("Failed to sign up.");
      return;
    }

    // go to home page
    window.location.replace("/");
  } catch (error) {
    console.log(error);
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", handleSignupSubmit);
