import React, { Component } from 'react';
import { Router } from '@reach/router';

import Menu from './components/header/Menu';

import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaVimeo
} from 'react-icons/fa';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from './home';
import SearchResultsPage from './search-results';
import JobApplyPage from './job-apply';

export default class App extends Component {

  render() {
    return (
      <div className="site-wrap">
        <Menu />
        <Router>
          <HomePage path="/" />
          <SearchResultsPage path="search" />
          <JobApplyPage path="apply/:jobId" />
        </Router>
        <footer className="site-footer">
          <div className="container">


            <div className="row">
              <div className="col-md-4">
                <h3 className="footer-heading mb-4 text-white">About</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quos rem ullam, placeat amet.</p>
                <p><a href="/" className="btn btn-primary pill text-white px-4">Read More</a></p>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                    <h3 className="footer-heading mb-4 text-white">Quick Menu</h3>
                    <ul className="list-unstyled">
                      <li><a href="/">About</a></li>
                      <li><a href="/">Services</a></li>
                      <li><a href="/">Approach</a></li>
                      <li><a href="/">Sustainability</a></li>
                      <li><a href="/">News</a></li>
                      <li><a href="/">Careers</a></li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <h3 className="footer-heading mb-4 text-white">Categories</h3>
                    <ul className="list-unstyled">
                      <li><a href="/">Full Time</a></li>
                      <li><a href="/">Freelance</a></li>
                      <li><a href="/">Temporary</a></li>
                      <li><a href="/">Internship</a></li>
                    </ul>
                  </div>
                </div>
              </div>


              <div className="col-md-2">
                <div className="col-md-12"><h3 className="footer-heading mb-4 text-white">Social Icons</h3></div>
                <div className="col-md-12">
                  <p>
                    <a href="/" className="pb-2 pr-2 pl-0"><FaFacebook /></a>
                    <a href="/" className="p-2"><FaTwitter /></a>
                    <a href="/" className="p-2"><FaInstagram /></a>
                    <a href="/" className="p-2"><FaVimeo /></a>

                  </p>
                </div>
              </div>
            </div>
            <div className="row pt-5 mt-5 text-center">
              <div className="col-md-12">
                <p>
                  Copyright &copy; All Rights Reserved | Based in JobFinder template by <a href="https://colorlib.com/wp/template/jobfinder/" target="_blank" rel="noopener noreferrer" >Colorlib</a>
                </p>
              </div>

            </div>
          </div>
        </footer>

      </div>
    );
  }
}

