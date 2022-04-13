import React from "react";
import "./style.css";
import SongForm from "./components/SongForm";
import axios from "axios";
import SongTiles from "./components/SongTiles";
import { Modal, ModalBody } from "reactstrap";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentItem: {
        username: "",
        song: "",
        artist: "",
        rating: 0,
      },
      songList: [],
      formShow: false,
      editing: false,
    };
  }

  //load the list for the first time we enter the site
  componentDidMount() {
    this.refreshList();
  }

  //gets the data from the backend
  refreshList = () => {
    axios
      .get("http://localhost:8000/api/rating/get_average/")
      .then((res) => {
        {
          this.setState({ songList: res.data, formShow: false });
          console.log(1);
        }
      })
      .catch((err) => console.log(err));
  };

  //displaying the songlist on the web using the SongTiles
  renderList = () => {
    return this.state.songList.map((item) => (
      <SongTiles
        key={this.state.songList.indexOf(item)}
        songItem={item}
        editItem={this.editItem}
        formShow={this.state.formShow}
        onDelete={this.handleDelete}
      />
    ));
  };

  closeForm = () => {
    this.setState({ formShow: false });
  };

  // what to do when we add information
  handleSubmit = (item) => {
    // for updating ratings
    if (this.state.editing) {
      //check to see if there is already a rating
      axios
        .get("http://localhost:8000/api/rating/", {
          params: { username: localStorage.getItem("user"), song: item.song },
        })
        .then((res) => {
          // if there is a rating -> update
          if (res.data.length === 0) {
            const addRating = {
              ...item,
              username: localStorage.getItem("user"),
            };
            axios
              .post("http://localhost:8000/api/rating/", addRating)
              .then((res) => {
                console.log("yay, your rating has been added!!!");
                this.refreshList();
              });
            // else we create a new rating for the user
          } else {
            const updateRating = { ...res.data[0], rating: item.rating };
            axios
              .put(
                `http://localhost:8000/api/rating/${updateRating.id}/`,
                updateRating
              )
              .then((res) => {
                console.log("yay, its been updated 😍!!!");
                this.refreshList();
              });
          }
        });

      return;
    }
    // If the item does not yet exist, use a POST request to write to the
    // database.
    axios.post("http://localhost:8000/api/rating/", item).then((res) => {
      console.log("yay, songs been added !!!");
      this.refreshList();
    });
  };

  handleDelete = (item) => {
    axios
      .get("http://localhost:8000/api/rating/", {
        params: { song: item.song },
      })
      .then((res) => {
        res.data.map((el) => {
          axios
            .delete(`http://localhost:8000/api/rating/${el.id}`)
            .then((res) => {
              console.log("DELETED 👋🏼 !!!");
              this.refreshList();
            });
        });
      });
  };

  createItem = () => {
    const item = {
      username: localStorage.getItem("user"),
      song: "",
      artist: "",
      rating: undefined,
    };
    this.setState({
      currentItem: item,
      formShow: true,
      editing: false,
    });
  };

  editItem = (item) => {
    this.setState({
      currentItem: item,
      formShow: true,
      editing: true,
    });
  };

  render = () => {
    console.log(localStorage.getItem("user"));
    return (
      <div>
        <header className="user-display">
          <div className="div-right-align">
            Hi,{" "}
            {localStorage.getItem("user").charAt(0).toUpperCase() +
              localStorage.getItem("user").slice(1)}
            !
          </div>
        </header>
        <Modal isOpen={this.state.formShow} centered>
          <ModalBody className="modal-edits">
            <SongForm
              currentItem={this.state.currentItem}
              onSave={this.handleSubmit}
              closeForm={this.closeForm}
              editing={this.state.editing}
            />
          </ModalBody>
        </Modal>
        <p className="title">Song Rater</p>
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
          {/* <div className="form">
            {this.state.formShow ? (
              <SongForm
                currentItem={this.state.currentItem}
                onSave={this.handleSubmit}
                closeForm={this.closeForm}
                editing={this.state.editing}
              />
            ) : null}
          </div> */}
        </div>
      </div>
    );
  };
}

export default Dashboard;
