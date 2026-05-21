import AddFriendForm from "./AddFriendForm";
import Button from "../UI/Button";

const AddFriendContainer = ({
    formData,
    setFormData,
    onAddFriend,
    showForm,
    setShowForm,
}) => {
    return (
        <div className="Add-Friend-Container">
            {/* Add Friend Button */}
            <Button
                onClick={() => setShowForm((prev) => !prev)}
                aria-expanded={showForm}
                aria-controls="add-Friend-form"
                accessKey="f"
                aria-label={
                    showForm ? "Close add Friend form" : "Open add Friend form"
                }
                title={
                    showForm
                        ? "Close add Friend form (Alt+Shift+F)"
                        : "Open add Friend form (Alt+Shift+F)"
                }
            >
                {showForm ? "Close" : <>Add Friend</>}
            </Button>

            {/* Add Friend Form */}
            {
                <AddFriendForm
                    showForm={showForm}
                    setShowForm={setShowForm}
                    formData={formData}
                    setFormData={setFormData}
                    onAddFriend={onAddFriend}
                />
            }
        </div>
    );
};

export default AddFriendContainer;
