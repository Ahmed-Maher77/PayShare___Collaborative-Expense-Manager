import Button from "../UI/Button";

const FriendsListItem = ({
    id,
    picture,
    name,
    debt,
    currency,
    onUpdateDebt,
    isSelected,
}) => {
    const debtStatus = debt > 0 ? "oweToMe" : debt < 0 ? "owesMe" : "settledUp";
    let debtStatusText = "";

    switch (debtStatus) {
        case "oweToMe":
            debtStatusText = `${name} owes you ${debt} ${currency}`;
            break;
        case "owesMe":
            debtStatusText = `You owe ${name} ${Math.abs(debt)} ${currency}`;
            break;
        case "settledUp":
            debtStatusText = "You and " + name + " are even";
            break;
        default:
            break;
    }

    return (
        <li
            className={`Friends-ListItem ${isSelected ? "selected" : ""}`}
            aria-current={isSelected ? "true" : undefined}
        >
            <div className="user-details">
                <img src={picture} alt={`${name}'s picture`} />
                <div className="info">
                    <h3>{name}</h3>
                    <p className={debtStatus}>{debtStatusText}</p>
                </div>
            </div>
            <Button
                onClick={() => onUpdateDebt(id)}
                aria-pressed={isSelected}
                aria-label={isSelected ? `Deselect ${name}` : `Select ${name}`}
            >
                {isSelected ? "Deselect" : "Select"}
            </Button>
        </li>
    );
};

export default FriendsListItem;
