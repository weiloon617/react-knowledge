import React, { Component } from 'react'
import { func, number, string } from 'prop-types'

// High Order Component
import Aux from '../../../hoc/AuxComponent'
import withClass from '../../../hoc/WithClass'

// Styling
import classes from './Person.module.css'

// Context
import AuthContext from '../../../context/auth-context'

class Person extends Component {
  constructor(props) {
    super(props)
    this.inputElementRef = React.createRef()
  }

  // only class based component can use static contextType
  static contextType = AuthContext

  componentDidMount() {
    this.inputElementRef.current.focus()
  }

  render() {
    console.log('[Person.js] rendering')
    return (
      <Aux>
        {this.context.authenticated ? (
          <p>Authenticated!</p>
        ) : (
          <p>Please log in</p>
        )}
        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p>{this.props.children}</p>
        <input
          /*ref={inputEl => {
            this.inputElement = inputEl
          }}*/
          ref={this.inputElementRef}
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </Aux>
    )
  }
}

Person.propTypes = {
  changed: func,
  click: func,
  age: number,
  name: string,
}

export default withClass(Person, classes.Person)
