import PropTypes from "prop-types";

function CategoryBar({ categories, selected, onSelect }) {
  return (
    <nav className="category-nav">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
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
