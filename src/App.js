import React from "react";
import ChoosePicture from "./ChoosePicture";

var PICTUREPATHS = [
  "https://i.picsum.photos/id/111/200/300.jpg?hmac=bXXQTtXTex0m2Ogp23o7VFcNHAllTfE-8eSPYK2GeGM",
  "https://i.picsum.photos/id/776/200/300.jpg?hmac=BQHDuDGwB4rDL14FA6htzvzuvc0JcKn24gd4on7tp1M",
  "https://i.picsum.photos/id/953/200/300.jpg?hmac=8Bva5vDegltHxuHoyR882pbfhUI_t7iErL2SPtKrQRU",
  "https://i.picsum.photos/id/79/200/300.jpg?hmac=uqOMZrx9qlolrYp0xS5t84xjCiD_BIjfxIugTa1xjho",
];

class App extends React.Component {
  state = { 
    currentPic: 0,
  };

  pictureAccesss=()=>{
    const accessKey= 'tvb3lboHgyS9_1d7HiU6zWYywjU6kPYear19c4YtGPA';
    fetch(`https://api.unsplash.com/photos/?client_id=${accessKey}`)
  .then(response => response.json())
  .then(data => {
      data.map(element =>{ return PICTUREPATHS.push(element.urls.regular) });
  });
  }

  nextPic = () => {
    var current = this.state.currentPic;
    var next = ++current % PICTUREPATHS.length;
    this.setState({ currentPic: next });
  };

  componentDidMount = () => {
    // setInterval(this.nextPic, 2000);
    this.pictureAccesss()
  };

  interval = '';

  handleStart=()=>{
    this.interval = setInterval(() => {
      this.nextPic()
    }, 3000);
  }

  handleStop=()=>{
    clearInterval(this.interval)
  }



  render() {
    var src = PICTUREPATHS[this.state.currentPic];
    return (
      <div>
      <ChoosePicture src={src} stop={this.handleStop} start={this.handleStart}/>
      </div>
    );
  }
}

export default App;
