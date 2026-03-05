// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BirthLedger {
    struct HealthEvent {
        string motherId;
        string childId;
        string eventType; // "BIRTH" or "VACCINE"
        uint256 timestamp;
    }

    HealthEvent[] public events;

    event EventRecorded(string motherId, string childId, string eventType, uint256 timestamp);

    function recordEvent(
        string memory motherId,
        string memory childId,
        string memory eventType
    ) public {
        events.push(HealthEvent(motherId, childId, eventType, block.timestamp));
        emit EventRecorded(motherId, childId, eventType, block.timestamp);
    }

    function getEventCount() public view returns (uint256) {
        return events.length;
    }
}
