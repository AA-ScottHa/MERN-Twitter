import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions.js';

import NavBar from './navbar.js';

const mapStateToProps = state => {

  return {
    loggedIn: state.session.isAuthenticated,
  };
};

export default connect(mapStateToProps, { logout })(NavBar);
