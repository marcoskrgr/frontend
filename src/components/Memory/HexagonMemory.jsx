import React from "react";
import perfilImg from "../../../src/assets/point-removed.png";
import hexagonBg1 from "../../../src/assets/hexagonbg_white.png";
import hexagonBg2 from "../../../src/assets/hexagonbg_blue.png";
import hexagonBg3 from "../../../src/assets/hexagonbg_green.png";

function Hexagon({
  size = 200,
  srcFront = perfilImg,
  srcBack,
  alt = "Hexagon Image",
  stage = 0,
  flipped = false,
  onClick,
}) {
  const dimensionW = typeof size === "number" ? `${size * 0.79}px` : size;
  const dimensionH = typeof size === "number" ? `${size * 0.866}px` : size;

  const borderWidth = 3.5;

  const getBackgroundImage = (isBack) => {
    if (isBack) {
      return stage === 3 ? hexagonBg3 : hexagonBg2;
    }
    return hexagonBg1;
  };

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
    transformStyle: "preserve-3d",
    aspectRatio: 1,
    transition: "transform 0.6s",
    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
  };

  const faceBaseStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
  };

  const frontFaceStyle = {
    ...faceBaseStyle,
    backgroundImage: `url("${getBackgroundImage(false)}")`,
    transform: "rotateY(0deg)",
    zIndex: 2,
  };

  const backFaceStyle = {
    ...faceBaseStyle,
    backgroundImage: `url("${getBackgroundImage(true)}")`,
    transform: "rotateY(180deg)",
    zIndex: 1,
  };

  const borderStyle = {
    position: "absolute",
    top: borderWidth,
    left: borderWidth,
    right: borderWidth,
    bottom: borderWidth,
    zIndex: 1,
  };

  const imgStyle = {
    width: "45%",
    height: "45%",
    zIndex: 2,
  };

  const imgStyleBack = {
    width: "90%",
    height: "90%",
    zIndex: 2,
    backgroundImage: `url(${srcBack})`,
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div style={outerStyle} onClick={onClick}>
      <div style={flipContainerStyle}>
        <div style={frontFaceStyle}>
          <div style={borderStyle}></div>
          <img src={srcFront} alt={alt} style={imgStyle} />
        </div>
        <div style={backFaceStyle}>
          <div style={borderStyle}></div>
          <div style={imgStyleBack}></div>
        </div>
      </div>
    </div>
  );
}

export default Hexagon;
