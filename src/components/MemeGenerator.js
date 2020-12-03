import React, { Component } from "react";

class Memegenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        this.setState({ allMemeImgs: memes });
      });
  }

  //Binding this handleChange function to my class component
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit(event) {
    event.preventDefault();
    const randomNumber = Math.floor(
      Math.random() * this.state.allMemeImgs.length
    );
    const randomMemeImg = this.state.allMemeImgs[randomNumber].url;
    this.setState({ randomImg: randomMemeImg });
  }

  render() {
    return (
      <div className="page-content">
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input
            name="topText"
            type="text"
            placeholder="toptext"
            value={this.state.topText}
            onChange={this.handleChange}
          />
          <input
            name="bottomText"
            type="text"
            placeholder="bottomtext"
            value={this.state.bottomText}
            onChange={this.handleChange}
          />
          <button>Generate Meme</button>
        </form>
        <div className="meme">
          <img src={this.state.randomImg} alt="" />
          <h2 className="top"> {this.state.topText}</h2>
          <h2 className="bottom"> {this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default Memegenerator;
