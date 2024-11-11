document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "http://localhost:3000/jokebook";
  const jokeList = document.getElementById("category-joke-list");
  const categorySearchInput = document.getElementById("category-search-input");
  const categorySelect = document.getElementById("category-select");
  const searchButton = document.getElementById("search-btn");
  const limitSelect = document.getElementById("limit-select");

  // Fetch and display jokes for a specific category
  async function getJokesByCategory(category, limit = 10) {
    try {
      const response = await fetch(`${apiUrl}/joke/${category}?limit=${limit}`);
      const result = await response.json();

      if (result.error) {
        showToast(result.error, true);
      } else {
        jokeList.innerHTML = "";
        result.data.forEach((joke) => {
          const listItem = document.createElement("li");
          listItem.textContent = `${joke.setup} - ${joke.delivery}`;
          jokeList.appendChild(listItem);
        });
      }
    } catch (error) {
      console.error("Error fetching jokes:", error);
      showToast("Failed to fetch jokes", true);
    }
  }

  // Function to show a toast message
  function showToast(message, error = false) {
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

  // Fetch categories from the API and populate the select dropdown
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
        showToast(result.error, true);
      } else {
        result.data.forEach((category) => {
          const option = document.createElement("option");
          option.value = category.name;
          option.textContent = category.name;
          categorySelect.appendChild(option);
        });

        // Set the default category and fetch jokes for it
        const defaultCategory = result.data[0]?.name || "";
        categorySearchInput.value = defaultCategory;
        categorySelect.value = defaultCategory;
        getJokesByCategory(defaultCategory, limitSelect.value);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      showToast("Failed to fetch categories", true);
    }
  }

  // Search button click event
  searchButton.addEventListener("click", () => {
    const category = categorySearchInput.value.trim();
    const limit = limitSelect.value;
    if (category) {
      getJokesByCategory(category, limit);
    } else {
      showToast("Please enter a category to search.", true);
    }
  });

  // Handle category select change event
  categorySelect.addEventListener("change", () => {
    const selectedCategory = categorySelect.value;
    categorySearchInput.value = selectedCategory;
    getJokesByCategory(selectedCategory, limitSelect.value);
  });

  // Load categories and jokes for the default category
  getCategories();
  categorySearchInput.addEventListener("input", () => {
    // Create the 'Select a category' option
    const selectOption = document.createElement("option");
    selectOption.value = "";
    selectOption.textContent = "Select a category";

    if (
      !Array.from(categorySelect.options).some((option) => option.value === "")
    ) {
      categorySelect.insertBefore(selectOption, categorySelect.firstChild);
    }

    categorySelect.value = "";
  });

  // Optionally, listen for changes in the limit selection
  limitSelect.addEventListener("change", () => {
    const category = categorySearchInput.value.trim();
    const limit = limitSelect.value;
    if (category) {
      getJokesByCategory(category, limit);
    }
  });
});
