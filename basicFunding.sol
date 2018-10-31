pragma solidity ^0.4.24;

contract crowFunding {
    address public creator;//众筹发起人
    string public projectName;//项目名称
    uint public supportBalance;//参与众筹金额
    uint public targetBalance;//目标金额
    uint public endTime;//截至时间

    constructor(string _projectName, uint _supportBalance, uint _targetBalance, uint _durationInSeconds)public{
        creator = msg.sender;
        projectName = _projectName;
        supportBalance = _supportBalance;
        targetBalance = _targetBalance;
        endTime = now + _durationInSeconds;
    }
}
