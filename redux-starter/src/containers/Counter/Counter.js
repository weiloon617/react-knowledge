import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/'

import CounterControl from '../../components/CounterControl/CounterControl'
import CounterOutput from '../../components/CounterOutput/CounterOutput'

class Counter extends Component {
  render() {
    return (
      <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl
          label="Increment"
          clicked={this.props.onIncrementCounter}
        />
        <CounterControl
          label="Decrement"
          clicked={this.props.onDecrementCounter}
        />
        <CounterControl label="Add 5" clicked={this.props.onAddCounter} />
        <CounterControl label="Subtract 5" clicked={this.props.onSubCounter} />
        <hr />
        <button onClick={() => this.props.onStoreResult(this.props.ctr)}>
          Store Result
        </button>
        <ul>
          {this.props.results.map(item => (
            <li
              onClick={() => this.props.onDeleteResult(item.id)}
              key={item.id}
            >
              {item.value}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ ctr, res }) => {
  return { ctr: ctr.counter, results: res.results }
}

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch(actionCreators.increment()),
    onDecrementCounter: () => dispatch(actionCreators.decrement()),
    onAddCounter: () => dispatch(actionCreators.add(5)),
    onSubCounter: () => dispatch(actionCreators.sub(5)),
    onStoreResult: res => dispatch(actionCreators.storeResult(res)),
    onDeleteResult: id => dispatch(actionCreators.deleteResult(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Counter)
