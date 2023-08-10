import React from 'react';
import Carousel from '../components/partials/home/carousel-section/mainCarousel'
import MainHighlights from '../components/partials/home/main-highlights/mainHighlights'
import AboutUs from '../components/partials/home/aboutUs';
import ParallexOne from '../components/partials/home/parallexOne';
import WhyChooseUs from '../components/partials/home/whyChooseUs'; 
import ViewAllProducts from '../components/partials/home/viewAllProducts';
import ContactUs from '../components/partials/home/contactUs';

const Home = () => {
    document.title = 'Shimla Ice-Cream - Home'
    return (
        <div>
            <Carousel />
            <MainHighlights />
            <AboutUs /> 
            <ParallexOne />
            <WhyChooseUs />
            <ViewAllProducts />
            <ContactUs />
            {/* <ReachUs /> */}
        </div>
    )
}

export default Home;