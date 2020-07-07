import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanType = {
    title: string,
    saveTitle: (newTitle: string) => void

}
function EditableSpan(props:EditableSpanType) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.title)

    const onEditMode = () => {
        setEditMode(true);
    }

    const offEditMode = () => {
        setEditMode(false);
        props.saveTitle(title);
        setTitle("")
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ?<TextField
            variant={"outlined"}
            onChange={changeTitle}
            onBlur={offEditMode}
            autoFocus={true}
            value={title}/>
        :<span onDoubleClick={onEditMode}>{props.title}</span>

}

export default EditableSpan;