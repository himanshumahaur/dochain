// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract HelloWorld {
    string public message = "Hello, World!";

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}