import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Grid, Segment, Image } from "semantic-ui-react";
import InlineError from "../messages/InlineError";
import {editBook} from '../../actions';
import {connect} from 'react-redux';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';



class BookForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        book_id: this.props.book.book_id,
        title: this.props.book.title,
        author_fl: this.props.book.author_fl,
        cover: this.props.book.cover,
        dateacquired_date: this.parseDate(this.props.book.dateacquired_date)
      },
      startDate: new Date(),
      loading: false,
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  parseDate = (date) => {
    let today = new Date(date);
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    if(dd<10){
        dd='0'+dd;
    }

    if(mm<10){
        mm='0'+mm;
    }
    let dateResult = dd+'/'+mm+'/'+yyyy;
    return dateResult;
  }


  submit(data){
    this.props.editBook(data)
    this.setState({loading:false})
    this.props.close()
  }

  componentWillReceiveProps(props) {
    this.setState({
      data: {
        book_id: props.book.book_id,
        title: props.book.title,
        author_fl: props.book.author_fl,
        cover: props.book.cover
      }
    });
  }

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.submit(this.state.data)
    }
  };

  validate = (data,selectedDate) => {
    const errors = {};
    let now = new Date();
    let then = new Date(selectedDate);
    let isAfter = now.getTime() < then.getTime() ? true : false;

    if (!data.title) errors.title = "Can't be blank";
    if (!data.author_fl) errors.author_fl = "Can't be blank";
    if (isAfter) errors.dateacquired_date = "Your date input is invalid";
    return errors;
  };

  handleChange(date) {
    const errors = this.validate(this.state.data,date);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({
          ...this.state,
          startDate: date,
          data:{ ...this.state.data,dateacquired_date:this.parseDate(date)}
      });
    }
  }

  render() {
    const { errors, data, loading } = this.state;

    return (
      <Segment>
        <Form onSubmit={this.onSubmit} loading={loading}>
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column>
                <Form.Field error={!!errors.title}>
                  <label htmlFor="title">Book Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    value={data.title}
                    onChange={this.onChange}
                  />
                  {errors.title && <InlineError text={errors.title} />}
                </Form.Field>

                <Form.Field error={!!errors.author_fl}>
                  <label htmlFor="author_fl">Book Authors</label>
                  <input
                    type="text"
                    id="author_fl"
                    name="author_fl"
                    placeholder="Authors"
                    value={data.author_fl}
                    onChange={this.onChange}
                  />
                  {errors.author_fl && <InlineError text={errors.author_fl} />}
                </Form.Field>
                <DayPicker
                      selectedDays={this.state.startDate}
                      onDayClick={this.handleChange}
                />
                {errors.dateacquired_date && <InlineError text={errors.dateacquired_date} />}
              </Grid.Column>

              <Grid.Column>
                <Image size="small" src={data.cover} />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row >
              <Button primary>Save</Button>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    );
  }
}

BookForm.propTypes = {
  submit: PropTypes.func
};

export default connect(null, { editBook })(BookForm);
