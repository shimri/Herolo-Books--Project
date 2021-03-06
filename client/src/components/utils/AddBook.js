import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const AddBook = () => (
  <Card centered>
    <Card.Content textAlign="center">
      <Card.Header>Add new book</Card.Header>
      <Link to="/new_book">
        <Icon name="plus circle" size="large" />
      </Link>
    </Card.Content>
  </Card>
);

export default AddBook;
