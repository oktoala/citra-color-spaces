import ReactDOM from 'react-dom';
import Image from './img/unnamed.jpg';
import { Container, Slider, Grid, Typography, Paper, Tabs, Tab, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { React, useState, useEffect } from 'react';
import { Jimage } from 'react-jimp';
import { rgbToHSL, hslToRgb, cmykToRgb, rgbToCmyk, rgbToHex } from './converter';

const App = () => {
  return (
    <Main ></Main>
  );
}
const Main = () => {

  // Array of Color Spaces
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
  const cmykArr = [
    { "color": "cyan", "value": 0 },
    { "color": "magenta", "value": 0 },
    { "color": "yellow", "value": 0 },
    { "color": "black", "value": 100 }
  ];

  // Variable for state management
  const [rgb, setRgb] = useState(rgbArr);
  const [hsl, setHsl] = useState(hslArr);
  const [cmyk, setCmyk] = useState(cmykArr);
  const [hex, setHex] = useState('#000000')
  const [greyScale, setGreyScale] = useState(100);
  const [tabs, setTabs] = useState(0);


  // Function to control state

  function lazyRgb(rgbObject) {
    rgb[0].value = rgbObject.red;
    rgb[1].value = rgbObject.green;
    rgb[2].value = rgbObject.blue
  };
  function lazyHsl(hslObject) {
    hsl[0].value = hslObject.hue;
    hsl[1].value = hslObject.saturate;
    hsl[2].value = hslObject.lightness;

  };
  function lazyCmyk(cmykObject) {
    cmyk[0].value = cmykObject.c;
    cmyk[1].value = cmykObject.m;
    cmyk[2].value = cmykObject.y;
    cmyk[3].value = cmykObject.k;

  };

  // For RGB Handle
  useEffect(() => {
    const rgb2hsl = rgbToHSL(rgb[0].value, rgb[1].value, rgb[2].value);
    lazyHsl(rgb2hsl);

    const rgb2cmyk = rgbToCmyk(rgb[0].value, rgb[1].value, rgb[2].value);

    lazyCmyk(rgb2cmyk);

    console.log('RGB');
    setHex(rgbToHex(rgb[0].value, rgb[1].value, rgb[2].value));
    
  }, [rgb]);
  
  // For HSL Handle
  useEffect(() => {
    const hsl2rgb = hslToRgb(hsl[0].value, hsl[1].value, hsl[2].value);
    lazyRgb(hsl2rgb);
    
    console.log('HSL');
    setHex(rgbToHex(rgb[0].value, rgb[1].value, rgb[2].value));
    
  }, [hsl]);
  
  // For CMYK Handle
  useEffect(() => {
    const cmyk2rgb = cmykToRgb(cmyk[0].value, cmyk[1].value, cmyk[2].value, cmyk[3].value);
    lazyRgb(cmyk2rgb);
    
    console.log('CMYK');
    setHex(rgbToHex(rgb[0].value, rgb[1].value, rgb[2].value));
  }, [cmyk]);

  // Function
  function handleRGB(event, newValue) {
    const index = event.currentTarget.id !== undefined ? event.currentTarget.id : event.target.ariaLabel;

    setRgb([
      { "color": "red", "value": index === "rgb[0]" ? newValue : rgb[0].value },
      { "color": "green", "value": index === "rgb[1]" ? newValue : rgb[1].value },
      { "color": "blue", "value": index === "rgb[2]" ? newValue : rgb[2].value }
    ]);

  }

  function handleHSL(event, newValue) {
    const index = event.currentTarget.id !== undefined ? event.currentTarget.id : event.target.ariaLabel;
    setHsl([
      { "color": "hue", "value": index === "hsl[0]" ? newValue : hsl[0].value },
      { "color": "saturate", "value": index === "hsl[1]" ? newValue : hsl[1].value },
      { "color": "lighten", "value": index === "hsl[2]" ? newValue : hsl[2].value }
    ]);

  }

  function handleCMYK(event, newValue) {
    const index = event.currentTarget.id !== undefined ? event.currentTarget.id : event.target.ariaLabel;
    setCmyk([
      { "color": "cyan", "value": index === "cmyk[0]" ? newValue : cmyk[0].value },
      { "color": "magenta", "value": index === "cmyk[1]" ? newValue : cmyk[1].value },
      { "color": "yellow", "value": index === "cmyk[2]" ? newValue : cmyk[2].value },
      { "color": "black", "value": index === "cmyk[3]" ? newValue : cmyk[3].value }
    ]);

  }

  function handleGreyScale(event, newValue) {
    setGreyScale(newValue);
  }

  function handleTabs(event, newValue) {
    setTabs(newValue);
  }

  return (
    <main className="main">
      <Container>
        <Jimage
          src={Image}
          color={tabs === 0 || tabs === 1 || tabs === 3 ? [
            { apply: "red", params: [rgb[0].value] },
            { apply: "green", params: [rgb[1].value] },
            { apply: "blue", params: [rgb[2].value] }
          ] :
            [{ apply: "desaturate", params: [100] },]
          }
        />
        <TypeGraph color={hex}>{hex}</TypeGraph>
      </Container>
      <Container >
        <Paper square>
          <Tabs
            value={tabs} textColor="primary"
            indicatorColor="primary" onChange={handleTabs}
            aria-label="disabled tabs example">
            <Tab label="RGB" />
            <Tab label="HSL" />
            <Tab label="Grayscale" />
            <Tab label="CMYK" />
          </Tabs>
        </Paper>
        {/* RGB */}
        <ColorContainer display={tabs === 0 ? `block` : "none"} className="rgb-container">
          {rgb.map((v, index) => (
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <PrettoSlider id={`rgb[${index}]`} value={v.value} aria-label={`rgb[${index}]`} color={v.color} max={255}
                  valueLabelDisplay="auto" defaultValue={0} onChange={handleRGB} />
              </Grid>
              <Grid item xs>
                <Typography>{`${v.value}`}</Typography>
              </Grid>
            </Grid>
          ))}
          <Button container variant="contained" onClick={() => setRgb(rgbArr)} color="default">Reset RGB</Button>
        </ColorContainer>
        {/* HSL */}
        <ColorContainer display={tabs === 1 ? `block` : `none`}>
          {hsl.map((v, index) => (
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <PrettoSlider id={`hsl[${index}]`} aria-label={`hsl[${index}]`} 
                color="black" max={v.color === "hue" ? 360 : 100} value={v.value} valueLabelDisplay="auto" 
                onChange={handleHSL} 
                background={v.color === "hue" ? 'linear-gradient(to right, red, yellow, green, cyan, blue, magenta, red)' : 'black'} />
              </Grid>
              <Grid item xs>
                <Typography>{`${v.value}`}</Typography>
              </Grid>
            </Grid>
          ))}
          <Button container variant="contained" onClick={() => setHsl(hslArr)} color="default">Reset HSL</Button>
        </ColorContainer>
        {/* GrayScale */}
        <ColorContainer display={tabs === 2 ? 'block' : 'none'}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <PrettoSlider id='greyscale' value={greyScale} aria-label='greyscale' color='grey' max={100}
                valueLabelDisplay="auto" defaultValue={100} onChange={handleGreyScale} />
            </Grid>
            <Grid item xs>
              <Typography>{greyScale}</Typography>
            </Grid>
          </Grid>
        </ColorContainer>
        {/* CMYK */}
        <ColorContainer display={tabs === 3 ? `block` : `none`}>
          {cmyk.map((v, index) => (
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <PrettoSlider id={`cmyk[${index}]`} aria-label={`cmyk[${index}]`} color={v.color} max={100}
                  value={v.value} valueLabelDisplay="auto" onChange={handleCMYK} />
              </Grid>
              <Grid item xs>
                <Typography>{`${v.value}`}</Typography>
              </Grid>
            </Grid>
          ))}
          <Button container variant="contained" onClick={() => setHsl(hslArr)} color="default">Reset HSL</Button>
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
  track:{
    background: "inherit",
    height: 8,
    borderRadius: 4,
  },
  rail: props => ( {
    background: props.background,
    height: 8,
    borderRadius: 4,
  }),
})(Slider);

const TypeGraph = withStyles({
  root: props => ({
    color: props.color
  })
})(Typography);


export default App;

ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
  document.getElementById('root')
);

