import React, {Component} from 'react';
import SuitCase from './SuitCase';
import Prize from './Prize';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { setSuitCases, removePrize, pickCase } from '../actions';

class App extends Component {
    constructor(){
        super();
        this.state = {
            offer:0,
            leftThisRound: 5,
            round: 1,
            available: 32
        }
    }

    updateOffer = (value) => {
        this.setState({ offer:(50 * value) });
    }
    
    suitcaseSelected = (suitcase) => {
        const { available } = this.state;
        if(!suitcase.selected){
            const {leftThisRound} = this.state;
            this.setState({ available: available - 1})
            const {value} = suitcase;
            this.props.pickCase(suitcase);
            this.props.removePrize(value);
            const casesLeftBeforeOffer = leftThisRound - 1; 
            this.setState( { leftThisRound:casesLeftBeforeOffer });
            console.log("Cases Left Before Offer: ", casesLeftBeforeOffer);
            if(casesLeftBeforeOffer === 0){
                console.log("Time to make an offer!");
                const { round } = this.state;
                const newRound = round + 1;
                this.setState({ round:newRound });
                this.updateOffer(value);
                if (available >= 22){
                    this.setState({ leftThisRound: 5 })
                }
                else if (available >= 12){
                    this.setState({ leftThisRound: 3 })
                }
                else if (available === 2){
                    this.setState({ leftThisRound: 1 })
                }
                else {
                    this.setState({ leftThisRound: casesLeftBeforeOffer });
                }
            }
        }
        console.log("After a case has been selected: ", this.state);
    }
    render(){
        const { suitcases, prizes } = this.props;
        const { offer, round, available } = this.state;
        return (
            <React.Fragment>
                <h2>Deal or No Deal</h2>
                <h4> Round {round} </h4>
                <div inline="true">
                    <Button className='btn btn-success'>Start</Button>
                    <Button className='btn btn-warn'>Continue</Button>
                    <Button className='btn btn-danger'>Quit</Button>
                </div>
                <h4>Cases Remaining = { available }</h4>
                <div className="offer">
                    <h4>
                        Current Offer = ${offer}
                    </h4>
                </div>
                <div className="game-area">
                    {suitcases.map(suitcase => 
                        <SuitCase 
                        key={suitcase.id} 
                        suitcase={suitcase}
                        selectedSuitcase = {(value)=>this.suitcaseSelected(value)}/>                
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
        prizes: state.prizes
    }
};

export default connect(mapStateToProps, {setSuitCases, removePrize, pickCase})(App);