import React, {Component} from 'react';
import SuitCase from './SuitCase';
import Prize from './Prize';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { setSuitCases } from '../actions';

class App extends Component {
    constructor(){
        super();
        this.state = {
            offer:100,
            cases: 30
        }
    }
    
    render(){
        const {suitcases, prizes, offer:{offer, remainingCases} } = this.props;
        return (
            <React.Fragment>
                <h2>Deal or No Deal</h2>
                <div inline="true">
                    <Button className='btn btn-success'>Start</Button>
                    <Button className='btn btn-warn'>Continue</Button>
                    <Button className='btn btn-danger'>Quit</Button>
                </div>
                <h4>Cases Remaining = {remainingCases}</h4>
                <div className="offer">
                    <h4>
                        Current Offer = ${offer}
                    </h4>
                </div>
                <div className="game-area">
                    {suitcases.map(suitcase => 
                        <SuitCase key={suitcase.id} suitcase={suitcase}/>                
                        )}
                </div>
                <div className="prize-area">
                <div><h3>Remaining Prizes</h3></div>
                {prizes.map(prize => 
                    <Prize key={prize.id} prize={prize}/>                
                    )}
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        suitcases: state.suitcases,
        prizes: state.prizes,
        offer: state.offer
    }
};

// const maptDispatchToProps = (dispatch) => {

// }

export default connect(mapStateToProps, {setSuitCases})(App);