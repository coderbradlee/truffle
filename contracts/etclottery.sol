pragma solidity ^0.4.24;
library Datasets {
    struct Player {
        // uint256 currentroundIn;   // player put in lrnd round
        uint256 currentroundIn0;
        uint256 currentroundIn1;
        // uint256 lastRoundIn;// end时间点结算上一轮，并将此值移动到currentroundIn
        uint256 lastRoundIn0;
        uint256 lastRoundIn1;
        uint256 allRoundIn;
        uint256 win;    // total winnings vault
        uint256 lastwin;
        uint256 withdrawed;
        uint256 currRoundId;   // last round id played
        uint256 lrnd;   // last round id played
        uint8 teamId; //0 for bull,1 for bear
    }
    struct Round {
        address addr;   // address of player in lead
        uint256 strt;   // height round started
        uint256 end;    // height round ended
        uint256 etc;    // total etc in
        uint256 pot;    // etc to pot (during round) / final amount paid to winner (after round ends)
        bool ended;
        uint256 etc0;//etc for bull 
        uint256 etc1;//etc for bear
        int win;//0 for bull,1 for bear
    }
    struct totalData{
        uint256 totalIn;
        uint256 bullTotalIn;
        uint256 bearTotalIn;
        uint256 bullTotalWin;
        uint256 bearTotalWin;
    }
}
contract Lotteryevents {
    event onBuys
    (
        address addr, 
        uint256 amount,
        uint8 _team
    );
    event onWithdraw
    (
        address playerAddress,
        uint256 out,
        uint256 timeStamp
    );
    event onBuyAndDistribute
    (
        address addr,   // address of player in lead
        uint256 strt,   // height round started
        uint256 end,    // height round ended
        uint256 etc,    // total etc in
        uint256 pot,    // etc to pot (during round) / final amount paid to winner (after round ends)
        uint256 etc0,//etc for bull 
        uint256 etc1,//etc for bear
        int win//0 for bull,1 for bear
    );
}
contract etclottery is Lotteryevents{
    using SafeMath for *;
// 给第N+100块的Hash值投注，投注规则分为牛、熊两组，牛组末尾Hash值0-8,熊组末尾Hash值9-f。根据开奖结果，胜利的组（按照投注比例）平分每轮的奖池金额的92%，剩余8%作为手续费和服务维护费用。以100个块为一轮，投注结算时间：每轮开奖前第10个块高度，N+90为截至时间，N+90之后的自动计为当前轮的下一轮，最小投注0.1ETC。
    uint8 constant private rndGap_ = 40;         
    uint8 constant private rndClearingHeight_ = 30;                // round clearing starts at this height
    uint8 constant private fee = 8;
    address constant private feeAddress=0xEDE08Cf3aD687738d2117507F781a59227Dd11a7;
    // uint256 constant private splitThreshold=5000000000000000000;//5eth
    uint256 constant private splitThreshold=50000000000000000;//0.05 for test
    uint256 feeLeft=0;
    address creator;
    mapping (uint256 => Datasets.Round) public round_;  //round id =>round info
    uint256 public rID_=1;    // round id number / total rounds that have happened
    address[] allAddress;//allAddress.push(addre)
    mapping (address => Datasets.Player) allPlayer;//数组保存当前轮地址，结算的时候清理一次，map里面不清理，没有提现的用户后面需要提现
    Datasets.totalData private total;
    constructor() public {
        creator = msg.sender; 
        uint256 curr=block.number;
        round_[rID_].strt = curr;
        round_[rID_].end = curr+rndGap_;
        round_[rID_].ended = false;
        round_[rID_].win = 0;
    }
    function getFee()
        public
        view
        returns(uint256)
    {
        return (feeLeft);
    }
    function getBlock()
        notInClearing()
        public
        returns(bool)
    {
        if(block.number>=round_[rID_].end){
            if(round_[rID_].ended == false)
            {
                round_[rID_].ended = true;
                //分配上一轮的奖金
                uint8 whichTeamWin=sha(round_[rID_].end);
                round_[rID_].win=whichTeamWin;
                splitPot(whichTeamWin);
            }
            return true;
        }
        return false;
    }
    function withdrawFee(uint256 amount)
        isCreator()
        public
    {
        if(feeLeft>=amount)
        {
            feeLeft=feeLeft.sub(amount);
            msg.sender.transfer(amount);     
        }   
    }
    function playerWithdraw(uint256 amount)
        public
    {
        address _customerAddress = msg.sender;
        uint256 left=allPlayer[_customerAddress].win.sub(allPlayer[_customerAddress].withdrawed);
        
        if(left>=amount)
        {
            allPlayer[_customerAddress].withdrawed=allPlayer[_customerAddress].withdrawed.add(amount);
            _customerAddress.transfer(amount);     
            emit Lotteryevents.onWithdraw(msg.sender, amount, now);
        }   
    }
    modifier isHuman() {
        address _addr = msg.sender;
        require (_addr == tx.origin);
        uint256 _codeLength;
        
        assembly {_codeLength := extcodesize(_addr)}
        require(_codeLength == 0, "sorry humans only");
        _;
    }

    /**
     * @dev sets boundaries for incoming tx 
     */
    modifier isWithinLimits(uint256 _etc) {
        require(_etc >= 10000000000000000, "too little");//0.01
        require(_etc <= 100000000000000000000, "too much");//100
        _;    
    }
    modifier notInClearing() {
        require(round_[rID_].ended == false, "cannot buy");
        _;    
    }
    modifier inClearing() {
        require(round_[rID_].ended == true, "can buy");
        _;    
    }
    modifier isCreator() {
        require(creator == msg.sender, "not creator");
        _;    
    }
    function allBuy(uint8 _team)
        internal
    {
        allBuyAmount(msg.value,_team);
    }
    function allBuyAmount(uint256 amount,uint8 _team)
        internal
    {
        require((_team == 0)||(_team == 1),"team 0 or 1");
        buyCore(msg.sender,amount,_team);//0 for default
        allPlayer[msg.sender].allRoundIn=allPlayer[msg.sender].allRoundIn.add(amount);
        feeLeft=feeLeft.add(msg.value.mul(fee).div(100));//更新费
        total.totalIn=total.totalIn.add(amount);
        if(_team==0){
            total.bullTotalIn=total.bullTotalIn.add(amount);
        }else{
            total.bearTotalIn=total.bearTotalIn.add(amount);
        }
    }
    function()
        isHuman()
        isWithinLimits(msg.value)
        notInClearing()
        public
        payable
    {
        allBuy(0);
    }
    function reinvest(uint256 amount, uint8 _team)
        isHuman()
        notInClearing()
        public
    {
        address _customerAddress = msg.sender;
        uint256 left=allPlayer[_customerAddress].win.sub(allPlayer[_customerAddress].withdrawed);
        
        if(left>=amount)
        {
            allPlayer[_customerAddress].withdrawed=allPlayer[_customerAddress].withdrawed.add(amount); 
            allBuyAmount(amount,_team);
        } 
    }
    function buy(uint8 _team)
        isHuman()
        isWithinLimits(msg.value)
        notInClearing()
        public
        payable
    {
        allBuy(_team);
    }
    function Core(address addr, uint256 amount, uint8 _team)
        notInClearing()
        private
    {
        //先将此地址加入
        uint i=0;
        for (;i < allAddress.length; i++) {
            if(addr==allAddress[i])
                break;
        }
        if(i>=allAddress.length){
            allAddress.push(addr);
        }
        if(_team==0){
            allPlayer[addr].currentroundIn0=allPlayer[addr].currentroundIn0.add(amount);
        }else{
            allPlayer[addr].currentroundIn1=allPlayer[addr].currentroundIn1.add(amount);
        }
        
        allPlayer[addr].currRoundId=rID_;
        allPlayer[addr].lrnd=rID_;
        allPlayer[addr].teamId=_team;
        round_[rID_].addr=addr;
        round_[rID_].etc=round_[rID_].etc.add(amount);
        round_[rID_].pot=round_[rID_].pot.add(amount*(100-fee)/100);
        if(_team==0){
            round_[rID_].etc0=round_[rID_].etc0.add(amount);
        }else{
            round_[rID_].etc1=round_[rID_].etc1.add(amount);
        }
    }
    function nextRoundCore(address addr, uint256 amount, uint8 _team)
        notInClearing()
        private
    {
        uint i=0;
        for (;i < allAddress.length; i++) {
            if(addr==allAddress[i])
                break;
        }
        if(i>=allAddress.length){
            allAddress.push(addr);
        }
        if(_team==0){
            allPlayer[addr].lastRoundIn0=allPlayer[addr].lastRoundIn0.add(amount);
        }else{
            allPlayer[addr].lastRoundIn1=allPlayer[addr].lastRoundIn1.add(amount);
        }

        allPlayer[addr].lrnd=rID_+1;
        allPlayer[addr].teamId=_team;
        //////////////////////////////////////////
        round_[rID_+1].addr=addr;
        round_[rID_+1].etc=round_[rID_+1].etc.add(amount);
        round_[rID_+1].pot=round_[rID_+1].pot.add(amount*(100-fee)/100);
        if(_team==0){
            round_[rID_+1].etc0=round_[rID_+1].etc0.add(amount);
        }else{
            round_[rID_+1].etc1=round_[rID_+1].etc1.add(amount);
        }
    }
    
    function splitPot(uint8 whichTeamWin)
        inClearing()
        private
    {   
        uint256 pot=round_[rID_].pot; 
        bool dontsplit=false;
        if(pot<splitThreshold){
            dontsplit=true;
        }
        //清理数组allPlayer[addr].currRoundId=rID_;
        uint256 len=allAddress.length;
        for (uint256 j=0;j < len; j++) {
            if(allPlayer[allAddress[j]].lrnd<rID_){
                // delete allPlayer[allAddress[i]];//数据如果删除，没有提现的用户无法处理
                delete allAddress[j];
            }
        }
        
        uint256 currentIn;
        if(whichTeamWin==0){
            currentIn=round_[rID_].etc0;
        }else{
            currentIn=round_[rID_].etc1;
        }
        
        for (uint i=0;i < allAddress.length; i++) {
            address curr=allAddress[i];
            
            uint256 temp0=allPlayer[curr].currentroundIn0;
            allPlayer[curr].currentroundIn0=allPlayer[curr].lastRoundIn0;
            allPlayer[curr].lastRoundIn0=0;
        
            uint256 temp1=allPlayer[curr].currentroundIn1;
            allPlayer[curr].currentroundIn1=allPlayer[curr].lastRoundIn1;
            allPlayer[curr].lastRoundIn1=0;
            
            
            if(dontsplit)
            {
                allPlayer[curr].currentroundIn0=allPlayer[curr].currentroundIn0.add(temp0);
                allPlayer[curr].currentroundIn1=allPlayer[curr].currentroundIn1.add(temp1);
                allPlayer[curr].lrnd=rID_+1;
            }
            else
            {
                if(rID_==allPlayer[curr].currRoundId)
                {
                    uint256 amount;
                    if(whichTeamWin==0){
                        amount=pot.mul(temp0).div(currentIn); 
                    }else{
                        amount=pot.mul(temp1).div(currentIn);
                    }
                     
                    allPlayer[curr].lastwin=amount;             
                    allPlayer[curr].win=allPlayer[curr].win.add(amount);
                }
            }
            allPlayer[curr].currRoundId=allPlayer[curr].lrnd;
        }
        
        // 设置下一轮时间
        uint256 currBlock=block.number;
        rID_++;
        round_[rID_].strt = currBlock;
        round_[rID_].end = currBlock+rndGap_;
        round_[rID_].ended = false;
        round_[rID_].win = 0;
        if(dontsplit){
            round_[rID_].etc=round_[rID_-1].etc;
            round_[rID_].pot=round_[rID_-1].pot;
            round_[rID_].etc0=round_[rID_-1].etc0;
            round_[rID_].etc1=round_[rID_-1].etc1;
            round_[rID_-1].ended=false;
            round_[rID_-1].win=0;
        }else{
            if(whichTeamWin==0){
                total.bullTotalWin=total.bullTotalWin.add(pot);
            }else{
                total.bearTotalWin=total.bearTotalWin.add(pot);
            }
        }
        delete round_[rID_-2];
        emit Lotteryevents.onBuyAndDistribute
        (
            round_[rID_-1].addr,
            round_[rID_-1].strt,
            round_[rID_-1].end,
            round_[rID_-1].etc,
            round_[rID_-1].pot,
            round_[rID_-1].etc0,
            round_[rID_-1].etc1,
            round_[rID_-1].win
        );
    }
    function buyCore(address addr, uint256 amount, uint8 _team)
        notInClearing()
        private
    {
        // setup local rID
        uint256 _rID = rID_;
        
        // grab time
        uint256 _now = block.number;
        
        // if round is active
        if (_now >= round_[_rID].strt  && _now <= round_[_rID].strt+ rndClearingHeight_) 
        {
            Core(addr,amount,_team);  //本轮购买  
        }else if(_now <round_[_rID].end) {
            nextRoundCore(addr,amount,_team);//下一轮购买
        }else {
            //endround clearing
            if(round_[_rID].ended == false)
            {
                round_[_rID].ended = true;
                //分配上一轮的奖金
                uint8 whichTeamWin=sha(round_[_rID].end);
                round_[_rID].win=whichTeamWin;
                splitPot(whichTeamWin);
            }
            Core(addr,amount,_team);
        }
        emit Lotteryevents.onBuys
        (
            addr,
            amount,
            _team
        ); 
    }
   
    function getCurrentRoundLeft()
        public
        view
        returns(uint256)
    {
        // setup local rID
        uint256 _rID = rID_;
        
        // grab time
        uint256 _now = block.number;
        
        if (_now < round_[_rID].end)
            return( (round_[_rID].end).sub(_now) );
        else
            return(0);
    }
    function getEndowmentBalance() constant public returns (uint)
    {
    	return address(this).balance;
    }
    function getCreator() constant public returns (address)
    {
    	return creator;
    }
    function sha(uint256 end) constant private returns(uint8)
    { 
        bytes32 h=blockhash(end-10);
        if(h[31]&(0x0f)>8)
        return 1;
        return 0;  //0 for bull,1 for bear;  
    }
    //round info
    function getRoundInfo(uint256 roundId) 
      public 
      view 
      returns (uint256,address,uint256,uint256,uint256,uint256,uint256,uint256,bool,int)
    {
        require(roundId <= rID_, "round id not exist");
        uint256 temp=roundId;
        return
        (
            temp,
            round_[temp].addr,
            round_[temp].strt,
            round_[temp].end,
            round_[temp].etc,
            round_[temp].etc0,
            round_[temp].etc1,
            round_[temp].pot,
            round_[temp].ended,
            round_[temp].win
        );
    }
  	function getCurrentInfo() 
      public 
      view 
      returns (uint256,address,uint256,uint256,uint256,uint256,uint256,uint256,bool,int)
    {
        return
        (
            rID_,
            round_[rID_].addr,
            round_[rID_].strt,
            round_[rID_].end,
            round_[rID_].etc,
            round_[rID_].etc0,
            round_[rID_].etc1,
            round_[rID_].pot,
            round_[rID_].ended,
            round_[rID_].win
        );
    }
    function getTotalInfo() 
      public 
      view 
      returns (uint256,uint256,uint256,uint256,uint256)
    {
        return
        (
            total.totalIn,
            total.bullTotalIn,
            total.bearTotalIn,
            total.bullTotalWin,
            total.bearTotalWin
        );
    }
    function getPlayerInfoByAddress(address addr)
        public 
        view 
        returns (uint256, uint256,uint256, uint256, uint256, uint256, uint256,uint256, uint256, uint256, uint8)
    {
        address _addr=addr;
        if (_addr == address(0))
        {
            _addr == msg.sender;
        }
        
        return
        (
            allPlayer[_addr].currentroundIn0,
            allPlayer[_addr].currentroundIn1,
            allPlayer[_addr].lastRoundIn0,
            allPlayer[_addr].lastRoundIn1,
            allPlayer[_addr].allRoundIn,
            allPlayer[_addr].win,
            allPlayer[_addr].lastwin,
            allPlayer[_addr].withdrawed,
            allPlayer[_addr].currRoundId,
            allPlayer[_addr].lrnd,
            allPlayer[_addr].teamId
        );
    }
    
    function kill()public
    { 
        if (msg.sender == creator)
            selfdestruct(creator);  // kills this contract and sends remaining funds back to creator
    }
}
library SafeMath {
    function verifyTeam(uint256 _team)
        internal
        pure
        returns (uint256)
    {
        if (_team < 0 || _team > 3)
            return(2);
        else
            return(_team);
    }
    /**
    * @dev Multiplies two numbers, throws on overflow.
    */
    function mul(uint256 a, uint256 b) 
        internal 
        pure 
        returns (uint256 c) 
    {
        if (a == 0) {
            return 0;
        }
        c = a * b;
        require(c / a == b, "SafeMath mul failed");
        return c;
    }

    /**
    * @dev Integer division of two numbers, truncating the quotient.
    */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // assert(b > 0); // Solidity automatically throws when dividing by 0
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return c;
    }
    /**
    * @dev Subtracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
    */
    function sub(uint256 a, uint256 b)
        internal
        pure
        returns (uint256) 
    {
        require(b <= a, "SafeMath sub failed");
        return a - b;
    }

    /**
    * @dev Adds two numbers, throws on overflow.
    */
    function add(uint256 a, uint256 b)
        internal
        pure
        returns (uint256 c) 
    {
        c = a + b;
        require(c >= a, "SafeMath add failed");
        return c;
    }
    function sqrt(uint256 x)
        internal
        pure
        returns (uint256 y) 
    {
        uint256 z = ((add(x,1)) / 2);
        y = x;
        while (z < y) 
        {
            y = z;
            z = ((add((x / z),z)) / 2);
        }
    }
    function sq(uint256 x)
        internal
        pure
        returns (uint256)
    {
        return (mul(x,x));
    }
}