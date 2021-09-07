import React from 'react'
import { Carousel } from "react-bootstrap"

const Slider = (props) => {
    const images = props.images;

    return (
        <div >
            <Carousel> 
                {
                    images.map((image, index) => (
                        <Carousel.Item key={index}> 
                            <img className="d-block w-100"
                            src={`/halisahaResimler/${image}`}
                            alt="first slide"
                            />
                        </Carousel.Item>
                    ))
                }

            </Carousel>


            
        </div>
    )
}




export default Slider
