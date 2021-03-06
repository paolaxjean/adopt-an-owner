// Validate user input and send login request
const handleSignupSubmit = async (event) => {
  event.preventDefault();
  try {
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();
    const fullName  = document.querySelector("#name").value.trim();
    const age  = document.querySelector("#user-age").value.trim();
    const desiredPet  = document.querySelector("#desired-pet").value.trim();
    const familySize  = document.querySelector("#family-size").value.trim();
    const income  = document.querySelector("#income").value.trim();
    const bio  = document.querySelector("#bio").value.trim();


    if (!email || !password) {
      alert("You must provide a email and password.");
      return;
    }

    if (password.length < 8){
      alert("Password must be more than eight characters")
    }

    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, name: fullName, age, desired_pet: desiredPet,family_size: familySize, income,bio }),
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
