import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../style.css";
import "../components/songtiles.css";
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";

export default class SongTiles extends React.Component {
  constructor(props) {
    super(props);
  }

  ratingRound() {
    let average = 0;
    for (let val of this.props.songItem.ratings) {
      average += val;
    }
    return Math.round((average / this.props.songItem.ratings.length) * 2) / 2;
  }

  starGenerator() {
    let stars = this.ratingRound();
    let starDisplay = [];
    while (stars > 0) {
      if (stars === 0.5) {
        starDisplay.push(<i key={stars} className="bi bi-star-half star"></i>);
        stars -= 0.5;
      } else {
        starDisplay.push(<i key={stars} className="bi bi-star-fill star"></i>);
        stars -= 1;
      }
    }
    return starDisplay;
  }

  render = () => {
    const { editItem, rateItem, onDelete } = this.props;
    return (
      <Card className="card rounded border">
        <CardBody className="card-body">
          <CardTitle className="song-name text-center">
            {this.props.songItem.song}
          </CardTitle>
          <CardSubtitle className="artist-name text-center">
            <i className="bi bi-person-fill songtile-icons"></i>
            {this.props.songItem.artist}
          </CardSubtitle>
          <CardText className="rating text-center">
            <span className="songtile-icons">{this.starGenerator()}</span>(
            {this.ratingRound()})
          </CardText>
          <span className="div-center-align">
            <button
              onClick={() => editItem(this.props.songItem)}
              className="btn btn-secondary"
              disabled={this.props.formShow}
            >
              {" "}
              Edit{" "}
            </button>
            <button
              onClick={() => rateItem(this.props.songItem)}
              className="btn btn-secondary"
              disabled={this.props.formShow}
            >
              {" "}
              Rate{" "}
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
