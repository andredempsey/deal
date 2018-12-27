import React, {Component} from 'react';
import { connect } from 'react-redux';
class SuitCase extends Component {
    constructor(){
        super();
        this.state = {reveal: true};
    }
    render(){
        const {suitcase} = this.props;
        return (
            <div className = {this.state.reveal ? "suitcase value-reveal": "suitcase value-hidden"} 
            onClick={() => this.setState({reveal:false})}>
                {this.state.reveal ? <h4>{suitcase.label}</h4> : <h4>{suitcase.value}</h4>}
            </div>
        )
    };
}

export default connect(null, null)(SuitCase);