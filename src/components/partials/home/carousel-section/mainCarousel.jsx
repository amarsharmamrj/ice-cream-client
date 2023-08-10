import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
// import image1 from '../../../../assets/carousel-images/carousel1.jpg' 
// import image2 from '../../../../assets/carousel-images/carousel2.jpg'
// import image3 from '../../../../assets/carousel-images/carousel3.jpg'
// import image4 from '../../../../assets/carousel-images/carousel4.jpg'
// import image5 from '../../../../assets/carousel-images/carousel5.jpg'

import image1 from '../../../../assets/c1.jpg' 
import image2 from '../../../../assets/c2.jpg'
import image3 from '../../../../assets/c3.jpg'
import image4 from '../../../../assets/c4.jpg'

const carouselList = [
    {source: image1, title: 'image1'},
    {source: image2, title: 'image2'},
    {source: image3, title: 'image3'},
    {source: image4, title: 'image4'},
]

const mainCarousel = () => {
    return (
        <Carousel
            autoPlay={true}
            interval={2500}
            animationHandler={'fade'}
            stopOnHover={false}
            showThumbs={false}
            infiniteLoop={true}
            style={{padding: 0}}
        >
            {
                carouselList.map((item) => {
                    return (
                        <div>
                            <img src={item.source} className="main-carousel-image" alt={item.title} />
                        </div>
                    )
                })
            }
        </Carousel>
    )
} 

export default mainCarousel;