import web3 from "../utils/getWeb3";
import contracts from "./contracts";


const getCreatorFundingArray = () => {
    return new Promise(async (resolve,reject) =>{
        try{
            let accounts = await web3.eth.getAccounts();

            let fundingArray = await contracts.fundingFactoryContract.method.getCreatorFunding().call({form:accounts[0]});

            resolve(fundingArray);
        }catch (e){
            reject(e);
        }

    })
}

export {
    getCreatorFundingArray,
}