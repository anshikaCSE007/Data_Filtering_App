import React,{useState}from 'react'
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "./HomePage.css"

function Image({thumbnail,large}) {
    const [isOpen, setOpen] = useState(false);
    return (
        <>
            <img className="zoomA" src={thumbnail} alt=""  onClick={()=>setOpen(true)}/>{isOpen && (<Lightbox  mainSrc={large}onCloseRequest={()=>setOpen(false)}></Lightbox>)}
        </>
    )
}

export default Image
