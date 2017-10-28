import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import BookForm from '../forms/BookForm'

export default class BookModalPage extends Component {
  state = { open: false }

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state
    const { book } = this.props
    return (
      <div className='ui two buttons'>
        <Button basic color='green' onClick={this.show(true)}>Edit</Button>
        <Button basic color='red' onClick={() => this.props.deleteBook(book.book_id)}>Delete</Button>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Select a Photo</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <BookForm close={this.close} book={book}/>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close}>Cancel</Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}
