pragma solidity ^0.4.24;

contract crowFunding {
    address public creator;//众筹发起人
    string public projectName;//项目名称
    uint public supportBalance;//参与众筹金额
    uint public targetBalance;//目标金额
    uint public endTime;//截至时间
    Request[] public requests;//请求可能有多个，所以定义一个数组
    address [] public investors;//投资人
    mapping(address => bool)public investorExistMap;//标记一个人是否参与当前众筹
    enum RequestStatus {Voting, Approved, Completed}

    constructor(string _projectName, uint _supportBalance, uint _targetBalance, uint _durationInSeconds)public{
        creator = msg.sender;
        projectName = _projectName;
        supportBalance = _supportBalance;
        targetBalance = _targetBalance;
        endTime = now + _durationInSeconds;
    }

    function invest() public payable {
        require(msg.value == supportBalance);
        //支持固定金额
        investors.push(msg.sender);
        //添加到众筹人员中
        investorExistMap[msg.sender] = true;
        //标记当前为参与人
    }

    //众筹失败，退款
    function drawBack() public onlyCreator{
        for (uint i = 0; i < investors.length; i++) {
            investors[i].transfer(supportBalance);
        }
        //这个合约基本就会被废弃掉，所以就不去处理investors,investorExistMap了
    }

    //查看合约当前余额
    function getCurrentBalance() public view returns (uint){
        return address(this).balance;
    }

    //返回所有的投资人
    function getInvestors() public view returns (address[]){
        return investors;
    }

    struct Request {
        string purpose;//买什么
        uint cost;//多少钱
        address shopAddress;//向谁买
        uint voteCount;//多少人赞成，超过半数则批准支出
        RequestStatus status;//申请的状态：投票中？已批准？已完成？
        mapping(address => bool) investorVotedMap;//赞成人的标记集合
    }

    //创建申请
    function createRequest(string _purpose, uint _cost, address _shopAddress) public onlyCreator{
        Request memory request = Request({
            purpose : _purpose,
            cost : _cost,
            shopAddress : _shopAddress,
            voteCount : 0,
            status : RequestStatus.Voting
            });
        requests.push(request);//将新的请求添加至数组中
    }

    function approveRequest(uint index)public{
        //只能是参与众筹的的人参与，否则无权投票
        require(investorExistMap[msg.sender]);

        //根据索引找到特定的请求
        Request storage request = requests[index];//使用storage使得request的修改可以保存到requests中

        //确保每人只能投一票
        require(!request.investorVotedMap[msg.sender]);

        //如果已经完成就不用投票了，当前投票不影响决策
        require(request.status == RequestStatus.Voting);
        //支持票数加1
        request.voteCount++;

        //标记为以投票
        request.investorVotedMap[msg.sender] = true;
    }

    //执行申请
    function finalizeRequest(uint index)public onlyCreator{
        Request storage request = requests[index];
        //合约金额充足才可以执行
        require(address(this).balance >= request.cost);
        //赞成人数过半
        require(request.voteCount *2 >investors.length);
        //转账
        request.shopAddress.transfer(request.cost);
        //更新请求的状态
        request.status = RequestStatus.Completed;
    }

    //权限控制，只有项目方才能操作
    modifier onlyCreator(){
        require(msg.sender == creator);
        _;
    }

    //返回投资人数量
    function getInvestorCount()public view returns (uint){
        return investors.length;
    }

    //返回众筹剩余的时间
    function getRemainTime()public view returns (uint){
        return (endTime-now)/60/60/24;
    }

    //返回花费申请数量
    function getRequestsCount()public view returns (uint){
        return requests.length;
    }

    //返回某一花费申请的具体情况
    function getRequestDetailByIndex(uint index)public view returns(string, uint, address, bool, uint, uint){
        //确保访问不越界
        require(index<requests.length);

        Request storage req = requests[index];

        bool isVoted = req.investorVotedMap[msg.sender];
        return (req.purpose,req.cost,req.shopAddress,isVoted,req.voteCount,uint(req.status));
    }

}
