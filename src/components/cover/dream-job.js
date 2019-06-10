import React, {Component} from 'react';
import Fade from 'react-reveal/Fade';


export default class DramJobCover extends Component {
    render(){
        return(
        <Fade className="mol-md-6 text-center" top>
            <div style={{backgroundColor:"rgba(0,0,0,0.75)"}} className="col-md-6">
                <h1 className="h3 mb-0">Your Dream Job</h1>
                <p className="h3 text-white mb-5">Is Waiting For You</p>
                <p><a href="/" className="btn btn-outline-warning py-3 px-4">Find Jobs</a> <a href="/" className="btn btn-warning py-3 px-4">Apply For A Job</a></p>
            </div>
            
        </Fade>
        );
    }
}