import React, { Component } from 'react';
import { NASA_API_KEY } from '../../config/index';
import axios from 'axios';
import RoverImages from "./roverImages";

const apiURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=10&api_key=${NASA_API_KEY}`;

class NasaRover extends Component {
    constructor(props) {
        super(props)
        this.state = {
            images: [],
            fetching: false,
            error: null
        }
    }
    componentDidMount() {
        this.setState({
            fetching: true
        })
        axios.get(apiURL)
            .then(res => {
                console.log(res.data)
                this.setState({
                    images: res.data.photos,
                    fetching: false
                })
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    fetching: false,
                    error: err
                })
            })
    }
    render() {
        return (
            <div>
                {this.state.fetching
                    ? <p>Fetching images .....</p>
                    : <div>
                        <RoverImages images={this.state.images} />
                    </div>}
            </div>
        )
    }
}
export default NasaRover;