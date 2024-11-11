document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "http://localhost:3000/jokebook";

  // Fetch and display categories for the joke form
  async function getCategories() {
    try {
      const response = await fetch(`${apiUrl}/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      if (result.error) {
        showToast(result.error, true); // Show error toast
      } else {
        const categorySelect = document.getElementById("category-select");
        result.data.forEach((category) => {
          const option = document.createElement("option");
          option.value = category.name;
          option.textContent = category.name;
          categorySelect.appendChild(option);
        });
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      showToast("Failed to fetch categories", true);
    }
  }

  // Handle form submission to add a new joke
  document.getElementById("joke-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const setup = document.getElementById("setup").value;
    const delivery = document.getElementById("delivery").value;
    const category = document.getElementById("category-select").value;

    try {
      const response = await fetch(`${apiUrl}/joke/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ setup, delivery, category }),
      });

      const result = await response.json();

      if (result.error) {
        showToast(result.error, true); // Show error toast
      } else {
        showToast("Joke added successfully!", false);
        document.getElementById("setup").value = "";
        document.getElementById("delivery").value = "";
        document.getElementById("category-select").selectedIndex = 0;
      }
    } catch (error) {
      console.error("Error adding joke:", error);
      showToast("Failed to add joke", true);
    }
  });

  // Function to show a toast message
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

  getCategories();
});
