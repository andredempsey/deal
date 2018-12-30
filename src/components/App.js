import React, {Component} from 'react';
import { ToastContainer, toast } from 'react-toastify';
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
            const toastContent = "$" + value;
            toast.info(toastContent, {
                position: toast.POSITION.TOP_CENTER
              });
            this.props.pickCase(suitcase);
            this.props.removePrize(value);
            const casesLeftBeforeOffer = leftThisRound - 1; 
            this.setState( { leftThisRound:casesLeftBeforeOffer });
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
    }
    render(){
        const { suitcases, prizes } = this.props;
        const { offer, round, available } = this.state;
        return (
            <React.Fragment>
                <h1>Deal or No Deal</h1>
                <div inline="true">
                    <span> Round {round} </span>
                    <Button className='btn btn-success'>Start</Button>
                    <Button className='btn btn-warn'>Continue</Button>
                    <Button className='btn btn-danger'>Quit</Button>
                    <span>Cases Remaining = { available }</span>
                </div>
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
                <div><h4>Remaining Prizes</h4></div>
                {prizes.map(prize => 
                    <Prize key={prize.id} prize={prize}/>                
                    )}
                </div>
                <ToastContainer autoClose = {3000}/>
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