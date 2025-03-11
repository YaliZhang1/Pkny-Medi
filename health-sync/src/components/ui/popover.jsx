import React, { useState, useRef, useEffect } from "react";

const Popover = ({ trigger, children }) => {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="popover-container" ref={popoverRef}>
      <div className="popover-trigger" onClick={() => setOpen(!open)}>
        {trigger}
      </div>
      {open && <div className="popover-content">{children}</div>}
    </div>
  );
};

export default Popover;
