pragma solidity ^0.8.0;

contract BirthLedger {

    struct HealthEvent {
        string motherId;
        string childId;
        string eventType;
        uint timestamp;
    }

    HealthEvent[] public events;

    function recordEvent(
        string memory motherId,
        string memory childId,
        string memory eventType
    ) public {
        events.push(
            HealthEvent(
                motherId,
                childId,
                eventType,
                block.timestamp
            )
        );
    }

    function getEventCount() public view returns (uint) {
        return events.length;
    }
}
