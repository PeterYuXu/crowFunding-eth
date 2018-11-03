import React, {Component} from 'react';
import {getCreatorFundingArray} from "../../eth/interaction";

class CreatorFundingTab extends Component {

    async componentDidMount(){
        try{
            let creatorFundingArray = await getCreatorFundingArray();
            this.setState({creatorFundingArray});
            console.table(creatorFundingArray);

        }catch (e){
            console.log(e);
        }
    }

    render() {
        return (
            <div>
                CreatorFundingTab
            </div>
        );
    }
}

export default CreatorFundingTab;