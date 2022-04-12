import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../style.css";
import "../components/songtiles.css";
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";

export default class SongTiles extends React.Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    const { editItem, onDelete } = this.props;
    return (
      <Card className="card rounded border">
        <CardBody className="card-body">
          <CardTitle className="song-name text-center">
            {this.props.songItem.song}
          </CardTitle>
          <CardSubtitle className="artist-name text-center">
            {this.props.songItem.artist}
          </CardSubtitle>
          <CardText className="rating text-center">
            {this.props.songItem.rating}
          </CardText>
          <span className="div-center-items">
            <button
              onClick={() => editItem(this.props.songItem)}
              className="btn btn-secondary"
              disabled={this.props.formShow}
            >
              {" "}
              Edit{" "}
            </button>
            <button
              onClick={() => onDelete(this.props.songItem)}
              className="btn btn-danger"
              disabled={this.props.formShow}
            >
              {" "}
              Delete{" "}
            </button>
          </span>
        </CardBody>
      </Card>
    );
  };
}
