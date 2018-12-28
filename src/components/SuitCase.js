import React, {Component} from 'react';
import { connect } from 'react-redux';
import { pickCase, removePrize } from '../actions';

class SuitCase extends Component {
    constructor(){
        super();
        this.state = {reveal: true};
    }
    selectCase = (suitcase) => {
        console.log(suitcase);
        this.props.pickCase(suitcase);
        this.props.removePrize(suitcase.value);
        this.setState({reveal:false})
    }

    render(){
        const {suitcase} = this.props;
        return (
            <div className = {this.state.reveal ? "suitcase value-reveal": "suitcase value-hidden"} 
            onClick={()=>this.selectCase(this.props.suitcase)}>
                {this.state.reveal ? <h4>{suitcase.label}</h4> : <h4>${suitcase.value}</h4>}
            </div>
        )
    };
}
export default connect(null, {pickCase, removePrize})(SuitCase);