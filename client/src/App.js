import './App.css';
import io from 'socket.io-client';
import { useState, useEffect } from 'react';
import Horse from './components/Horses/Horse';
import horsesImg from './horses.gif';
import Alert from 'react-bootstrap/Alert';

const socket = io.connect('http://localhost:3002');

function App() {

  const [horses, setHorses] = useState(null);
  const [horsePlaces, setHorsePlaces] = useState([]);  

  useEffect(() => {
    socket.emit('start');
    socket.on('ticker', function (response) {
      const res = Array.isArray(response) ? response : [response];      
      setHorses(res)
    })
  }, []);

  useEffect(() => {
    if (horses) {
      horses.forEach(horse => {
        if (horse.distance === 1000) {
          if (horsePlaces.includes(horse.name)) {
            return
          }
          setHorsePlaces(prev => [...prev, horse.name])
        }
      })
    }
  }, [horsePlaces, horses]); 
  
  return (
    <div className="App">
      {horsePlaces.length !== 6 && <img src={horsesImg} alt="horses" />} 
      {horses && horsePlaces.length !== 6 && horses.map(horse => (
        <Horse key={horse.name} name={horse.name} distance={horse.distance} />
      ))}
      <div>
        {horsePlaces.length === 6 && horsePlaces.map((horse,idx) => (        
          <Alert key={horse} variant='primary'><span>{idx + 1}</span> {horse}</Alert>        
        ))}
      </div>
    </div>
  )
}

export default App;
