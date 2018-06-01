import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Grid, Button, Image, Segment } from "semantic-ui-react";

class BookForm extends Component {
  state = {
    data: {
      goodreadsId: this.props.book.goodreadsId,
      title: this.props.book.title,
      author: this.props.book.author,
      page: this.props.book.page,
      cover: this.props.book.covers[0]
    },
    covers: this.props.book.covers,
    loading: false,
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    const { covers } = nextProps.book;
    this.setState({
      data: { ...nextProps.book, cover: covers[0] }
    });
  }

  onChange = e =>
    this.setState({
      ...this.state.data,
      [e.taget.name]: e.target.value
    });

  onChangeNumber = e =>
    this.setState({
      ...this.state.data,
      [e.target.name]: parseInt(e.target.value, 10)
    });

  submit = () => {
    this.props.submit().then();
  };

  render() {
    const { errors, data, loading } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.submit} loading={loading}>
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column>
                <Form.Field error={!!errors.title}>
                  <label htmlFor="title">Book title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={data.title}
                    onChange={this.onChange}
                  />
                </Form.Field>
                <Form.Field error={!!errors.author}>
                  <label htmlFor="author">Book author</label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={data.author}
                    onChange={this.onChange}
                  />
                </Form.Field>
                <Form.Field error={!!errors.page}>
                  <label htmlFor="page">Book page</label>
                  <input
                    type="number"
                    id="page"
                    name="page"
                    value={data.page}
                    onChange={this.onChangeNumber}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Image src={data.cover} size="small" />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Button primary>Save</Button>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    );
  }
}

BookForm.propTypes = {
  submit: PropTypes.func.isRequired,
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    goodreadsId: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    covers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  }).isRequired
};

export default BookForm;
