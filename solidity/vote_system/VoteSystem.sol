pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract VoteSystem {
    
    uint[] public votes;
    string[] public candidates;
    mapping (address => bool) hasAlreadyVoted;
    
    constructor(string[] memory _candidates) public {
        candidates = _candidates;
        votes.length = candidates.length;
    }
    
    function vote(uint candidateIdx) public {
        require(0 <= candidateIdx && candidateIdx < candidates.length, "Invalid Candidate");
        require(!hasAlreadyVoted[msg.sender], "Sorry, this voter has already voted");
        
        votes[candidateIdx] = votes[candidateIdx] + 1;
        hasAlreadyVoted[msg.sender] = true;
    }
    
    function getOptions() public view returns (string[] memory) {
        return candidates;
    }
    
    function getVotes() public view returns (uint[] memory) {
        return votes;
    }
    
}