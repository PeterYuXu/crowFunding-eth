import React, {Component} from 'react';
import {getCreatorFundingDetailsArray} from "../../eth/interaction";
import CardExampleColored from '../common/CardList';

class CreatorFundingTab extends Component {

    constructor(){
        super();
        this.state = {
            creatorFundingDetailsArray:[],
        }
    }

    async componentDidMount(){
        try{
            let creatorFundingDetailsArray = await getCreatorFundingDetailsArray();
            this.setState({creatorFundingDetailsArray});
            console.table(creatorFundingDetailsArray);

        }catch (e){
            console.log(e);
        }
    }

    render() {
        return (
            <div>
                <CardExampleColored details={this.state.creatorFundingDetailsArray}/>
            </div>
        );
    }
}

export default CreatorFundingTab;