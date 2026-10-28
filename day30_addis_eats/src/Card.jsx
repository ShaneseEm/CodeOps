import PropTypes from "prop-types";

// Card — wrapper component that renders whatever children it receives
function Card({ children }) {
  return <div className="card">{children}</div>;
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
