import { useEffect, useRef, useState } from "react";
import SplitFormInput from "./SplitFormInput";
import CloseIcon from "../icons/closeIcon";
import Button from "../UI/Button";

const SplitBillForm = ({ selectedUser, setSelectedUser, users, setUsers }) => {
    const formRef = useRef(null);
    const selectedUserName = selectedUser?.name ?? "";
    const selectedUserId = selectedUser?.id ?? "";
    const [formData, setFormData] = useState({
        billValue: 0,
        yourExpense: 0,
        theirExpense: 0,
        payer: "you",
    });
    const [error, setError] = useState("");

    useEffect(() => {
        // Reset the local fields whenever the parent closes this form.
        window.addEventListener("closeSplitForm", resetFormData);
        return () =>
            window.removeEventListener("closeSplitForm", resetFormData);
    }, []);

    // Reset local form state without changing the selected Friend.
    const resetFormData = () => {
        setFormData({
            billValue: 0,
            yourExpense: 0,
            theirExpense: 0,
            payer: "you",
        });
        setError("");
    };

    // handle submit split bill
    const handleSubmit = (e) => {
        e.preventDefault();

        // ensure numbers
        const billValue = Number(formData.billValue) || 0;
        const yourExpense = Number(formData.yourExpense) || 0;
        const theirExpense = Number(formData.theirExpense) || 0;

        const totalExpense = yourExpense + theirExpense;
        // tolerate small floating point rounding differences
        if (Math.abs(totalExpense - billValue) > 0.01) {
            setError("The sum of expenses must equal the total bill value.");
            return;
        }

        // Positive means the selected Friend owes the user.
        let FriendDebt;
        if (formData.payer === "you") {
            FriendDebt = -theirExpense;
        } else {
            FriendDebt = yourExpense;
        }

        const newUsers = users.map((user) => {
            if (user.id === selectedUserId) {
                return { ...user, debt: user.debt + FriendDebt };
            }
            return user;
        });

        setUsers(newUsers);
        localStorage.setItem("users", JSON.stringify(newUsers));

        // reset form and selection
        resetFormData();
        setSelectedUser(null);
    };

    return (
        <div
            className="Split-Bill-Form"
            aria-labelledby="split-bill-title"
            aria-describedby={error ? "split-bill-error" : undefined}
        >
            <header>
                <h3>Split A Bill With {selectedUserName}</h3>
                <CloseIcon
                    onClick={() => setSelectedUser(null)}
                    ariaLabel="Close split bill form"
                />
            </header>

            <form onSubmit={handleSubmit}>
                {/* ===== Bill Value ===== */}
                <SplitFormInput
                    label="💰 Bill Value"
                    id="bill-value"
                    value={formData.billValue}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            billValue: parseFloat(e.target.value) || 0,
                        })
                    }
                />

                {/* ===== Your Expense ===== */}
                <SplitFormInput
                    label="🧍‍♂️ Your Expense"
                    id="your-expense"
                    value={formData.yourExpense}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            yourExpense: parseFloat(e.target.value) || 0,
                        })
                    }
                />

                {/* ===== Their Expense ===== */}
                <SplitFormInput
                    label={`🧑‍🤝‍🧑 ${selectedUserName}'s Expense`}
                    id="their-expense"
                    value={formData.theirExpense}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            theirExpense: parseFloat(e.target.value) || 0,
                        })
                    }
                />

                {/* ===== Who is paying ===== */}
                <fieldset>
                    <label htmlFor="payer">🤑 Who is playing the bill</label>
                    <select
                        name="payer"
                        id="payer"
                        value={formData.payer}
                        aria-label="Who paid the bill"
                        onChange={(e) =>
                            setFormData({ ...formData, payer: e.target.value })
                        }
                    >
                        <option value="you">You</option>
                        <option value={selectedUserId}>
                            {selectedUserName}
                        </option>
                    </select>
                </fieldset>

                {/* ===== Split Bill Button ===== */}
                {error && <p className="Error">{error}</p>}
                <Button>Split Bill</Button>
            </form>
        </div>
    );
};

export default SplitBillForm;
