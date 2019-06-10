import React, { Component } from 'react';

import './site-section.css';

export default class SiteSection extends Component { 
    
    render() {
        return(
            <div className={ `site-section ${ this.props.className }` }>
                {this.props.sectionComponent}
            </div>
        );
    }
}