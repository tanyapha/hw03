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
  // songItem -> the item we are currently editing or adding
  constructor(props) {
    super(props);
    this.state = {
      songItem: this.props.songItem,
      validRating: null,
    };
  }

  // change the values in the input field
  handleChange = (event) => {
    let { name, value } = event.target;
    const songItem = { ...this.state.songItem, [name]: value };

    this.setState({ songItem });
  };

  validateInput = (event) => {
    const rating = event.target.value;
    if (rating < 1 || rating > 5) {
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
        <div className="div-right-align">
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => closeForm()}
          ></button>
        </div>
        <Form>
          <FormGroup>
            <Label for="song">Song Name</Label>
            <Input
              type="text"
              name="song"
              onChange={this.handleChange}
              value={this.state.songItem.song}
              placeholder="Enter a song name"
              disabled={this.props.currentlyRating}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="artist">Artist Name</Label>
            <Input
              type="text"
              name="artist"
              onChange={this.handleChange}
              value={this.state.songItem.artist}
              placeholder="Enter an artist name"
              disabled={this.props.currentlyRating}
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
              value={this.state.songItem.rating}
              placeholder="Enter a Rating"
              disabled={this.props.currentlyEditing}
            ></Input>
            <FormFeedback> ❌ Your rating should be between 0-5</FormFeedback>
          </FormGroup>
        </Form>
        <div className="div-right-align">
          <Button
            color="success"
            onClick={() => onSave(this.state.songItem)}
            disabled={
              this.state.songItem.song === "" ||
              this.state.songItem.artist === "" ||
              (!this.state.validRating && !this.props.currentlyEditing)
                ? true
                : false
            }
          >
            Save
          </Button>
        </div>
      </div>
    );
  }
}
