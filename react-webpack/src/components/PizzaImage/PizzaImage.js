import React from 'react'

// Styling
import classes from './PizzaImage.css'
import PizzaImage from '../../assets/pizza.jpg'

const pizzaImage = props => (
  <div className={classes.PizzaImage}>
    <img src={PizzaImage} className={classes.PizzaImg} alt="" />
  </div>
)

export default pizzaImage
