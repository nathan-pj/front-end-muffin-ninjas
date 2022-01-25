import React, { useContext, useEffect, useState } from "react";
import Context from '../../../contexts/Context';
import tick from '../../../images/tick.png'
import cross from '../../../images/cross.png'
import ImageArrowLeft from "./ImageArrowLeft";
import ImageArrowRight from "./ImageArrowRight";

const MainHouseImage = ({
  image,
  house,
  setCurrentImage,
  numOfImages,
  setNumOfImages,
  currentImage,
  setHouseIndex
}) => {

    const {  showTick,
        setShowTick,
        showCross,
        setShowCross } = useContext(Context);

        const [isDragged, setIsDragged] = useState(false);
const [mouseEvent, setMouseEvent] = useState()
const [mouseEventCounter, setMouseEventCounter] = useState(0)

  /*       useEffect(() => {
          if(mouseEventCounter > 0){
            onDragOver();
          }
          setMouseEventCounter(1)
        }, [mouseEvent])  */

        const onDragOver = (e) => {
         /*  console.log("tererererer") */
        /*   setMouseEvent(e) */
          e.preventDefault();
          
          if (e.screenX > window.innerWidth / 2) {
            console.log("right")
            setShowTick(true)
            setShowCross(false)
          } else {
            console.log("left")
            setShowCross(true)
            setShowTick(false)
          }
        };
      
        const onDragStart = (e) => {
          console.log("dragggg")
          setIsDragged(true);
        };
      
        const onDragEnd = (e) => {
          e.preventDefault();
          setCurrentImage(0)
          if (e.screenX > window.innerWidth / 2) {
            console.log("right = swipe");
            setHouseIndex((currentState) => currentState + 1);
          } else {
            console.log("left = skip");
            setHouseIndex((currentState) => currentState + 1);
          }
          setShowCross(false)
          setShowTick(false)
          setIsDragged(false);
        };
      
        const onTouchStart = (e) => {
          e.stopPropagation();
          setCurrentImage(0);
          setIsDragged(true);
        }; 
      
        const onTouchMove = (e) => {
          e.stopPropagation();
          if (e.changedTouches[0].pageX > window.innerWidth / 2) {
            setShowTick(true)
            setShowCross(false)
          } else {
            setShowCross(true)
            setShowTick(false)
          }
        }
        const onTouchEnd = (e) => {
          e.preventDefault();
          e.stopPropagation();
          setCurrentImage(0)
          if (e.changedTouches[0].pageX > window.innerWidth / 2) {
            setHouseIndex((currentState) => currentState + 1);
          } else {
            setHouseIndex((currentState) => currentState + 1);
          }
          setShowCross(false)
          setShowTick(false)
          setIsDragged(false);
        };

  return (
    <div className="house-card-meta">
      <div className="house-card-meta__image">

        <div className="house-card-meta__image__container"> 
        <img  draggable="true"
            onDragOver={onDragOver}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onTouchStart={onTouchStart} 
            onTouchEnd={onTouchEnd}
            onTouchMove={onTouchMove} 
      src={image.key} alt="house" />
        {showTick && <img className="house-card-meta__image__container__tick" src={tick} alt="house" />}
        {showCross && <img className="house-card-meta__image__container__cross" src={cross} alt="house" />}
        </div>

        <div className="image-buttons">
          <ImageArrowLeft
            setCurrentImage={setCurrentImage}
            currentImage={currentImage}
          />
          <ImageArrowRight
            setCurrentImage={setCurrentImage}
            currentImage={currentImage}
            numOfImages={numOfImages}
          />
        </div>
      </div>
      <div className="house-card-meta__details">
        <p>{`Price: £${house.price}`}</p>
        <p>{`Type: ${house.type} `}</p>
        <p>{`Postcode: ${house.postcode}`}</p>
      </div>
    </div>
  );
};

export default MainHouseImage;
