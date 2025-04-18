import React, { useState } from "react";
import perfilImg from "../../../src/assets/point-removed.png";
import outroPerfil from "../../../src/assets/SoftExtendedLogoBlue.png";

function Hexagon({ size = 200, srcFront = perfilImg, srcBack = outroPerfil, alt = "Hexagon Image" }) {
  const [flipped, setFlipped] = useState(false);

  const dimensionW = "78px";
  const dimensionH = typeof size === "number" ? `${size * 0.866}px` : size;

  const borderWidth = 3.5;

  const outerStyle = {
    width: dimensionW,
    height: dimensionH,
    perspective: "1000px",
    cursor: "pointer",
  };

  const flipContainerStyle = {
    width: "100%",
    height: "100%",
    position: "relative",
    transition: "transform 0.8s",
    transformStyle: "preserve-3d",
    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
  };

  const svgEncodedPath =
    'data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20100%20115.47%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20fill%3D%22black%22%20d%3D%22M50%2C2%20Q52%2C2%2054%2C4%20L93%2C27.73%20Q95%2C29%2095%2C32%20L95%2C83.47%20Q95%2C86%2093%2C87.73%20L54%2C111.47%20Q52%2C113%2050%2C113%20Q48%2C113%2046%2C111.47%20L7%2C87.73%20Q5%2C86%205%2C83.47%20L5%2C32%20Q5%2C29%207%2C27.73%20L46%2C4%20Q48%2C2%2050%2C2%20Z%22/%3E%3C/svg%3E';

  const gradientEncodedPath = svgEncodedPath; 

  const faceStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    WebkitMaskImage: `url("${svgEncodedPath}")`,
    WebkitMaskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskImage: `url("${svgEncodedPath}")`,
    maskSize: "100% 100%",
    maskRepeat: "no-repeat",
    maskPosition: "center",
    backfaceVisibility: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const borderStyle = {
    position: "absolute",
    top: borderWidth,
    left: borderWidth,
    right: borderWidth,
    bottom: borderWidth,
    background: "linear-gradient(to right, #0075FF, #00c8ff)",
    WebkitMaskImage: `url("${gradientEncodedPath}")`,
    WebkitMaskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskImage: `url("${gradientEncodedPath}")`,
    maskSize: "100% 100%",
    maskRepeat: "no-repeat",
    maskPosition: "center",
    zIndex: 1,
  };

  const imgStyle = {
    width: "35%",
    height: "35%",
    zIndex: 2,
  };

  return (
    <div style={outerStyle} onClick={() => setFlipped(!flipped)}>
      <div style={flipContainerStyle}>
        <div style={{ ...faceStyle }}>
          <div style={borderStyle}></div>
          <img src={srcFront} alt={alt} style={imgStyle} />
        </div>
        <div style={{ ...faceStyle, transform: "rotateY(180deg)" }}>
          <div style={borderStyle}></div>
          <img src={srcBack} alt="Verso" style={imgStyle} />
        </div>
      </div>
    </div>
  );
}

export default Hexagon;
