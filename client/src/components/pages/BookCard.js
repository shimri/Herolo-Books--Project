import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Image } from 'semantic-ui-react';
import BookModalPage from './BookModalPage'

export default function BookCard({ book, deleteBook }) {

  return (
    <Card>
      <Image wrapped size='small' src={book.cover} />
      <Card.Content>
        <Card.Header>
          {book.title}
        </Card.Header>
        <Card.Meta>
          <span className='date'>
            {book.dateacquired_date}
          </span>
        </Card.Meta>
        <Card.Description>
          {book.author_fl}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name='star' />
          book rating {book.rating}
        </a>
      </Card.Content>
      <Card.Content extra>
          <BookModalPage deleteBook={deleteBook} book={book}/>
       </Card.Content>
    </Card>

  );
}

BookCard.propTypes = {
  book: PropTypes.object.isRequired,
  deleteBook:PropTypes.func.isRequired
}
