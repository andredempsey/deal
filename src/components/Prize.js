import React, { Component } from 'react';

class Prize extends Component {
    constructor(){
        super();
        this.state = {
            inPlay:true
        }
    }
    render() {
        const {prize} = this.props;
        return(
            <div>
                 <div className = {prize.inPlay ? "prize prize-available": "prize prize-removed"}>
                {prize.inPlay ? <h4>${prize.amount}</h4> : <h4>---</h4>}
                </div>
            </div>
        )
    }
}
export default Prize;