import React, { Component } from 'react'

require('./loader.css')

export const Loader = (props) => {
  
    return (
      <div className="loader-main-hp">
      <div className="loader-box">
        <div
          className={
            'loader-hp ' +
            (props.smaller ? 'small ' : null) +
            (props.invert ? 'inverted ' : null)
          }
        ></div>
        </div>
      </div>
    )
  
}
