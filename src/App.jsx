import { useEffect, useState } from "react";
import "./App.css";
import AddFriendContainer from "./components/AddFriendContainer/AddFriendContainer";
import FriendsList from "./components/FriendsList/FriendsList";
import DUMMY_USERS from "./assets/data/users";
import SplitBillForm from "./components/SplitBillForm/SplitBillForm";
import Loader from "./components/UI/Loader/Loader";
import Footer from "./components/common/Footer/Footer";
import Header from "./components/common/Header/Header";

const LEGACY_ASSET_PATH_PATTERN = /^(\.?\/)?src\/assets\/images\/|^\/src\/assets\/images\/|^\.\.\/images\//;

const normalizeStoredUsers = (storedUsers) => {
    if (!Array.isArray(storedUsers) || storedUsers.length === 0) {
        return DUMMY_USERS;
    }

    const dummyPictureById = new Map(DUMMY_USERS.map((user) => [user.id, user.picture]));

    return storedUsers.map((user) => {
        const hasValidPicture =
            typeof user?.picture === "string" &&
            user.picture.trim() &&
            !LEGACY_ASSET_PATH_PATTERN.test(user.picture.trim());

        return {
            ...user,
            picture: hasValidPicture
                ? user.picture.trim()
                : dummyPictureById.get(user.id) || user.picture,
        };
    });
};

function App() {
    const [users, setUsers] = useState(() => {
        try {
            const storedUsers = JSON.parse(localStorage.getItem("users") || "null");
            return normalizeStoredUsers(storedUsers);
        } catch {
            return DUMMY_USERS;
        }
    });

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

    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users));
    }, [users]);

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
            <Header />
            <main>
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
            </main>
            <Footer />
        </div>
    );
}

export default App;
