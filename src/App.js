import './App.css';
import {useState} from 'react';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';



function App() {
  const [input, setInput] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  })

  const setDefaultValues = () => {
    setInput('');
    setImageURL('');
    setBox({});
    setUser({
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    });
  }

  const loadUser = (user) => {
    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined
    })
  }

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  const displayFaceBox = (box) => {
    setBox(box);
  }

  function onInputChange (event) {
    setInput(event.target.value);
  }

  function onSubmit () {
    setImageURL(input);

    fetch('https://smart-brain-server-71e27a127897.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        imageurl: imageURL
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('https://smart-brain-server-71e27a127897.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            setUser({
              ...user,
              entries: count
            })
          })
          .catch(console.log)
      }
      displayFaceBox(calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

  function onRouteChange (route) {
    if (route === 'signin') {
      setSignedIn(false)
      setDefaultValues()
    } else if (route === 'home') {
      setSignedIn(true)
    }

    setRoute(route)
  }

  return (
    <div className="App">
      <ParticlesBg num={100} type="square" bg={true} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange}/>
      { route === 'home' 
        ? <div>
            <Logo />
            <Rank name={user.name} entries={user.entries}/>
            <ImageLinkForm 
              onInputChange={onInputChange}
              onSubmit={onSubmit}
            />
            <FaceRecognition imageURL={imageURL} box={box}/>
          </div>
          : (
              route === 'signin' 
              ? <SignIn onRouteChange={onRouteChange} loadUser={loadUser}/>
              : <Register onRouteChange={onRouteChange} loadUser={loadUser}/>
            )
      }
    </div>
  );
}

export default App;
