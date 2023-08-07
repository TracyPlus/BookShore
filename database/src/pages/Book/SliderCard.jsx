import React from "react";
import { Carousel } from 'antd';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import slider1 from '../../styles/slider1.jpg'
import slider2 from '../../styles/slider2.jpg'
import slider3 from '../../styles/slider3.jpg'
import slider5 from '../../styles/slider5.jpg'
import slider9 from '../../styles/slider9.jpg'
import slider10 from '../../styles/slider10.jpg'

import { slideImg, slidewrapper} from "./BookCard.module.css"

export default function SliderCard () {
  return (
    <div className={slidewrapper}>
      <Carousel autoplay>
        <div>
            <img src={slider1} alt="" className={slideImg}/>
        </div>
        <div>
            <img src={slider2} alt="" className={slideImg}/>
        </div>
        <div>
            <img src={slider3} alt="" className={slideImg}/>
        </div>
        <div>
            <img src={slider5} alt="" className={slideImg}/>
        </div>
        <div>
            <img src={slider9} alt="" className={slideImg}/>
        </div>
        <div>
            <img src={slider10} alt="" className={slideImg}/>
        </div>
      </Carousel>
      </div>
  );
}

