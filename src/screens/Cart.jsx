import React from 'react'
import { connect } from 'react-redux'

const Cart = ({ cart }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="row-lg-3"></div>
        <div className="row-lg-6">
          <div className="row">{cart.title}</div>
          <div className="row">{cart.authors}</div>
          <div className="row">{cart.average_rating}</div>
        </div>
        <div className="row-lg-3">
          <div className="row">{cart.price}</div>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
  }
}
export default connect(mapStateToProps)(Cart)
