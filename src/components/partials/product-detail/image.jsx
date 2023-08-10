import React from 'react';
import '../../../index.css';
import ReactImageMagnify from 'react-image-magnify';

const Image = (props) => {
    return(
            <ReactImageMagnify {...{
                smallImage: {
                    alt: 'Wristwatch by Ted Baker London',
                    isFluidWidth: false,
                    width: 350,
                    height: 350,
                    src: `${props.image}`
                },
                largeImage: {
                    src: `${props.image}`,
                    width: 1200,
                    height: 800,
                }
            }} 
            enlargedImageStyle={{height: '100px', width: '100px'}}
            enlargedImageContainerStyle={{zIndex: '5', height:'100px', width: '100px'}}
            imageStyle={{height: '20px', width: '20px'}}
            />
        )
}

export default Image;