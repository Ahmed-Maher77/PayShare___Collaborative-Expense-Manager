import React from "react";

const SplitFormInput = ({ label, id, value, onChange }) => {
    return (
        <fieldset>
            <label htmlFor={id}> {label} </label>
            <input
                type="number"
                name={id}
                id={id}
                min="0"
                value={value}
                onChange={onChange}
                aria-required="true"
            />
        </fieldset>
    );
};

export default SplitFormInput;
