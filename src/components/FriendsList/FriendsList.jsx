import FriendsListItem from "./FriendsListItem";

const FriendsList = ({ users, onUpdateDebt, selectedFriendId }) => {
    return (
        <ul className="Friends-List">
            {users.map((user) => (
                <FriendsListItem
                    key={user.id}
                    {...user}
                    onUpdateDebt={onUpdateDebt}
                    isSelected={user.id === selectedFriendId}
                />
            ))}
        </ul>
    );
};

export default FriendsList;
