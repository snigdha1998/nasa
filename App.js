import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from "moment";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { NASA_API_KEY } from './config';
import MyAppBar from './components/common/appbar';
import NasaRover from './components/nasaRover/nasaRover';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nasaData: {},
      fetching: false,
      error: null
    }
  }
  componentDidMount() {
    this.setState({
      fetching: true
    })
    const nasaUrl = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
    axios.get(nasaUrl)
      .then((res) => {
        console.log(res.data)
        this.setState({
          nasaData: res.data,
          fetching: false
        })
      })
      .catch((err) =>{
        this.setState({
          error: err,
          fetching: false
        })
      })
  }
  render() {
    return (
      <div>
        <MyAppBar />
        {
          this.state.nasaData.title
            ? <Card>
                <CardContent>
                  <img src={this.state.nasaData.url} alt=""style={{width: 650,height:400}}/>
                  <Typography gutterBottom variant="headline" component="h2">
                 Image of the Day
                </Typography>
                      <Typography component="p">
                      {this.state.nasaData.explanation}
                </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Share
                </Button>
                      <Button size="small" color="primary">
                        Learn More
                </Button>
                    </CardActions>
             </Card>
            : <p>Loading...</p>
        }
<NasaRover/>
      </div>
    );
  }
}

App.propTypes = {
  // classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);