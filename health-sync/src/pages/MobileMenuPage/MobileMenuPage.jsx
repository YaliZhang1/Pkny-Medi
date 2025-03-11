import "./MobileMenuPage.css";
import LeftNavigation from "../../components/LeftNavigation";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

export default function MobileMenuPage() {
    const navigate = useNavigate();
    const handleClosePageButton=()=>{
        navigate('/dashboard')
    }
  return (
    <div className="mobile-menu-page">
      <Header />
      <button className="closeButton" onClick={handleClosePageButton}>
        <img src="./multiplication.jpg" alt="" />
      </button>
      <LeftNavigation />
    </div>
  );
}
