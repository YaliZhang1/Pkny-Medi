import "../styles/header.css";
import TopMenu from "./TopMenu";
import React from 'react';


export default function Header() {
  return (
    <div className="headerContainer">
      <img className="logo" src="./logo.png" alt="" />
      <TopMenu/>
    </div>
  );
}
