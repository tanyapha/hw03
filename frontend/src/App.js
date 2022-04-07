import logo from "./logo.svg";
import React from "react";
import "./App.css";
import SongForm from "./components/SongForm";
import axios from "axios";
import SongTiles from "./components/SongTiles";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentItem: {
        username: "tanya",
        song: "hello",
        artist: "",
        rating: 0,
      },
      songList: [],
      formShow: false,
    };
  }

  //load the list for the first time we enter the site
  componentDidMount() {
    this.refreshList();
  }

  //gets the data from the backend
  refreshList = () => {
    axios
      .get("http://localhost:8000/api/rating/")
      .then((res) => {
        {
          this.setState({ songList: res.data });
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
      />
    ));
  };

  closeForm = () => {
    this.setState({ formShow: false });
  };

  // what to do when we add information
  handleSubmit = (item) => {
    // for updating ratings
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/rating/${item.id}/`, item)
        .then((res) => {
          console.log("yay, its been updated 😍!!!");
          this.refreshList();
        });
      return;
    }
    // If the item does not yet exist, use a POST request to write to the
    // database.
    axios.post("http://localhost:8000/api/rating/", item).then((res) => {
      console.log("yay, its been added!!!");
      this.refreshList();
    });
  };

  createItem = () => {
    const item = {
      username: "tanya",
      song: "",
      artist: "",
      rating: undefined,
    };
    this.setState({
      currentItem: item,
      formShow: true,
    });
  };

  editItem = (item) => {
    this.setState({
      currentItem: item,
      formShow: true,
    });
  };

  render = () => {
    return (
      <div>
        {this.state.formShow ? (
          <SongForm
            currentItem={this.state.currentItem}
            onSave={this.handleSubmit}
            closeForm={this.closeForm}
          />
        ) : null}

        {this.renderList()}
        <button
          onClick={this.createItem}
          className="btn btn-primary"
          disabled={this.state.formShow}
        >
          Add task
        </button>
      </div>
    );
  };
}

export default App;
