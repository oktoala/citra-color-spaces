import Image from './img/unnamed.jpg';
import { Container, Slider, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { Jimage } from 'react-jimp';


const App = () => {
  return (
    <SliderRGB />
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
    const index = event.currentTarget.id;
    console.log(`Index: ${event.target.ariaLabel}`);
    console.log(`Red: ${rgb[0].value}\nGreen: ${rgb[1].value}\nBlue: ${rgb[2].value}`);
    setRgb([
      { "color": "red", "value": index == "rgb[0]" ? newValue : rgb[0].value },
      { "color": "green", "value": index == "rgb[1]" ? newValue : rgb[1].value },
      { "color": "blue", "value": index == "rgb[2]" ? newValue : rgb[2].value }
    ]);

    // console.log(`Red: ${rgb[0].value}\nGreen: ${rgb[1].value}\nBlue: ${rgb[2].value}`);

  }
  return (
    <main className="main">
      <Jimage
        src={Image}
        color={[
          { apply: "red", params: [rgb[0].value] },
          { apply: "green", params: [rgb[1].value] },
          { apply: "blue", params: [rgb[2].value] },
        ]}
      />
      <Container maxWidth="sm">
        {rgb.map((v, index) => (
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <PrettoSlider id={`rgb[${index}]`} aria-label={`${index}`} color={v.color} max={255}
                valueLabelDisplay="auto" defaultValue={0} onChange={handleRGB} />
            </Grid>
            <Grid item >
              <Typography>{`${v.value}`}</Typography>
            </Grid>
          </Grid>
        ))}
      </Container>
    </main>
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
    width: 508,
    height: 8,
    borderRadius: 4,
  },
})(Slider);


export default App;
