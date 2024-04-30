// StarRateApp.js

import React, { useState } from "react";
import './star.css';
import { FaStar } from "react-icons/fa";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
};

function StarRateApp({ onStarSelect }) {
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(7).fill(0);

    const handleClick = value => {
        setCurrentValue(value);
        onStarSelect(value); // Pass the selected star rating to the parent component
    };

    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue);
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined);
    };

    const types = {
        // 0 : "çok kötü",
        // 1: "biraz kötü",
        // 2 : "orta",
        // 3: "iyi",
        // 4 : "çok iyi"
    }


    return (
        <div style={styles.container}>
            <div style={styles.stars}>
                {stars.map((_, index) => (
                     <div className="d-flex flex-column align-items-center justify-content-end px-2">
                    <FaStar
                        key={index}
                        size={24}
                        onClick={() => handleClick(index + 1)}
                        onMouseOver={() => handleMouseOver(index + 1)}
                        onMouseLeave={handleMouseLeave}
                        color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                        style={{ marginRight: 10, cursor: "pointer" }}
                    />
                    <hr className="w-100"/>
                    {types[index] && <span>{types[index]}</span>}
                    </div>
                ))}
            </div>
            <textarea
                placeholder="?"
                style={styles.textarea}
            />
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    stars: {
        
        display: "flex",
        flexDirection: "row",
    },
    textarea: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        padding: 10,
        margin: "20px 0",
        minHeight: 50,
        width: 300
    }
};

export default StarRateApp;
