pragma solidity ^0.4.24;

//导入单个合约文件
import './basicFunding.sol';
import './InvestorToFunding.sol';

contract FundingFactory {
    address [] public crowFundingArray;
    mapping(address => address[]) public creatorFundingMap;
    address public platformProvider;
    InvestorToFunding i2f;
    constructor()public {
        platformProvider = msg.sender;
        //实例化InvestorToFunding合约，返回一个地址
        address i2fAddress = new InvestorToFunding();
        //将地址显示转换为InvestorToFunding类型，此时i2可以正常使用了
        i2f = InvestorToFunding(i2fAddress);
    }

    function createFunding(string _projectName, uint _supportMoney, uint _goalMoney, uint _duration)public{
        //创建一个合约
        address fundingAddress = new CrowFunding(_projectName, _supportMoney, _goalMoney, _duration, msg.sender,i2f);
        //添加到合约集中
        crowFundingArray.push(fundingAddress);
        //添加到我所创建合约的集合中
        creatorFundingMap[msg.sender].push(fundingAddress);
    }

    //返回该众筹平台所有的合约
    function getAllFunding()public view returns(address[]){
        return crowFundingArray;
    }

    //返回当前账户所创建的所有合约
    function getCreatorFunding()public view returns(address[]){
        return creatorFundingMap[msg.sender];
    }

    //返回当前账户参加的所有合约。
    function getInvestorFunding()public view returns(address[]){
        return i2f.getFundingBy(msg.sender);
    }
}
