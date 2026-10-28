/**
 * api.js - Addis Eats API client module
 * Handles fetching dishes from /dishes.json with category filtering and AbortController support.
 */

/**
 * Fetches dishes from /dishes.json
 *
 * @param {string} category - Category filter ('All', 'Main', 'Vegan', 'Grill', etc.)
 * @param {AbortSignal} [signal] - Optional AbortSignal from AbortController to cancel in-flight requests
 * @returns {Promise<Array>} Array of dish objects matching the category
 * @throws {Error} Clear error message if response is not ok or fetch fails
 */
export async function fetchDishes(category = "All", signal) {
  // Query param allows observing distinct requests and cancellations in DevTools Network tab
  const endpoint =
    category && category !== "All"
      ? `/dishes.json?category=${encodeURIComponent(category)}`
      : `/dishes.json`;

  const res = await fetch(endpoint, { signal });

  // Requirement: res.ok checked, with a message the user can actually understand
  if (!res.ok) {
    throw new Error(
      `Could not load the menu (${res.status} ${res.statusText || "Not Found"}). Please check that /dishes.json exists.`
    );
  }

  const dishes = await res.json();

  // If a specific category is chosen, filter by category
  if (category && category !== "All") {
    return dishes.filter(
      (dish) => dish.category.toLowerCase() === category.toLowerCase()
    );
  }

  return dishes;
}

export default fetchDishes;
