import React, { useEffect, memo, useRef, useContext } from 'react'

// Styling
import classes from './Cockpit.module.css'

// Context
import AuthContext from '../../context/auth-context'

const Cockpit = props => {
  const toggleButtonRef = useRef(null)
  const authContext = useContext(AuthContext)

  useEffect(() => {
    console.log('[Cockpit.js] useEffect')
    // Http request...
    // setTimeout(() => alert('Save data to cloud'), 1000)
    toggleButtonRef.current.click()
    return () => {
      console.log('[Cockpit.js] cleanup work in useEffect')
    }
  }, [])

  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect')
    return () => {
      console.log('[Cockpit.js] 2nd cleanup work in useEffect')
    }
  })

  const assignedClasses = []
  let btnClass = ''

  if (props.showPersons) {
    btnClass = classes.Red
  }

  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red)
  }

  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold)
  }

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>This is really working!</p>
      <button
        ref={toggleButtonRef}
        className={btnClass}
        onClick={props.clicked}
      >
        Toggle Persons
      </button>
      <button onClick={authContext.login}>Log in</button>
    </div>
  )
}

// memo act as shouldComponentUpdate in checking the update in functional Component
export default memo(Cockpit)
