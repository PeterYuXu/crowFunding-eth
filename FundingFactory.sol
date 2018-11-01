pragma solidity ^0.4.24;

//导入单个合约文件
import './basicFunding.sol';

contract FundingFactory {
    address [] public crowFundingArray;
    mapping(address => address[]) public creatorFundingMap;
    address public platformProvider;

    constructor()public {
        platformProvider = msg.sender;
    }

    function createFunding(string _projectName, uint _supportMoney, uint _goalMoney, uint _duration)public{
        //创建一个合约
        address fundingAddress = new CrowFunding(_projectName, _supportMoney, _goalMoney, _duration, msg.sender);
        //添加到合约集中
        crowFundingArray.push(fundingAddress);
        //添加到我所创建合约的集合中
        creatorFundingMap[msg.sender].push(fundingAddress);
    }

}
