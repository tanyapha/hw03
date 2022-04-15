import React from "react";
import "./style.css";
import SongForm from "./components/SongForm";
import axios from "axios";
import SongTiles from "./components/SongTiles";
import { Form, Modal, ModalBody, FormGroup, Input, Label } from "reactstrap";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songItem: {
        id: "",
        song: "",
        artist: "",
        rating: undefined,
        ratings: [],
      },
      userItem: [],
      songList: [],
      formShow: false,
      currentlyEditing: false,
      currentlyRating: false,
      allSongs: true,
    };
  }
  //load the list for the first time we enter the site
  componentDidMount() {
    this.refreshList();
  }

  getAllSongs() {
    axios
      .get("http://localhost:8000/api/song/")
      .then((res) => {
        {
          console.log(res.data);
          this.setState({ songList: res.data, formShow: false });
        }
      })
      .catch((err) => console.log(err));
  }

  //gets the data from the backend
  refreshList = () => {
    this.getAllSongs();
    axios
      .get("http://localhost:8000/api/rating/", {
        params: { username: localStorage.getItem("user") },
      })
      .then((res) => {
        this.setState({ userItem: res.data });
        console.log(res.data);
      });
  };

  //displaying the songlist on the web using the SongTiles
  renderList = () => {
    return this.state.songList.map((item) => (
      <SongTiles
        key={this.state.songList.indexOf(item)}
        songItem={item}
        userItem={this.state.userItem}
        rateItem={this.rateItem}
        editItem={this.editItem}
        formShow={this.state.formShow}
        onDelete={this.handleDelete}
      />
    ));
  };

  closeForm = () => {
    this.setState({ formShow: false });
  };

  addRating = (song_id, rating) => {
    const addRating = {
      song_id: song_id,
      username: localStorage.getItem("user"),
      rating: rating,
    };
    axios.post("http://localhost:8000/api/rating/", addRating).then((res) => {
      console.log("yay, your rating has been added!!!");
      this.refreshList();
    });
  };

  updateRating = (song_info, rating) => {
    const updateRating = { ...song_info, rating: rating };
    axios
      .put(`http://localhost:8000/api/rating/${updateRating.id}/`, updateRating)
      .then((res) => {
        console.log("yay, its been updated 😍!!!");
        this.refreshList();
      });
  };

  addSong(item) {
    axios
      .post("http://localhost:8000/api/song/", {
        song: item.song,
        artist: item.artist,
      })
      .then((res) => {
        console.log("yay, song has been added to song!!!");
        this.addRating(res.data.id, item.rating);
      });
  }

  updateSong(song, artist, id) {
    const updateSong = { song: song, artist: artist };
    axios
      .put(`http://localhost:8000/api/song/${id}/`, updateSong)
      .then((res) => {
        console.log("yay, the song has been updated 😍!!!");
        this.refreshList();
      });
  }

  // what to do when we add information
  handleSubmit = (item) => {
    if (this.state.currentlyRating) {
      //check to see if there is already a rating
      axios
        .get("http://localhost:8000/api/rating/", {
          params: { username: localStorage.getItem("user"), song_id: item.id },
        })
        .then((res) => {
          if (res.data.length === 0) {
            console.log(item);
            this.addRating(item.id, item.rating);
          } else {
            this.updateRating(res.data[0], item.rating);
          }
        });
      return;
    }
    if (this.state.currentlyEditing) {
      this.updateSong(item.song, item.artist, item.id);
      return;
    }
    // If the item does not yet exist, use a POST request to write to the
    // database.
    this.addSong(item);
  };

  handleDelete = (item) => {
    console.log(item);
    axios.delete(`http://localhost:8000/api/song/${item.id}`).then((res) => {
      console.log("DELETED 👋🏼 !!!");
      this.refreshList();
    });
  };

  handleToggle = () => {
    this.setState({ allSongs: !this.state.allSongs }, () => {
      this.refreshList();
    });
  };

  createItem = () => {
    const item = {
      id: "",
      song: "",
      artist: "",
      ratings: [],
      rating: undefined,
    };
    this.setState({
      songItem: item,
      formShow: true,
      currentlyEditing: false,
      currentlyRating: false,
    });
  };

  editItem = (item) => {
    this.setState({
      songItem: item,
      formShow: true,
      currentlyEditing: true,
      currentlyRating: false,
    });
  };

  rateItem = (item) => {
    this.setState({
      songItem: item,
      formShow: true,
      currentlyRating: true,
      currentlyEditing: false,
    });
  };

  render = () => {
    return (
      <div className="page-container">
        <header className="user-display">
          <div>
            <span className=" name-display div-right-align">
              Hi,{" "}
              {localStorage.getItem("user").charAt(0).toUpperCase() +
                localStorage.getItem("user").slice(1)}
              !
            </span>
          </div>
        </header>
        <Modal isOpen={this.state.formShow} centered>
          <ModalBody className="modal-edits">
            <SongForm
              songItem={this.state.songItem}
              onSave={this.handleSubmit}
              closeForm={this.closeForm}
              currentlyEditing={this.state.currentlyEditing}
              currentlyRating={this.state.currentlyRating}
            />
          </ModalBody>
        </Modal>
        <h1 className="title">
          {" "}
          <i className="bi bi-music-note-list"></i> Song Rater
        </h1>
        <div className="body">
          <div className="div-center-align">
            <button
              onClick={this.createItem}
              className="btn btn-primary"
              disabled={this.state.formShow}
            >
              New song
            </button>
          </div>
          <div className="songList">{this.renderList()}</div>
        </div>
      </div>
    );
  };
}

export default Dashboard;
