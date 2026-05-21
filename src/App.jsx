import { useEffect, useState } from "react";
import "./App.css";
import AddFriendContainer from "./components/AddFriendContainer/AddFriendContainer";
import FriendsList from "./components/FriendsList/FriendsList";
import DUMMY_USERS from "./assets/data/users";
import SplitBillForm from "./components/SplitBillForm/SplitBillForm";
import Loader from "./components/UI/Loader/Loader";
import Footer from "./components/common/Footer/Footer";

function App() {
    // load users data
    const storedUsers = localStorage.getItem("users");
    const [users, setUsers] = useState(JSON.parse(storedUsers) || DUMMY_USERS);

    if (!storedUsers) {
        localStorage.setItem("users", JSON.stringify(DUMMY_USERS));
    }

    const [formData, setFormData] = useState({
        pictureUrl: "https://i.pravatar.cc/150?u=",
        name: "",
    });

    const [selectedUser, setSelectedUser] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showInitialLoader, setShowInitialLoader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowInitialLoader(false);
        }, 2750);
        return () => clearTimeout(timer);
    }, []);

    // handle submit new Friend
    const handleSubmitNewFriend = (e) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.pictureUrl.trim()) {
            alert("Please fill in all fields.");
            return;
        }
        const newFriend = {
            id: Date.now(),
            name: formData.name.trim(),
            picture: formData.pictureUrl.trim(),
            debt: 0,
            currency: "USD",
        };
        const updatedUsers = [...users, newFriend];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
        setFormData({
            pictureUrl: "https://i.pravatar.cc/150?u=",
            name: "",
        });
        setShowForm(false);
    };

    // handle update debt
    const handleUpdateDebt = (id) => {
        const selectedFriend = users.find((user) => user.id === id);
        if (!selectedFriend) return;
        if (selectedUser?.id !== id) {
            window.dispatchEvent(new CustomEvent("closeSplitForm"));
            setSelectedUser(selectedFriend);
            setShowForm(false);
        } else {
            setSelectedUser(null);
        }
    };

    if (showInitialLoader) {
        return (
            <div className="App">
                <Loader />
            </div>
        );
    }

    return (
        <div className="App">
            <section className="Friends-Container">
                <AddFriendContainer
                    formData={formData}
                    setFormData={setFormData}
                    onAddFriend={handleSubmitNewFriend}
                    showForm={showForm}
                    setShowForm={setShowForm}
                />
                <FriendsList
                    users={users}
                    onUpdateDebt={handleUpdateDebt}
                    selectedFriendId={selectedUser?.id}
                />
            </section>
            {selectedUser && (
                <SplitBillForm
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    users={users}
                    setUsers={setUsers}
                />
            )}
            <Footer />
        </div>
    );
}

export default App;
