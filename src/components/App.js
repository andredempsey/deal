import React, {Component} from 'react';
import SuitCase from './SuitCase';
import Prize from './Prize';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { suitcases, prizes } from '../data/initial';
import { setSuitCases } from '../actions';

class App extends Component {
    constructor(){
        super();
        this.state = {
            offer:100,
            cases: 30
        }
    }
    removeCase = () =>{
        const {cases, offer} = this.state;
        const newCases = cases - 1;
        const newOffer = offer - (newCases * 10);
        this.setState({cases:newCases, offer: newOffer});
    }
    render(){
        // const {suitcases} = this.props;
        return (
            <React.Fragment>
                <h2>Deal or No Deal</h2>
                <div inline="true">
                    <Button className='btn btn-success'>Start</Button>
                    <Button className='btn btn-warn'>Continue</Button>
                    <Button className='btn btn-danger' onClick={this.removeCase}>Quit</Button>
                </div>
                <h4>Cases Remaining = {this.state.cases}</h4>
                <div className="offer">
                    <h4>
                        Current Offer = ${this.state.offer}
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
// const mapStateToProps = (state) => {
//     suitcases: state.suitcases
// };

// const maptDispatchToProps = (dispatch) => {

// }

export default connect(null, {setSuitCases})(App);