// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TextStorage {
    struct TextEntry {
        string text;
    }

    mapping(uint256 => TextEntry[]) private textList;

    function addText(uint256 id, string memory text) public {
        textList[id].push(TextEntry(text));
    }

    function getText(uint256 id, uint256 index) public view returns (string memory) {
        require(index < textList[id].length, "Index out of bounds");
        return textList[id][index].text;
    }

    function getTextCount(uint256 id) public view returns (uint256) {
        return textList[id].length;
    }
}
