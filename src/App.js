import Image from './img/unnamed.jpg';
import { Container, Slider, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { Jimage } from 'react-jimp';


const App = () => {
  return (
    <main className="main">
      <SliderRGB />
    </main>
  );
}

const SliderRGB = () => {

  const rgbArr = [
    { "color": "red", "value": 0 },
    { "color": "green", "value": 0 },
    { "color": "blue", "value": 0 }
  ];

  // const [red, setRed] = useState(255);
  // const [green, setGreen] = useState(255);
  // const [blue, setBlue] = useState(255);
  const [rgb, setRgb] = useState(rgbArr);

  function handleRGB(event, newValue) {
    const index = parseInt(event.target.ariaLabel);

    setRgb([
      { "color": "red", "value": index === 0 ? newValue : rgb[0].value },
      { "color": "green", "value": index === 1 ? newValue : rgb[1].value },
      { "color": "blue", "value": index === 2 ? newValue : rgb[2].value }
    ]);

  }

  return (
    <div>
      <Jimage
        src={Image}
        color={[
          { apply: 'red', params: [rgb[0].value] },
          { apply: 'green', params: [rgb[1].value] },
          { apply: 'blue', params: [rgb[2].value] },
        ]}
      />
      <Container maxWidth="sm">
        {rgb.map((v, index) => (
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <PrettoSlider aria-label={`${index}`} color={v.color} max={255} valueLabelDisplay="auto" defaultValue={0} onChange={handleRGB} />
            </Grid>
            <Grid item >
              <Typography>{`${v.value} - ${index}`}</Typography>
            </Grid>
          </Grid>
        ))}
        {/* <MySlider color="red" value={red} onChange={handlered} />
      <MySlider color="green" value={green} onChange={handlegreen} />
      <MySlider color="blue" value={blue} onChange={handleblue} /> */}
      </Container>
    </div>
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
