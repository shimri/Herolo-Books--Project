import React, { Component } from 'react';
import { Segment } from "semantic-ui-react";
import AddNewBookForm from "../forms/AddNewBookForm";

class NewBookPage extends Component {

  state = {
    book: null
  }

  render() {
    return (
      <Segment>
           <h1>Add new book to your collection</h1>
           <AddNewBookForm location={this.props.location}/>
       </Segment>
    );
  }

}

export default NewBookPage;
