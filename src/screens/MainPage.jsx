import React, { Component } from 'react'
import { MDBDataTable } from 'mdbreact'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { connect } from 'react-redux'

import { fieldToLabel } from '../utility/defaults'
import ReactStars from 'react-rating-stars-component'
import AddToCart from '../component/AddToCart'
import { Link } from 'react-router-dom'

class MainPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columnName: [],
      books: [],
      selectedColumns: [],
    }
  }
  async componentDidMount() {
    const data = await fetch(
      'https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json',
      {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      },
    )
    let books = await data.json()
    books = books.map((book) => {
      const clonedBook = { ...book }
      clonedBook.average_rating = (
        <ReactStars
          count={parseFloat(book.average_rating)}
          size={24}
          isHalf={true}
          color="#ffd700"
          edit={false}
        />
      )
			let cartAmount = this.props.cart.find((c) => c.bookID === clonedBook.bookID)
			console.log(this.props)
      if (!cartAmount) {
        cartAmount = 0
      }
      clonedBook.addToCart = (
        <AddToCart cartAmount={cartAmount} book={clonedBook} />
      )
      return clonedBook
    })
    let columnName = []

    let bookElement = books[0]
    for (const key in bookElement) {
      columnName.push(key)
    }
    this.setState({
      books: books,
      columnName: [...columnName],
      selectedColumns: [...columnName],
    })
  }
  handleChange = (event) => {
    this.setState({ selectedColumns: event.target.value })
  }
  render() {
    const mdbReactDataTableColumn = this.state.selectedColumns.map((column) => {
      return {
        label: fieldToLabel[column],
        field: column,
        sort: 'asc',
        width: 250,
      }
    })
    const mdbReactDataTableData = {
      columns: mdbReactDataTableColumn,
      rows: this.state.books,
    }

    return (
      <div className="container-fluid">
        <div className="row" >
          <div className="col-md-8" style={{ margin: "none", width: "100%", paddingTop:"20px", color:"#714d7a"}}><h3>Book Repo - Listing the best books online!</h3></div>
				<div className="col-md-4" style={{ margin: "none", width: "100%", paddingLeft:"1600px", fontFamily:"Potta One", fontSize:"20px" }}><Link to="/cart">Cart</Link></div>
        </div>
        <div className="row">
          <FormControl
            style={{ margin: '10px', minWidth: '120px', maxWidth: '300px' }}
          >
            <InputLabel id="demo-mutiple-name-label">Columns</InputLabel>
            <Select
              labelId="demo-mutiple-name-label"
              id="demo-mutiple-name"
              multiple
              value={this.state.selectedColumns}
              onChange={this.handleChange}
              input={<Input />}
            >
              {this.state.columnName.map((name) => (
                <MenuItem key={name} value={name}>
                  {fieldToLabel[name]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <MDBDataTable striped bordered small data={mdbReactDataTableData} />
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    cart: state.cart,
  }
}
export default connect(mapStateToProps)(MainPage)
