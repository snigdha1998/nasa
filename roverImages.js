import React from 'react'
export default (props) => {
    let imageRenderer = props.images.map((image) => {
        console.log(image.img_src)

        return <div key={image.id} className="rover-image-wrapper">
                    <p>{image.camera.name}: {image.earth_date}</p>
                    <img className="rover-image" src={image.img_src} />
                </div>
    })
    return (
        <div className="rover-wrapper">
            {imageRenderer}
        </div>
    )
}
