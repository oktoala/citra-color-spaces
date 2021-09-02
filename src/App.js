import Image from './img/unnamed.jpg';
import { Container, Slider, Grid, Typography } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';


const App = () => {
  return (
    <main className="main">
      <SliderRGB />
    </main>
  );
}

const SliderRGB = () => {

  const handleRed = (event, newValue) => {
    setRed(newValue);
  }
  const handleGreen = (event, newValue) => {
    setGreen(newValue);
  }
  const handleBlue = (event, newValue) => {
    setBlue(newValue);
  }

  const [red, setRed] = useState(50);
  const [green, setGreen] = useState(50);
  const [blue, setBlue] = useState(50);

  return (
    <Container maxWidth="sm">
      <MySlider color="red"/>
      <MySlider color="green"/>
      <MySlider color="blue"/>
    </Container>
  )
}

const MySlider = (props) => {
  return (
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <PrettoSlider color={props.color} max="255" valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} />
        </Grid>
        <Grid item >
          <Typography>Hah</Typography>
        </Grid>
      </Grid>

  );
}


const PrettoSlider = withStyles({
  root: props => ({
    color: props.color,
    height: 8,
  }),
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);


export default App;
