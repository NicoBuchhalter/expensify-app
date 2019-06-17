import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startLogout } from '../actions/auth';


export const Header = ({ startLogout }) => (
  <header>
    <h1>Expensify</h1>
    <NavLink  activeClassName="is-active" exact={true} to="/dashboard">Dashboard</NavLink>
    <NavLink  activeClassName="is-active" exact={true} to="/create">Create Expense</NavLink>
    <button onClick={startLogout}>Log out</button>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);