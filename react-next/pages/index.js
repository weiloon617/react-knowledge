import React, { Component } from 'react'

// NextJs
import Link from 'next/link'
import Router from 'next/router'

class indexPage extends Component {

    

  render() {
    return (
      <div>
        {/*<h1>The Main Page of {this.props.appName}</h1>*/}
        <h1>The Main Page</h1>
        <p>
          Go to{' '}
          <Link href="/auth">
            <a>Auth</a>
          </Link>
          <button onClick={() => Router.push('/auth')}>Go to auth</button>
        </p>
      </div>
    )
  }
}
export default indexPage
