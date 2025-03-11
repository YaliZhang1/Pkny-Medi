import "../styles/topMenu.css";

export default function TopMenu() {
  return (
    <div className="topMenu">
      <div className="topSearch">
        <img className="searchIcon" src="./search.svg" alt="Search" />
        <input className="searchBar" type="text" placeholder="Search" />
      </div>
      <img className="avatar" src="./small-doctor.png" alt="Avatar" />
    </div>
  );
}
