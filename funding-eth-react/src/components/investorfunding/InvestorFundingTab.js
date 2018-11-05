import React, {Component} from 'react';
import {getFundingDetailsArrayBy, showRequests,approveRequest} from "../../eth/interaction";
import CardExampleColored from "../common/CardList";
import TableExamplePagination from '../common/RequestList';
import {Button} from 'semantic-ui-react';

class InvestorFundingTab extends Component {
    constructor() {
        super();
        this.state = {
            investorFundingDetailsArray: [],
            requests:[],
            selectedFundingDetail:'',
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

    //实现获取请求详细信息方法
    onRequestDetailsClick = async () => {
        try {
            let requests = await showRequests(this.state.selectedFundingDetail.funding);
            this.setState({requests});
            console.table(requests);
        } catch (e) {
            console.log(e)
        }
    }

    //实现同意函数
    onApproveClick= async (index) => {
        try {
            console.log('click index :', index);
            await approveRequest(this.state.selectedFundingDetail.funding, index);
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const {investorFundingDetailsArray,selectedFundingDetail,requests} = this.state;

        return (
            <div>
                <CardExampleColored details={investorFundingDetailsArray} onItemClick={(detail) => {
                    console.log(detail)
                    this.setState({selectedFundingDetail: detail})
                }}/>

                {
                    selectedFundingDetail && (
                        <div>
                            <Button onClick={this.onRequestDetailsClick}>申请详情</Button>
                            <TableExamplePagination requestDetails={requests}
                                                    investorCount={selectedFundingDetail.investorCount}
                                                    onApproveClick={this.onApproveClick}
                                                    pageKey={3}
                            />
                        </div>
                    )
                }
            </div>
        );
    }
}

export default InvestorFundingTab;