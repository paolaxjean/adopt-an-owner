document.getElementById("btn-logout").addEventListener("click", async () => {
  try {
    await fetch("/api/users/logout", { method: "POST" });
    document.location.replace("/");
  } catch (error) {
    console.error(error);
    console.error("Failed to logout.");
  }
});
