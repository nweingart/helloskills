import PropTypes from 'prop-types';

const PublicRoute = ({ children }) => {
  return children;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default PublicRoute; 