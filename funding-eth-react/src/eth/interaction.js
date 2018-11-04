import web3 from "../utils/getWeb3";
import contracts from "./contracts";


const getCreatorFundingDetailsArray = () => {

    return new Promise(async (resolve, reject) => {
        try {
            let accounts = await web3.eth.getAccounts();

            let fundingArray = await contracts.fundingFactoryContract.methods.getCreatorFunding().call({from: accounts[0]});

            let fundingDetailsPromiseArray = fundingArray.map(funding =>getFundingDetail(funding));
            //将所有的promise转成一个promise
            let fundingDetailsArray = Promise.all(fundingDetailsPromiseArray);

            resolve(fundingDetailsArray);
        } catch (e) {
            reject(e);
        }

    })
}


//获取众筹合约详情
let getFundingDetail = (funding) => {
    return new Promise(async (resolve, reject) => {
        try {
            // let fundingContractInstance = contracts.crowFundingContract;
            let fundingContractInstance = contracts.NewCrowFundingContract();
            //实例化合约
            fundingContractInstance.options.address = funding;
            //b. 逐一调用状态变量的访问方法creator(), supportBalance()...
            let projectName = await fundingContractInstance.methods.projectName().call();
            let creator = await fundingContractInstance.methods.creator().call();
            let supportBalance = await fundingContractInstance.methods.supportBalance().call();
            let targetBalance = await fundingContractInstance.methods.targetBalance().call();
            let endTime = await fundingContractInstance.methods.endTime().call();
            let currentBalance = await fundingContractInstance.methods.getCurrentBalance().call();
            let investorCount = await fundingContractInstance.methods.getInvestorCount().call();
            resolve({funding, projectName, creator, supportBalance, targetBalance, endTime, currentBalance, investorCount});
        } catch (e) {
            reject(e);
        }
    })

}

//创建合约
const createFunding = (projectName, supportBalance, targetBalance, duration) => {
    return new Promise(async (resolve,reject)=>{
        try{
            let accounts = await web3.eth.getAccounts();
            let result = await contracts.fundingFactoryContract.methods.createFunding(projectName,supportBalance, targetBalance, duration).send({
                from:accounts[0]
            });
            resolve(result);
        }catch (e){
            reject(e);
        }
    })
}

export {
    getCreatorFundingDetailsArray,
    createFunding,
}