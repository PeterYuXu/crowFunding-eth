import React, {Component} from 'react';
import {getFundingDetailsArrayBy} from "../../eth/interaction";
import CardExampleColored from '../common/CardList';



class AllFundingTab extends Component {
    constructor(){
        super();
        this.state = {
            allFundingDetailsArray:[],
        }
    }

    async componentDidMount(){
        try {
            let allFundingDetailsArray = await getFundingDetailsArrayBy(1);
            this.setState({allFundingDetailsArray});
            console.table(allFundingDetailsArray);
        }catch (e){
            console.log(e);
        }
    }

    render() {
        return (
            <div>
                <CardExampleColored details={this.state.allFundingDetailsArray}/>
            </div>
        );
    }
}

export default AllFundingTab;