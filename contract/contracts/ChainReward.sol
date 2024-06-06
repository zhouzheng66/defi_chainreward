// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// 引入 OpenZeppelin 的 IERC20 接口
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ChainReward {
    // 定义管理员地址
    address public admin;

    // 定义平台手续费
    uint256 public fee;

    // 引入ERC20代币接口
    IERC20 public token;

    // 黑名单映射
    mapping(address => bool) public blacklist;

    // 悬赏结构体
    struct Bounty {
        address issuer; // 发布者
        uint256 reward; // 悬赏金额
        string description; // 悬赏描述(ipfs hash)
        bool isActive; // 悬赏是否有效
        bool isCompleted; // 悬赏是否完成
        uint256 expiry; // 过期时间
    }

    // 任务结构体
    struct Task {
        address acceptor; // 接受者
        uint256 collateral; // 质押金额
        string result; // 任务提交结果(ipfs hash)
        bool isSubmitted; // 任务是否已提交
    }

    // 悬赏数组
    Bounty[] public bounties;

    // 悬赏ID到任务的映射
    mapping(uint256 => Task) public tasks;

    event BountyCreated(
        uint256 indexed bountyId,
        address indexed issuer,
        uint256 reward
    );
    event BountyAdjusted(uint256 indexed bountyId, uint256 newReward);
    event BountyCancelled(uint256 indexed bountyId);
    event BountyAccepted(
        uint256 indexed bountyId,
        address indexed acceptor,
        uint256 collateral
    );
    event TaskSubmitted(uint256 indexed bountyId, address indexed acceptor);
    event TaskReviewed(uint256 indexed bountyId, bool approved);
    event FeeSet(uint256 newFee);
    event BlacklistUpdated(address indexed user, bool isBlacklisted);

    // 仅限管理员操作的修饰符
    modifier onlyAdmin() {
        require(msg.sender == admin, "Not an admin");
        _;
    }

    // 检查是否不在黑名单中的修饰符
    modifier notBlacklisted() {
        require(!blacklist[msg.sender], "Blacklisted");
        _;
    }

    // 构造函数，初始化管理员和代币地址
    constructor(address tokenAddress, uint256 _fee) {
        admin = msg.sender;
        token = IERC20(tokenAddress);
        fee = _fee;
    }

    // 管理员功能

    /**
     * @notice 设置平台手续费
     * @param _fee 手续费
     */
    function setFee(uint256 _fee) external onlyAdmin {
        fee = _fee;
        emit FeeSet(_fee);
    }

    /**
     * @notice 将地址添加到黑名单
     * @param user 要添加到黑名单的地址
     */
    function addToBlacklist(address user) external onlyAdmin {
        blacklist[user] = true;
        emit BlacklistUpdated(user, true);
    }

    /**
     * @notice 从黑名单中移除地址
     * @param user 要从黑名单移除的地址
     */
    function removeFromBlacklist(address user) external onlyAdmin {
        blacklist[user] = false;
        emit BlacklistUpdated(user, false);
    }

    // 发布者功能

    /**
     * @notice 发布悬赏
     * @dev 发布者需要支付手续费和悬赏金额
     * @param reward 悬赏金额
     * @param description 悬赏描述
     * @param expiry 悬赏过期时间
     */
    function createBounty(
        uint256 reward,
        string memory description,
        uint256 expiry
    ) external notBlacklisted {
        require(token.balanceOf(msg.sender) >= reward, "Insufficient balance");
        require(
            token.transferFrom(msg.sender, address(this), reward),
            "Reward transfer failed"
        );
        require(reward > fee, "Reward should be greater than fee");
        require(
            token.transferFrom(msg.sender, admin, fee),
            "Fee transfer failed"
        );
        bounties.push(
            Bounty(msg.sender, reward - fee, description, true, false, expiry)
        );
        emit BountyCreated(bounties.length - 1, msg.sender, reward - fee);
    }

    /**
     * @notice 调整悬赏金额
     * @param bountyId 悬赏ID
     * @param newReward  调整后的悬赏金额
     * @dev 只有发布者可以调用此函数
     */
    function adjustReward(uint256 bountyId, uint256 newReward) external {
        require(bounties[bountyId].issuer == msg.sender, "Not the issuer");
        require(!bounties[bountyId].isCompleted, "Bounty already completed");
        bounties[bountyId].reward = newReward;
        emit BountyAdjusted(bountyId, newReward);
    }
    /**
     * @notice 取消悬赏
     * @param bountyId 要取消的悬赏ID
     * @dev 只有发布者可以调用此函数
     */
    function cancelBounty(uint256 bountyId) external {
        require(bounties[bountyId].issuer == msg.sender, "Not the issuer");
        require(!bounties[bountyId].isCompleted, "Bounty already completed");
        require(
            tasks[bountyId].acceptor == address(0),
            "Bounty already accepted"
        );
        bounties[bountyId].isActive = false;
        // 将悬赏金额转移给发布者
        require(
            token.transfer(
                bounties[bountyId].issuer,
                bounties[bountyId].reward
            ),
            "Reward transfer failed"
        );
        emit BountyCancelled(bountyId);
    }

    // 接受者功能

    /**
     * @notice 接受悬赏
     * @param bountyId 悬赏ID
     * @dev 接受者需要支付悬赏金额的10%作为保证金
     */
    function acceptBounty(uint256 bountyId) external notBlacklisted {
        require(bounties[bountyId].isActive, "Bounty is not active");
        require(
            tasks[bountyId].acceptor == address(0),
            "Bounty has already been accepted"
        );
        require(
            block.timestamp <= bounties[bountyId].expiry,
            "Bounty has expired"
        );
        uint collateral = bounties[bountyId].reward / 10;
        require(
            token.balanceOf(msg.sender) >= collateral,
            "Insufficient collateral"
        );
        require(
            token.transferFrom(msg.sender, address(this), collateral),
            "Collateral transfer failed"
        );
        tasks[bountyId] = Task(msg.sender, collateral, "", false);
        emit BountyAccepted(bountyId, msg.sender, collateral);
    }

    /**
     * @notice 提交任务结果
     * @param bountyId 悬赏ID
     * @param result 任务结果
     * @dev 只有接受者可以调用此函数
     */
    function submitTaskResult(uint256 bountyId, string memory result) external {
        require(tasks[bountyId].acceptor == msg.sender, "Not the acceptor");
        require(!tasks[bountyId].isSubmitted, "Task already submitted");
        tasks[bountyId].isSubmitted = true;
        tasks[bountyId].result = result;
        emit TaskSubmitted(bountyId, msg.sender);
    }

    /**
     * @notice 审核任务结果
     * @param bountyId 悬赏ID
     * @param approve 审核结果，true表示通过，false表示不通过
     * @dev 悬赏没有过期，并且任务已经被提交，只有管理员可以调用此函数
     */
    function reviewTask(uint256 bountyId, bool approve) external onlyAdmin {
        require(bounties[bountyId].isActive, "Bounty is not active");
        require(
            block.timestamp <= bounties[bountyId].expiry,
            "Bounty has expired"
        );
        require(tasks[bountyId].isSubmitted, "Task not submitted");
        if (approve) {
            require(
                token.transfer(
                    tasks[bountyId].acceptor,
                    bounties[bountyId].reward + tasks[bountyId].collateral
                ),
                "Reward transfer failed"
            );
            bounties[bountyId].isCompleted = true;
        } else {
            require(
                token.transfer(
                    tasks[bountyId].acceptor,
                    tasks[bountyId].collateral
                ),
                "Collateral refund failed"
            );
            tasks[bountyId].isSubmitted = false;
        }
        emit TaskReviewed(bountyId, approve);
    }

    /**
     * @notice 提现质押
     * @param bountyId 悬赏ID
     */
    function withdrawCollateral(uint256 bountyId) external {
        require(bounties[bountyId].isCompleted, "Bounty not completed");
        require(tasks[bountyId].acceptor == msg.sender, "Not the acceptor");
        require(
            token.transfer(msg.sender, tasks[bountyId].collateral),
            "Collateral transfer failed"
        );
    }

    /**
     * @notice 获取悬赏数量
     * @return 悬赏数量
     */
    function getBountyCount() public view returns (uint256) {
        return bounties.length;
    }

    /**
     * @notice 获取悬赏信息
     * @param bountyId 悬赏id
     * @return 悬赏信息
     */
    function getBounty(uint256 bountyId) public view returns (Bounty memory) {
        return bounties[bountyId];
    }

    /**
     * @notice 获取任务信息
     * @param bountyId 悬赏id
     */
    function getTask(uint256 bountyId) public view returns (Task memory) {
        return tasks[bountyId];
    }
}
