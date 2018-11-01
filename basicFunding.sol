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

    address [] public investors;//投资人
    mapping(address => bool)public investorExistMap;//标记一个人是否参与当前众筹

    function invest()public payable {
        require(msg.value == supportBalance);//支持固定金额
        investors.push(msg.sender);//添加到众筹人员中
        investorExistMap[msg.sender] = true;//标记当前为参与人
    }
}
