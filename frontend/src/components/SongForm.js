import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

export default class SongForm extends React.Component {
  // currentItem -> the item we are currently editing or adding
  constructor(props) {
    super(props);
    this.state = {
      currentItem: this.props.currentItem,
    };
  }

  // change the values in the input field
  handleChange = (event) => {
    let { name, value } = event.target;
    const currentItem = { ...this.state.currentItem, [name]: value };

    this.setState({ currentItem });
  };

  render() {
    // get the onSave function from App.js
    const { onSave, closeForm } = this.props;
    console.log(this.state.currentItem);
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
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="artist">Rating</Label>
            <Input
              type="number"
              name="rating"
              onChange={this.handleChange}
              value={this.state.currentItem.rating}
              placeholder="Enter a Rating"
            ></Input>
          </FormGroup>
        </Form>
        <Button color="success" onClick={() => onSave(this.state.currentItem)}>
          Save
        </Button>
      </div>
    );
  }
}
