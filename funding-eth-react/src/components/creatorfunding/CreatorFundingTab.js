import React, {Component} from 'react';
import {getCreatorFundingDetailsArray,createFunding} from "../../eth/interaction";
import CardExampleColored from '../common/CardList';
import {Dimmer, Form, Label, Segment, Loader, Button} from 'semantic-ui-react';

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

    render() {
        let {active, supportBalance, projectName, targetBalance, duration,

        } = this.state



        return (
            <div>
                <CardExampleColored details={this.state.creatorFundingDetailsArray}/>


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
            </div>


        );
    }
}

export default CreatorFundingTab;