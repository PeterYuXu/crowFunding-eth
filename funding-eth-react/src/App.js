import React, {Component} from 'react';
import web3 from './utils/getWeb3';
import contracts from "./eth/contracts";
import TabCenter from "./components/TabCenter"

class App extends Component {
    constructor() {
        super();
        this.state = {
            platformManager:'',
            currentAccount: '',
            allFundings:[],
        }
    }

    async componentDidMount() {
        let accounts = await web3.eth.getAccounts();

        let allFundings = await contracts.fundingFactoryContract.methods.getAllFunding().call({
            from: accounts[0],
        })

        let platformManager = await contracts.fundingFactoryContract.options.platformProvider;

        this.setState({
            currentAccount: accounts[0],
            allFundings,
            platformManager,
        });
    }

    render() {
        let {platformManager,currentAccount,allFundings} = this.state;
        return (
            <div>

                <p>管理员的地址为：{platformManager}</p>
                <p>当前的地址为：{currentAccount}</p>
                <p>当前所有合约地址：{allFundings}</p>
                <TabCenter/>
            </div>
        );
    }
}

export default App;
