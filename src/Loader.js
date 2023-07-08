import React, { useEffect } from "react";
import './Loader.css'
import { loaderAnim } from "./anim";

const Loader=() =>{

    useEffect(()=>{
        loaderAnim()
    },[]);

    return(
            <div className="preloader">
                <div className="texts-container">
                <span>Cargando</span>
                <span>.</span>
                <span>.</span>
                <span>.</span>
                </div>
            </div>
    );
}

export default Loader;