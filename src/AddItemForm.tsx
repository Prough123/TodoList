import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState<string>("");
    let [error, setError] = useState<string | null>(null);

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const onAddItemClick = () => {
        if (title.trim() !== "") {
            props.addItem(title);

        } else {
            setError("title is required")
        }
        setTitle("")


    }

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            onAddItemClick()
        }
    }

    return (
        <div onBlur={()=> setError(null)}>
            <TextField
                variant={"outlined"}
                value={title}
                onChange={onTitleChange}
                onKeyPress={onKeyPressAddItem}
                error={!!error}
                label={"Title"}
                helperText={error}
            />
            <IconButton color={"primary"} onClick={onAddItemClick}>
                <AddBox/>
            </IconButton>
        </div>
    )
}

export default AddItemForm;