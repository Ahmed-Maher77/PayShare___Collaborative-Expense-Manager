import { useRef } from "react";
import AddIcon from "../icons/AddIcon";
import Button from "../UI/Button";

export default function AddFriendForm({
    showForm,
    setShowForm,
    formData,
    setFormData,
    onAddFriend,
}) {
    const formRef = useRef(null);

    const handleChange = (e, field) => {
        if (field === "name") {
            const name = e.target.value;
            setFormData({
                name,
                pictureUrl: `https://i.pravatar.cc/150?u=${name}`,
            });
        } else {
            setFormData({ ...formData, [field]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        onAddFriend(e);
        setShowForm(false);
    };

    return (
        <form
            id="add-Friend-form"
            ref={formRef}
            onSubmit={handleSubmit}
            aria-hidden={!showForm}
            style={{
                height: showForm ? formRef.current?.scrollHeight : 0,
                marginBlock: showForm ? "20px 40px" : 0,
            }}
        >
            <fieldset>
                <label htmlFor="Friend-name">Friend Name</label>
                <input
                    id="Friend-name"
                    type="text"
                    placeholder="Enter Friend's name"
                    value={formData.name}
                    onChange={(e) => handleChange(e, "name")}
                    required
                    autoComplete="name"
                    aria-required="true"
                />
            </fieldset>

            <fieldset>
                <label htmlFor="Friend-picture">Picture URL</label>
                <input
                    id="Friend-picture"
                    type="url"
                    placeholder="Enter Friend's picture URL"
                    value={formData.pictureUrl}
                    onChange={(e) => handleChange(e, "pictureUrl")}
                    required
                    autoComplete="url"
                    aria-required="true"
                />
            </fieldset>
            <Button
                type="submit"
                accessKey="a"
                title="Add Friend (Alt+Shift+A)"
            >
                <AddIcon /> Add
            </Button>
        </form>
    );
}
