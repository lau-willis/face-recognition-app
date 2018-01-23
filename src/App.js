import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import './App.css';


const app = new Clarifai.App({
 apiKey: 'f47e7466f8684c05a635ee040bb045bc'
});

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

// const anotherParticle = {
//   particles: {
//   number: {
//     value: 50,
//     density: {
//       enable: true,
//       value_area: 800
//     }
//   },
//   line_linked: {
//     enable: true,
//     distance: 150,
//     color: "#ffffff",
//     opacity: 0.4,
//     width: 1
//   },
//   "shape": {
//     "type": "circle",
//     "stroke": {
//       "width": 0,
//       "color": "#000000"
//     },
//     polygon: {
//       nb_sides: 7
//     }
//   }
//  },
//   "interactivity": {
//     "detect_on": "canvas",
//     "events": {
//       "onhover": {
//         "enable": true,
//         "mode": "repulse"
//       },
//       "onclick": {
//         "enable": true,
//         "mode": "push"
//       },
//       "resize": true
//     },
//     "modes": {
//       "grab": {
//         "distance": 400,
//         "line_linked": {
//           "opacity": 1
//         }
//       },
//       "repulse": {
//         "distance": 200,
//         "duration": 0.4
//       }
//     }
//   },
//   "retina_detect": true
// }

class App extends Component {
  constructor(){
    super();

    this.state = {
      input: '',
      imageUrl: '',
      box: [],
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonSubmit = this.onButtonSubmit.bind(this);
  }


  calculateFaceLocation(data){
    //const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const clarifaiFace = data.outputs[0].data.regions.map(region => {
      return region.region_info.bounding_box;
    })
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    for(var i = 0; i < clarifaiFace.length; i++){
      clarifaiFace[i].top_row *= height;
      clarifaiFace[i].left_col *= width;
      clarifaiFace[i].bottom_row = height - (clarifaiFace[i].bottom_row * height);
      clarifaiFace[i].right_col = width - (clarifaiFace[i].right_col * width);
    }
    return clarifaiFace;
    // return {
    //   leftCol: clarifaiFace.left_col * width,
    //   topRow: clarifaiFace.top_row * height,
    //   rightCol: width - (clarifaiFace.right_col * width),
    //   bottomRow: height - (clarifaiFace.bottom_row * height)
    // }
  }

  displayFaceBox(box){
    this.setState({box})
  }

  onInputChange(event){
    this.setState({input: event.target.value});
  }

  onButtonSubmit(){
    this.setState({imageUrl: this.state.input});
      app.models
         .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
         .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
          .catch(err => console.log(err)); 
    }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
                params={particlesOptions}
              />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
      </div>
    );
  }
}

export default App;
