document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "http://localhost:3000/jokebook";

  // Fetch and display a random joke
  async function getRandomJoke() {
    try {
      const response = await fetch(`${apiUrl}/randomJoke`);
      const result = await response.json();

      if (result.error) {
        showToast(result.error, true); // Show error toast
      } else {
        const jokeElement = document.getElementById("random-joke-text");
        const { setup, delivery } = result.data; // Assuming it's an array
        jokeElement.textContent = `${setup} - ${delivery}`;
      }
    } catch (error) {
      console.error("Error fetching random joke:", error);
      showToast("Failed to fetch random joke", true);
    }
  }

  function showToast(message, error) {
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.textContent = message;
    if (error) {
      toast.classList.add("toast-error");
    } else {
      toast.classList.add("toast-success");
    }
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  getRandomJoke();
  getCategories();
});
