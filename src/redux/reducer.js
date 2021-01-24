const defaultState = {
  books: [],
  cart: [],
}

function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'SET_BOOKS':
      return {
        ...state,
        books: action.payload,
      }

    case 'ADD_TO_CART':
      let duplicateCart = [...state.cart]
      let cartIndex = duplicateCart.findIndex(
        (book) => book.bookID === action.payload.bookID,
			)
      if (cartIndex === -1) {
        duplicateCart.push({ ...action.payload, count: 1 })
      } else {
        duplicateCart[cartIndex].count += 1
      }
      return {
        ...state,
        cart: duplicateCart,
      }
    case 'REMOVE_FROM_CART':
      duplicateCart = [...state.cart]
      cartIndex = duplicateCart.findIndex(
        (book) => book.bookID === action.payload.bookID,
      )
      if (cartIndex === -1) {
        console.log('Element Not found in cart')
      } else {
        if (duplicateCart[cartIndex].count === 0) {
          duplicateCart.splice(cartIndex, 1)
        } else {
          duplicateCart[cartIndex].count -= 1
        }
      }
      return {
        ...state,
        cart: duplicateCart,
      }
    case 'EMPTY_CART':
      return {
        ...state,
        cart: [],
      }
    default:
      return state
  }
}

export default reducer
