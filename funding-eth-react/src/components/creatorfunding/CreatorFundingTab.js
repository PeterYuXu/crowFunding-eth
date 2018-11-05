import React, {Component} from 'react';
import {getFundingDetailsArrayBy,createFunding,createRequest,showRequests,finalizeRequest,} from "../../eth/interaction";
import CardExampleColored from '../common/CardList';
import {Dimmer, Form, Label, Segment, Loader, Button} from 'semantic-ui-react';
import TableExamplePagination from '../common/RequestList';
class CreatorFundingTab extends Component {

    constructor(){
        super();
        this.state = {
            creatorFundingDetailsArray: [],
            projectName: '',
            supportBalance: '',
            targetBalance: '',
            duration: '',
            active: false,
            selectedFundingDetail:'',
            cost : '',
            seller: '',
            purpose:'',
            requests: [],
        }
    }

    async componentDidMount(){
        try{
            this.mounted = true;
            let creatorFundingDetailsArray = await getFundingDetailsArrayBy(2);
            if (!this.mounted) return;
            this.setState({creatorFundingDetailsArray});
            console.table(creatorFundingDetailsArray);

        }catch (e){
            console.log(e);
        }
    }

    //表单数据发生变化
    handleChange = (e,{name,value}) => this.setState({[name]:value});

    //创建众筹处理函数
    handleCreate = async () => {
        const {projectName, supportBalance, targetBalance, duration} = this.state;
        var r = /^\+?[1-9][0-9]*$/;

        //校验为数字
        if (!r.test(supportBalance + targetBalance + duration)){
            alert('输入的不是数字！')
            return
        }
        this.setState({active:true});

        try{
            let result = await createFunding(projectName,supportBalance,targetBalance, duration);
            console.table(result);
            this.setState({active:false});
        }catch (e){
            this.setState({active:false});
            console.log('createFunding error:',e);

        }
    }

    handleCreateRequest = async () => {
        //通过表单取到的数据
        let {purpose, cost, seller} = this.state;
        //点击取到的数据
        let {0:fundingAddress} = this.state.selectedFundingDetail

        console.log(purpose, cost, seller, fundingAddress)

        try {
            let result = await createRequest(fundingAddress, purpose, cost, seller);
            console.log(result);
            alert(`创建支付申请成功！`);
        } catch (e) {
            console.log(e);
        }
    }

    onItemClick = (detail) => {
        console.log('selectedFunding : ', detail);
        this.setState({selectedFundingDetail: detail});
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

    onFinalizeClick = async (index) => {
        try {
            console.log('click index :', index);
            await finalizeRequest(this.state.selectedFundingDetail.funding, index);
        } catch (e) {
            console.log(e)
        }
    }

    render() {

        let {creatorFundingDetailsArray, active, duration, supportBalance,
            targetBalance, projectName, selectedFundingDetail, purpose, cost, seller,
            requests,
        } = this.state

        return (
            <div>
                <CardExampleColored details={creatorFundingDetailsArray} onItemClick={this.onItemClick}/>

                <h2>发起众筹</h2>
                <div>
                    <Dimmer.Dimmable as={Segment} dimmed={active}>
                        <Dimmer active={active} inverted>
                            <Loader>Loading</Loader>
                        </Dimmer>
                        <Form onSubmit={this.handleCreate}>
                            <Form.Input required type='text' placeholder='项目名称' name='projectName'
                                        value={projectName} label='项目名称:'
                                        onChange={this.handleChange}/>
                            <Form.Input required type='text' placeholder='支持金额' name='supportBalance'
                                        value={supportBalance} label='支持金额:'
                                        labelPosition='left'
                                        onChange={this.handleChange}>
                                <Label basic>￥</Label>
                                <input/>
                            </Form.Input>

                            <Form.Input required type='text' placeholder='目标金额' name='targetBalance' value={targetBalance}
                                        label='目标金额:'
                                        labelPosition='left'
                                        onChange={this.handleChange}>
                                <Label basic>￥</Label>
                                <input/>
                            </Form.Input>
                            <Form.Input required type='text' placeholder='目标金额' name='duration' value={duration}
                                        label='众筹时间:'
                                        labelPosition='left'
                                        onChange={this.handleChange}>
                                <Label basic>S</Label>
                                <input/>
                            </Form.Input>
                            <Form.Button primary content='创建众筹'/>
                        </Form>
                    </Dimmer.Dimmable>
                </div>

                {
                    selectedFundingDetail && (
                        <div>
                            <h3>发起付款请求</h3>

                            <Segment>
                                <h4>当前项目:{selectedFundingDetail.projectName}, 地址: {selectedFundingDetail.funding}</h4>
                                <Form onSubmit={this.handleCreateRequest}>
                                    <Form.Input type='text' name='requestDesc' required value={purpose}
                                                label='请求描述' placeholder='请求描述' onChange={this.handleChange}/>

                                    <Form.Input type='text' name='requestBalance' required value={cost}
                                                label='付款金额' labelPosition='left' placeholder='付款金额'
                                                onChange={this.handleChange}>
                                        <Label basic>￥</Label>
                                        <input/>
                                    </Form.Input>

                                    <Form.Input type='text' name='requestAddress' required value={seller}
                                                label='商家收款地址' labelPosition='left' placeholder='商家地址'
                                                onChange={this.handleChange}>
                                        <Label basic><span role='img' aria-label='location'>📍📍</span></Label>
                                        <input/>
                                    </Form.Input>

                                    <Form.Button primary content='开始请求'/>
                                </Form>
                            </Segment>
                        </div>)
                }

                {
                    selectedFundingDetail && (
                        <div>
                            <Button onClick={this.onRequestDetailsClick}>申请详情</Button>
                            <TableExamplePagination requestDetails={requests}
                                                    investorCount={selectedFundingDetail.investorCount}
                                                    onFinalizeClick = {this.onFinalizeClick}
                                                    pageKey={2}
                            />
                        </div>
                    )
                }

            </div>


        );
    }
}

export default CreatorFundingTab;