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
  const dimensionW = "78px";
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
    transition: "transform 0.6s",
    transformStyle: "preserve-3d",
    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
  };

  const faceStyle = (isBack) => ({
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundImage: `url("${getBackgroundImage(isBack)}")`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backfaceVisibility: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

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

  const imgStyleBack = srcBack => ({
    width: "90%",
    height: "90%",
    zIndex: 2,
    backgroundImage: `url(${srcBack})`,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  });

  return (
    <div style={outerStyle} onClick={onClick}>
      <div style={flipContainerStyle}>
        <div style={faceStyle(false)}>
          <div style={borderStyle}></div>
          <img src={srcFront} alt={alt} style={imgStyle} />
        </div>
        <div style={{ ...faceStyle(true), transform: "rotateY(180deg)" }}>
          <div style={borderStyle}></div>
          <div style={imgStyleBack(srcBack)}></div>
        </div>
      </div>
    </div>
  );
}


export default Hexagon;
