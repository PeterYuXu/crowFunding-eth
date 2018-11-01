pragma solidity ^0.4.24;

contract InvestorToFunding {
    //所有的参与人所参与的所有合约
    mapping(address => address[]) investorToFundingMap;
    //添加指定参与人所参与的数组
    function joinFunding(address investor,address fundingAddress)public{
        investorToFundingMap[investor].push(fundingAddress);
    }

    //返回制定参与人所参与的合约数组
    function getFundings(address investor)public view returns(address[]){
        return investorToFundingMap[investor];
    }
}
