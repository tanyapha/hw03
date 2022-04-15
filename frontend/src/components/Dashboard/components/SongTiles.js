import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../style.css";
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

  checkUpdate() {}

  render = () => {
    const { editItem, rateItem, onDelete } = this.props;
    return (
      <Card className="card rounded">
        <CardBody className="card-body">
          <span className="div-right-align ">
            <button
              onClick={() => editItem(this.props.songItem)}
              className="btn btn-secondary btn-sm"
              disabled={this.props.formShow}
            >
              {" "}
              Edit Song Info{" "}
            </button>
            <button
              onClick={() => onDelete(this.props.songItem)}
              className="btn btn-danger btn-sm"
              disabled={this.props.formShow}
            >
              {" "}
              Delete{" "}
            </button>
          </span>
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
          <div className="div-center-align">
            <button
              onClick={() => rateItem(this.props.songItem)}
              className={`btn btn-success ${
                this.props.userItem.some(
                  (e) => e.song_id === this.props.songItem.id
                )
                  ? "update-button"
                  : "rate-button"
              }`}
              disabled={this.props.formShow}
            >
              {" "}
              {this.props.userItem.some(
                (e) => e.song_id === this.props.songItem.id
              )
                ? "Update"
                : "Rate"}{" "}
            </button>
          </div>
        </CardBody>
      </Card>
    );
  };
}
