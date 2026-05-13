import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h6 className="sidebar-title">Dashboard</h6>

      <ul className="sidebar-menu">
        <li>
          <NavLink to="/home" className={({ isActive }) => isActive ? "active-link" : ""}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/profile" className={({ isActive }) => isActive ? "active-link" : ""}>
            My Profile
          </NavLink>
        </li>

        <li>
          <NavLink to="/my-recipes" className={({ isActive }) => isActive ? "active-link" : ""}>
            My Recipes
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
