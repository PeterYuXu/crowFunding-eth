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

    //众筹失败，退款
    function drawBack()public {
        for(uint i = 0;i<investors.length;i++){
            investors[i].transfer(supportBalance);
        }
        //这个合约基本就会被废弃掉，所以就不去处理inverstors,investorExistMap了
    }

    //查看合约当前余额
    function getCurrentBalance()public view returns(uint){
        return address(this).balance;
    }

    //返回所有的投资人
    function getInvestors()public view returns(address[]){
        return investors;
    }
}
