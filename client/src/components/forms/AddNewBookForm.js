import React from "react";
import PropTypes from "prop-types";
import {Redirect} from 'react-router-dom';
import { Form, Button, Grid, Segment, Image } from "semantic-ui-react";
import InlineError from "../messages/InlineError";
import {saveBook} from '../../actions'
import {connect} from 'react-redux';
import shortid from 'shortid'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import _ from 'lodash'


class AddNewBookForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        book_id: '',
        title: '',
        author_fl: '',
        cover:'',
        dateacquired_date: moment().format('YYYY-MM-DD')
      },
      startDate: moment(),
      loading: false,
      redirect:false,
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
  }


  submit(data){
    data.book_id = shortid.generate();
    this.props.saveBook(data)
    this.setState({loading:false,redirect:true})
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

  validate = data => {
    const errors = {};
    let now = moment().format('YYYY-MM-DD');
    let then = data.dateacquired_date;
    let isAfter = moment(then).isAfter(now);

    if (!data.title) errors.title = "Can't be blank";
    if (!data.author_fl) errors.author_fl = "Can't be blank";
    if (!data.cover) errors.cover = "Can't be blank";
    if (isAfter) errors.dateacquired_date = "Your date input is invalid";
    this.props.books.map(item => {
      item.title = _.startCase(_.toLower(item.title));
      item.title.replace(/\W/g, '');
      if (item.title === data.title) errors.title = "Duplicated Book, please change your tilte";
    })
    return errors;
  };

  handleChange(date) {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({
          ...this.state,
          startDate: date,
          data:{ ...this.state.data,dateacquired_date:moment(date._d).format("YYYY-MM-DD")}
      });
    }
  }

  render() {
    const { errors, data, loading , redirect } = this.state;

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
                <Form.Field error={!!errors.cover}>
                  <label htmlFor="cover">Image Cover</label>
                  <input
                    type="text"
                    id="cover"
                    name="cover"
                    placeholder="Cover"
                    value={data.cover}
                    onChange={this.onChange}
                  />
                  {errors.cover && <InlineError text={errors.cover} />}
                </Form.Field>
                <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleChange}
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
        {redirect ? <Redirect to="/"/> : <div></div>}
      </Segment>
    );
  }
}

AddNewBookForm.propTypes = {
  submit: PropTypes.func
};

function mapStateToProps(state) {
  return {
    books: state.books
  }
}

export default connect(mapStateToProps, { saveBook })(AddNewBookForm);
