document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "http://localhost:3000/jokebook";

  // Handle form submission to create a new category
  document.getElementById("submit-btn").addEventListener("click", async (e) => {
    e.preventDefault();
    const categoryName = document.getElementById("category-name").value;
    console.log("object", JSON.stringify({ name: categoryName }));

    try {
      const response = await fetch(`${apiUrl}/category/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName }),
      });

      const result = await response.json();
      if (result.error) {
        showToast(result.error, true); // Show error toast
      } else {
        showToast("Category created successfully!", false);
        document.getElementById("category-name").value = "";
      }
    } catch (error) {
      console.error("Error creating category:", error);
      showToast("Failed to create category", true);
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
});
