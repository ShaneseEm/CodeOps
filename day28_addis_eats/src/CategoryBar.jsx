import PropTypes from "prop-types";

// Ex 3 — CategoryBar receives selected + onSelect (state lifted from Menu)
function CategoryBar({ categories, selected, onSelect }) {
  return (
    <nav className="category-nav">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`cat-btn${cat === selected ? " active" : ""}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </nav>
  );
}

CategoryBar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected:   PropTypes.string.isRequired,
  onSelect:   PropTypes.func.isRequired,
};

export default CategoryBar;
