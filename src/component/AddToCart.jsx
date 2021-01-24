import React from 'react'
import { MDBIcon, MDBBtn } from 'mdbreact'
import { connect } from 'react-redux'

const AddToCart = ({ cartAmount, book, addToCart }) => {
  return (
    <div>
      {cartAmount !== 0 ? (
        <div className="row">
          <div>
            <MDBIcon far icon="minus-square" />
          </div>
          <div style={{ fontWeight: 400, padding: '0 4px' }}>{cartAmount}</div>
          <div>
            <MDBIcon far icon="plus-square" />
          </div>
        </div>
      ) : (
        <div className="row">
          <MDBBtn color="primary" size="sm" onClick={() => addToCart(book)}>
            Add To Cart
          </MDBBtn>
        </div>
      )}
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    addToCart: (book) => {
      dispatch({ type: 'ADD_TO_CART', payload: book })
    },
    removeFromCart: (book) => {
      dispatch({ type: 'REMOVE_FROM_CART', payload: book })
    },
  }
}

export default connect(null, mapDispatchToProps)(AddToCart)
