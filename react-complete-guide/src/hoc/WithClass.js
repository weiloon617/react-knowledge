import React from 'react'

/**
 * High Order Component
 * @param WrappedComponent
 * @param className
 * @returns {function(*): *}
 */
const withClass = (WrappedComponent, className) => {
  return props => (
    <div className={className}>
      <WrappedComponent {...props} />
    </div>
  )
}

export default withClass
