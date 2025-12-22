import React from 'react'
import './Loader.css'

const Loader = () => {
    return (
        <div className="loader-overlay">
            <div className="swpa-loader">
                <img src="favicon.ico" alt="SWPA Logo" className="loader-logo"/>
                <span className="loader-ring"></span>
            </div>
        </div>

    )
}

export default Loader
