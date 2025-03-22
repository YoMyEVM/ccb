// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.11;


import "../../external-deps/openzeppelin/metatx/ERC2771Context.sol";

contract ForwarderConsumer is ERC2771Context {
    address public caller;

    constructor(address[] memory trustedForwarders) ERC2771Context(trustedForwarders) {}

    function setCaller() external {
        caller = _msgSender();
    }
}
