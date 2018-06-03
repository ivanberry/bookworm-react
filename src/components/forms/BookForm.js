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
    index: 0,
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

  // TODO: things after submiting
  submit = () => {
    this.props.submit().then();
  };

  changeCover = () => {
    const { index, covers } = this.state;
    const newIndex = index + 1 >= covers.length ? 0 : index + 1;
    this.setState({
      index: newIndex,
      data: { ...this.state.data, cover: covers[newIndex] }
    });
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
                    disabled={data.page === undefined}
                    type="text"
                    id="page"
                    name="page"
                    value={data.page !== undefined ? data.page : "Loading"}
                    onChange={this.onChangeNumber}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Image src={data.cover} size="small" />
                {this.state.covers.length > 1 && (
                  <a role="button" tabIndex={0} onClick={this.changeCover}>
                    Change cover
                  </a>
                )}
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
    page: PropTypes.number,
    goodreadsId: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    covers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  }).isRequired
};

export default BookForm;
