import React, { PureComponent } from 'react'

// Component
import Person from './Person/Person'

class Persons extends PureComponent {
  /*static getDerivedStateFromProps(nextProps, prevState) {
    console.log('[Persons.js] getDerivedStateFromProps')
    return prevState
  }*/

  /*shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('[Persons.js] shouldComponentUpdate')
    return (
      nextProps.persons !== this.props.persons ||
      nextProps.clicked !== this.props.clicked ||
      nextProps.changed !== this.props.changed
    )
  }*/

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Persons.js] getSnapshotBeforeUpdate')
    return { message: 'Snapshot!' }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[Persons.js] componentDidUpdate', snapshot)
  }

  componentWillUnmount() {
    console.log('[Persons.js] componentWillUnmount')
  }

  render() {
    console.log('[Persons.js] rendering')
    return this.props.persons.map((person, index) => (
      <Person
        key={person.id}
        name={person.name}
        age={person.age}
        click={() => this.props.clicked(index)}
        changed={event => this.props.changed(event, person.id)}
      />
    ))
  }
}
export default Persons
