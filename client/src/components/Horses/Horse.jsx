import './Horse.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

const Horse = ({ name, distance }) => {
  return (
    <div className='horse'>
      <p>{name}:</p>      
      <ProgressBar min={0} max={1000} now={distance} />
    </div>
  )
}

export default Horse;