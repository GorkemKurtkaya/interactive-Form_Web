import React, { useEffect, useState } from "react";
import "./containernavbar.css";


export default function ContainerNavbar({ selectedCategory, setSelectedCategory }) {
    const [menu, setMenu] = useState("Formlar");
  
    useEffect(() => {
      setSelectedCategory(menu);
    }, [menu]);

    return (
      <div className="gorkem-navbar">
        <ul className="gorkem-nav-menu">
          <li onClick={() => { setMenu("Formlar"); setSelectedCategory("Formlar"); }}>
            Formlar {menu === "Formlar" ? <hr /> : <></>}
          </li>
          <li onClick={() => { setMenu("Yanıtlar"); setSelectedCategory("Yanıtlar"); }}>
            Yanıtlar {menu === "Yanıtlar" ? <hr /> : <></>}
          </li>
        </ul>
  
        {selectedCategory === "deneme" && <div>deneme</div>}
      </div>
    );
  }