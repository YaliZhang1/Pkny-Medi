import "../styles/header.css";
import TopMenu from "./TopMenu";

export default function Header() {
  return (
    <div className="headerContainer">
      <img className="logo" src="./logo.png" alt="" />
      <TopMenu/>
    </div>
  );
}
