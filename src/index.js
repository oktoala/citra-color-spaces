import React from 'react';
import ReactDOM from 'react-dom';
import Image from './img/unnamed.jpg';
import { Container, Slider, Grid, Typography, Paper, Tabs, Tab, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { Jimage } from 'react-jimp';

const App = () => {
  return (
    <Main />
  );
}
function RGBToHSL(r, g, b) {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  // Calculate hue
  // No difference
  if (delta === 0)
    h = 0;
  // Red is max
  else if (cmax === r)
    h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax === g)
    h = (b - r) / delta + 2;
  // Blue is max
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0)
    h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  console.log(`h: ${h}, s: ${s}, l: ${l}`);

  return { hue: h, saturate: s, lightness: l };
}

const Main = () => {

  const rgbArr = [
    { "color": "red", "value": 0 },
    { "color": "green", "value": 0 },
    { "color": "blue", "value": 0 }
  ];
  const hslArr = [
    { "color": "hue", "value": 0 },
    { "color": "saturate", "value": 0 },
    { "color": "lighten", "value": 0 }
  ];

  const [rgb, setRgb] = useState(rgbArr);
  const [hsl, setHsl] = useState(hslArr);
  const [tabs, setTabs] = useState(0);

  function handleRGB(event, newValue) {
    const index = event.currentTarget.id !== undefined ? event.currentTarget.id : event.target.ariaLabel;

    setRgb([
      { "color": "red", "value": index === "rgb[0]" ? newValue : rgb[0].value },
      { "color": "green", "value": index === "rgb[1]" ? newValue : rgb[1].value },
      { "color": "blue", "value": index === "rgb[2]" ? newValue : rgb[2].value }
    ]);

    console.log(`Red: ${rgb[0].value}\nGreen: ${rgb[1].value}\nBlue: ${rgb[2].value}`);
    const rgb2hsl = RGBToHSL(rgb[0].value, rgb[1].value, rgb[2].value);
    hsl[0].value = rgb2hsl.hue;
    hsl[1].value = parseInt(rgb2hsl.saturate);
    hsl[2].value = parseInt(rgb2hsl.lightness);
  }
  
  function handleHSL(event, newValue) {
    const index = event.currentTarget.id !== undefined ? event.currentTarget.id : event.target.ariaLabel;
    
    setHsl([
      { "color": "hue", "value": index === "hsl[0]" ? newValue : hsl[0].value },
      { "color": "saturate", "value": index === "hsl[1]" ? newValue : hsl[1].value },
      { "color": "lighten", "value": index === "hsl[2]" ? newValue : hsl[2].value }
    ]);
    console.log(`Hue: ${hsl[0].value}\nSaturate: ${hsl[1].value}\nLight: ${hsl[2].value}`);
  }

  function handleTabs(event, newValue) {
    setTabs(newValue);
  }

  return (
    <main className="main">
      <Jimage
        src={Image}
        color={tabs === 0 ? [
          { apply: "red", params: [rgb[0].value] },
          { apply: "green", params: [rgb[1].value] },
          { apply: "blue", params: [rgb[2].value] }
        ] : tabs === 1 ?  [
          { apply: "hue", params: [hsl[0].value] },
          { apply: "saturate", params: [hsl[1].value] },
          { apply: "lighten", params: [hsl[2].value] },
        ] : 
          [{ apply: "desaturate", params: [0] },]
        }
      />
      <Container >
        <Paper square>
          <Tabs
            value={tabs} textColor="primary"
            indicatorColor="primary" onChange={handleTabs}
            aria-label="disabled tabs example">
            <Tab label="RGB" />
            <Tab label="HSL" />
            <Tab label="Grayscale" />
          </Tabs>
        </Paper>
        <ColorContainer display={tabs === 0 ? `block` : "none"} className="rgb-container">
          {rgb.map((v, index) => (
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <PrettoSlider id={`rgb[${index}]`} value={v.value} aria-label={`rgb[${index}]`} color={v.color} max={255}
                  valueLabelDisplay="auto" defaultValue={0} onChange={handleRGB} />
              </Grid>
              <Grid item >
                <Typography>{`${v.value}`}</Typography>
              </Grid>
            </Grid>
          ))}
          <Button container variant="contained" onClick={() => setRgb(rgbArr)} color="default">Reset RGB</Button>
        </ColorContainer>
        <ColorContainer display={tabs === 1 ? `block` : `none`}>
          {hsl.map((v, index) => (
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <HueSlider id={`hsl[${index}]`} aria-label={`hsl[${index}]`} max={v.color === "hue" ? 360 : 100} value={v.value} valueLabelDisplay="auto" onChange={handleHSL} />
              </Grid>
              <Grid item >
                <Typography>{`${v.value}`}</Typography>
              </Grid>
            </Grid>
          ))}
        </ColorContainer>
      </Container>
    </main>
  );
};

const ColorContainer = withStyles({
  root: props => ({
    display: props.display,
  })
})(Container);

const HueSlider = withStyles({
  root: {
    marginTop: 10,
    background: "grey",
    height: 8,
  },
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
    borderRadius: 0,
  },
  rail: {
    // width: 508,
    height: 0,
    borderRadius: 0,
  },
})(Slider);

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

ReactDOM.render(
  <React.StrictMode>
    <App />,
  </React.StrictMode>,
  document.getElementById('root')
);

