import React, {Component} from 'react';
import {getFundingDetailsArrayBy,investFunding} from "../../eth/interaction";
import CardExampleColored from '../common/CardList';
import {Dimmer, Form, Label, Loader, Segment} from 'semantic-ui-react';


class AllFundingTab extends Component {
    constructor() {
        super();
        this.state = {
            allFundingDetailsArray: [],
            selectedFundingDetail: '',
            active: false,
        }
    }

    onItemClick = (detail) => {
        console.log('selectedFunding : ', detail);
        this.setState({selectedFundingDetail: detail});
    }

    handleInvest = async () => {
        try {
            this.setState({active:true});
            const {funding,projectName,supportBalance} = this.state.selectedFundingDetail;
            console.log('funding:',funding);
            let result = await investFunding(funding,supportBalance);
            this.setState({active:false});
            alert(`参与众筹成功\n项目名称：${projectName}\n项目地址：${funding}\n支持金额：${supportBalance}`);
            console.log('invest successfully:\n', result);
        }catch (e) {
            this.setState({active: false});
            console.log(e);
        }
    }

    async componentDidMount() {
        try {
            let allFundingDetailsArray = await getFundingDetailsArrayBy(1);
            this.setState({allFundingDetailsArray});
            console.table(allFundingDetailsArray);
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const {selectedFundingDetail} = this.state;
        return (
            <div>

                <CardExampleColored details={this.state.allFundingDetailsArray} onItemClick={this.onItemClick}/>

                <br/>
                {
                    selectedFundingDetail && (
                    <div>
                        <h3>参与众筹</h3>
                        <Dimmer.Dimmable as={Segment} dimmed={this.state.active}>
                            <Dimmer active={this.state.active} inverted>
                                <Loader>支持中</Loader>
                            </Dimmer>
                            <Form onSubmit={this.handleInvest}>
                                <Form.Input type='text' value={selectedFundingDetail.projectName || ''} label='项目名称:'/>
                                <Form.Input type='text' value={selectedFundingDetail.funding || ''} label='项目地址:'/>
                                <Form.Input type='text' value={selectedFundingDetail.supportBalance || ''} label='支持金额:'
                                            labelPosition='left'>
                                    <Label basic>￥</Label>
                                    <input/>
                                </Form.Input>

                                <Form.Button primary content='参与众筹'/>
                            </Form>
                        </Dimmer.Dimmable>
                    </div>)
                }
            </div>
        );
    }
}

export default AllFundingTab;