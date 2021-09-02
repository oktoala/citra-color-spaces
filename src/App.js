import Image from './img/unnamed.jpg';
import { Container, Slider, Grid, Typography, Paper, Tabs, Tab, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { Jimage } from 'react-jimp';
import PropTypes from 'prop-types';

const App = () => {
  return (
    <SliderRGB />
  );
}

const SliderRGB = () => {
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Container>
            {children}
          </Container>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const rgbArr = [
    { "color": "red", "value": 0 },
    { "color": "green", "value": 0 },
    { "color": "blue", "value": 0 }
  ];

  // const [red, setRed] = useState(255);
  // const [green, setGreen] = useState(255);
  // const [blue, setBlue] = useState(255);
  const [rgb, setRgb] = useState(rgbArr);
  const [value, setValue] = useState(0);

  function handleRGB(event, newValue) {
    console.log(event);
    let index = event.currentTarget.id;

    if (event.currentTarget.id === undefined) {
      index = event.target.ariaLabel;
    }
    console.log(`Index: ${index}`);
    setRgb([
      { "color": "red", "value": index === "rgb[0]" ? newValue : rgb[0].value },
      { "color": "green", "value": index === "rgb[1]" ? newValue : rgb[1].value },
      { "color": "blue", "value": index === "rgb[2]" ? newValue : rgb[2].value }
    ]);
    console.log(`Red: ${rgb[0].value}\nGreen: ${rgb[1].value}\nBlue: ${rgb[2].value}`);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
      <Container >
        <Paper square>
          <Tabs
            value={value} textColor="primary"
            indicatorColor="primary" onChange={handleChange}
            aria-label="disabled tabs example">
            <Tab label="RGB" {...a11yProps(0)} />
            <Tab label="HSV" {...a11yProps(1)} />
            <Tab label="RGB" {...a11yProps(2)} />
          </Tabs>
        </Paper>
          {rgb.map((v, index) => (
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <PrettoSlider id={`rgb[${index}]`} aria-label={`rgb[${index}]`} color={v.color} max={255}
                  valueLabelDisplay="auto" defaultValue={0} onChange={handleRGB} />
              </Grid>
              <Grid item >
                <Typography>{`${v.value}`}</Typography>
              </Grid>
            </Grid>
          ))}
        <TabPanel value={value} index={0}>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
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
    // width: 508,
    height: 8,
    borderRadius: 4,
  },
})(Slider);


export default App;
