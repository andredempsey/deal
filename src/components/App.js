import React, {Component} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import SuitCase from './SuitCase';
import Prize from './Prize';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { setSuitCases, removePrize, pickCase } from '../actions';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
    constructor(){
        super();
        this.state = {
            offer:0,
            leftThisRound: 5,
            round: 1,
            available: 32
        }
    };

    start = () => {
        window.location.reload();
    };

    setRound = (offer) => {
        const { round } = this.state;
        const newRound = round + 1;
        this.setState({ round:newRound, offer  });
    };

    randomIntFromInterval = (lower,upper) => {
        return Math.floor(Math.random()*(upper-lower+1)+lower)/100;
    };

    getExpectedValue = () => {
        //get expected value of cases
        const { available } = this.state; 
        const { prizes } = this.props;
        let remainingPrizes = prizes.filter((prize)=> prize.inPlay)
        let sumOfValues = remainingPrizes.reduce((previousValue, currentObject)=>{
            return previousValue + currentObject.amount; 
        }, 0);
        console.log("Sum = ", sumOfValues);
        console.log("Remaining cases = ", available);
        return sumOfValues/available.toFixed(0);
    }
    updateOffer = (value) => {
        const { round } = this.state;
        let upper = 100;
        let lower = 1;
        if ( round <= 7){
            upper = 45;
            lower = 30;
        }
        else if (round === 8){
            upper = 55;
            lower = 35;
        }   
        else {
            upper = 65;
            lower = 50;
        }   
        const RV = this.randomIntFromInterval(lower, upper);
        const EV = this.getExpectedValue();
        console.log("Random value = ", RV)
        console.log("Expected value = ", EV)
        const offer = (EV * RV).toFixed(0);
        this.setState({ offer });
        const toastContent = `The banker's offer is $${offer}`;
        toast.info(toastContent, {
            position: "top-center",
            autoClose: 30000,
            closeButton: true,
            onClose: (offer) => this.setRound(offer),
            hideProgressBar: false,
        });
    }

    suitcaseSelected = (suitcase) => {
        const { available } = this.state;
        if(!suitcase.selected){
            const {leftThisRound} = this.state;
            const {value} = suitcase;
            console.log("Available = ", available);
            let toastContent= "";
            let casesLeftBeforeOffer = 5;
            if (available === 32 ){
                toastContent = "You selected case # " + suitcase.label;
                suitcase.chosen = true;
                toast.info(toastContent, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                });
            }
            else if (available === 2)
            {
                toastContent = "Do you want to keep your original case or switch?";
                toast.info(toastContent, {
                    position: "top-center",
                    autoClose: 10000,
                    hideProgressBar: false,
                });
            }            
            else {
                toastContent = "$" + value;
                suitcase.selected = true;
                this.props.removePrize(value);
                toast.success(toastContent, {
                    position: "bottom-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                });
                casesLeftBeforeOffer = leftThisRound - 1; 
                this.setState( { leftThisRound:casesLeftBeforeOffer });
            }
            this.setState({ available: available - 1})
            this.props.pickCase(suitcase);
            if(casesLeftBeforeOffer === 0){
                this.updateOffer(value);
                if (available >= 22){
                    this.setState({ leftThisRound: 5 })
                }
                else if (available >= 12){
                    this.setState({ leftThisRound: 4 })
                }
                else if (available > 2){
                    this.setState({ leftThisRound: 3 })
                }
                else if (available === 2){
                    this.setState({ leftThisRound: 1 })
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
                    <Button className='btn btn-success' onClick={this.start}>Start</Button>
                    <span className="info"> Round {round} </span>
                    <span className="info">Cases Remaining = { available }</span>
                    <span className="info">Last Offer = ${offer}</span>
                    <Button className='btn btn-danger'>Quit</Button>
                </div>
                <div className="game-area">
                    {suitcases.map(suitcase => 
                        <SuitCase 
                        key={suitcase.id} 
                        suitcase={suitcase}
                        selectedSuitcase = {(value)=>this.suitcaseSelected(value)}/>                
                        )}
                </div>
                <ToastContainer
                    position="bottom-center"
                />
                <div className="prize-area">
                <div><h4>Remaining Prizes</h4></div>
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