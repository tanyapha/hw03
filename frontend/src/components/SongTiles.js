import React from "react";

export default class SongTiles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songItem: this.props.songItem,
    };
  }

  render = () => {
    console.log(this.state.songItem);
    return (
      <div>
        <h1 className="song-name">{this.state.songItem.song}</h1>
        <p>{this.state.songItem.artist}</p>
        <p>{this.state.songItem.rating}</p>
      </div>
    );
  };
}
