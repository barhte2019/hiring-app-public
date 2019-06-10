import React, { Component } from 'react';
import {Parallax} from 'react-parallax';


import {
  Container,
  Row,
} from 'reactstrap';

import './cover.css';

export default class Cover extends Component {

  render() {
    return (
        <Parallax 
            blur={1}
            bgImage={require('../../images/hero_1.jpg')}
            strength={600} className="site-blocks-cover overlay"
            >
            <div className="cover">
                <Container key="cover-key">
                    <Row className="align-items-center" style={{paddingTop:100}}>
                        {this.props.coverContent}
                    </Row>
                </Container>
            </div>
        </Parallax>
    );
  }
}