import React, {Component} from 'react';
import web3 from './utils/getWeb3';
import contracts from "./eth/contracts";

class App extends Component {
    constructor(){
        super();
        this.state = {
            currentAccount:'',
        }
    }

    async componentDidMount(){
        let accounts = await web3.eth.getAccounts();
        this.setState({currentAccount:accounts[0]});
        let fundingArray = await contracts.fundingFactoryContract.methods.getAllFunding().call({
            from : accounts[0],
        })

        console.table(fundingArray);
    }

    render() {
        let {currentAccount} = this.state;
        return (
            <div>您当前的地址为：{currentAccount}</div>
        );
    }
}

export default App;
