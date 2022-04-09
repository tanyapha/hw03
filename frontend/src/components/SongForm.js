import React from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";

export default class SongForm extends React.Component {
  // currentItem -> the item we are currently editing or adding
  constructor(props) {
    super(props);
    this.state = {
      currentItem: this.props.currentItem,
      validRating: null,
    };
  }

  // change the values in the input field
  handleChange = (event) => {
    let { name, value } = event.target;
    const currentItem = { ...this.state.currentItem, [name]: value };

    this.setState({ currentItem });
  };

  validateInput = (event) => {
    const rating = event.target.value;
    if (rating < 0 || rating > 5) {
      this.setState({ validRating: false });
    } else if (rating === "") {
      this.setState({ validRating: null });
    } else {
      this.setState({ validRating: true });
    }
  };

  render() {
    // get the onSave function from App.js
    const { onSave, closeForm } = this.props;
    return (
      <div>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => closeForm()}
        ></button>
        <Form>
          <FormGroup>
            <Label for="song">Song Name</Label>
            <Input
              type="text"
              name="song"
              onChange={this.handleChange}
              value={this.state.currentItem.song}
              placeholder="Enter a song name"
              disabled={this.props.editing}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="artist">Artist Name</Label>
            <Input
              type="text"
              name="artist"
              onChange={this.handleChange}
              value={this.state.currentItem.artist}
              placeholder="Enter an artist name"
              disabled={this.props.editing}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="artist">Rating</Label>
            <Input
              type="number"
              name="rating"
              valid={this.state.validRating === true}
              invalid={this.state.validRating === false}
              onChange={(event) => {
                this.validateInput(event);
                this.handleChange(event);
              }}
              value={this.state.currentItem.rating}
              placeholder="Enter a Rating"
            ></Input>
            <FormFeedback> ❌ Your rating should be between 0-5</FormFeedback>
          </FormGroup>
        </Form>
        <Button
          color="success"
          onClick={() => onSave(this.state.currentItem)}
          disabled={
            this.state.currentItem.song === "" ||
            this.state.currentItem.artist === "" ||
            !this.state.validRating
              ? true
              : false
          }
        >
          Save
        </Button>
      </div>
    );
  }
}
