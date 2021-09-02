import Image from './img/unnamed.jpg';
import { Container, Slider, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { Jimage } from 'react-jimp';


const App = () => {
  return (
    <main className="main">
      <Jimage
        src={Image}
        color={[
          {apply: 'red', params: [0]},
          {apply: 'blue', params: [0]},
          {apply: 'green', params: [0]},
        ]}
      />
      <SliderRGB />
    </main>
  );
}



const SliderRGB = () => {
  const [red, setRed] = useState(255);
  const [green, setGreen] = useState(255);
  const [blue, setBlue] = useState(255);

  const handlered = (event, newValue) => {
    setRed(newValue);
  }
  const handlegreen = (event, newValue) => {
    setGreen(newValue);
  }
  const handleblue = (event, newValue) => {
    setBlue(newValue);
  }


  return (
    <Container maxWidth="sm">
      <MySlider color="red" value={red} onChange={handlered} />
      <MySlider color="green" value={green} onChange={handlegreen} />
      <MySlider color="blue" value={blue} onChange={handleblue} />
    </Container>
  )
}

const MySlider = (props) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs>
        <PrettoSlider color={props.color} max="255" valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={255} onChange={props.onChange} />
      </Grid>
      <Grid item >
        <Typography>{props.value}</Typography>
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
    maxWidth: 508,
    height: 8,
    borderRadius: 4,
  },
})(Slider);


export default App;
