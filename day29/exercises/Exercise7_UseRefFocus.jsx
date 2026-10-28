import { useState, useEffect, useRef } from "react";

/**
 * Exercise 7: Focus a search input on mount with useRef,
 * and note why the focus call has to be inside an effect.
 *
 * ============================================================================
 * WHY THE FOCUS CALL HAS TO BE INSIDE AN EFFECT:
 * ============================================================================
 * 1. Render Phase vs Commit Phase:
 *    During the component's render phase (when the function executes and returns JSX),
 *    React is only evaluating JSX into virtual DOM descriptors.
 *    The physical browser DOM node has NOT yet been created, inserted, or painted.
 *
 * 2. Ref is null during initial render:
 *    `searchInputRef.current` evaluates to `null` during the initial render phase.
 *    Calling `searchInputRef.current.focus()` during render throws:
 *    "TypeError: Cannot read properties of null (reading 'focus')".
 *
 * 3. Side Effect Separation:
 *    Imperatively focusing a DOM input is a side effect that modifies browser state.
 *    React render functions must remain pure and free of side effects.
 *
 * 4. Timing of useEffect:
 *    `useEffect` runs *after* React has completed the commit phase, mounted the DOM
 *    elements, and painted the screen. At this point, `searchInputRef.current` points
 *    to the real HTML `<input>` element, making `.focus()` 100% safe and reliable.
 * ============================================================================
 */
export default function Exercise7_UseRefFocus() {
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);

  // Focus search input on mount
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  return (
    <div className="exercise-card">
      <h3>Exercise 7: Focus Search Input on Mount with useRef</h3>
      <p>The input below is automatically focused as soon as the component mounts:</p>
      <div className="search-group">
        <label htmlFor="search-input">Search Addis Eats: </label>
        <input
          id="search-input"
          ref={searchInputRef}
          type="search"
          placeholder="Search menu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <p>
        Current input: <strong>{searchTerm || "(empty)"}</strong>
      </p>
    </div>
  );
}
