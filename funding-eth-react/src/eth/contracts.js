import web3 from '../utils/getWeb3';


//将ABI添加到这里
const fundingFactoryABI = [ { "constant": false, "inputs": [ { "name": "_projectName", "type": "string" }, { "name": "_supportMoney", "type": "uint256" }, { "name": "_goalMoney", "type": "uint256" }, { "name": "_duration", "type": "uint256" } ], "name": "createFunding", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "uint256" } ], "name": "creatorFundingMap", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "crowFundingArray", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getAllFunding", "outputs": [ { "name": "", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getCreatorFunding", "outputs": [ { "name": "", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getInvestorFunding", "outputs": [ { "name": "", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "platformProvider", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" } ];

const fundingFactoryAddress = '0x2091e48da49a898587fcbdca027dec9435bc0665';

//创建fundingFactory合约势力
let fundingFactoryContract = new web3.eth.Contract(fundingFactoryABI,fundingFactoryAddress);


let contracts = {
    fundingFactoryContract,
}

export default contracts;