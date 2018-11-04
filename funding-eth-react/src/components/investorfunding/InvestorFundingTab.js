import React, {Component} from 'react';
import {getFundingDetailsArrayBy} from "../../eth/interaction";
import CardExampleColored from "../common/CardList";

class InvestorFundingTab extends Component {
    constructor() {
        super();
        this.state = {
            investorFundingDetailsArray: [],
        }
    }

    async componentDidMount(){
        try {
            this.mounted = true;
            let investorFundingDetailsArray = await getFundingDetailsArrayBy(3);
            if (!this.mounted) return;
            this.setState({investorFundingDetailsArray});
            console.table(investorFundingDetailsArray);
        }catch (e){
            console.log(e);
        }
    }

    render() {
        const {investorFundingDetailsArray} = this.state;

        return (
            <div>
                <CardExampleColored details={investorFundingDetailsArray}/>
            </div>
        );
    }
}

export default InvestorFundingTab;