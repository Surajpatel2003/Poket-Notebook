import { React, useState } from "react";
import NoteContext from "./NoteContext";
function NoteState(props) {
  const host = "http://localhost:8000";
  const noteIntial = [];

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1MWU1NjhjOGI3NWY1NWEyZjY4YzEwIn0sImlhdCI6MTcxNjY0MzE3Nn0.16DetZIEJNtIcUO98pO4Rfv-1C254a8O7N5IfQJT4D4",
      },
    });

    const json = await response.json();
    console.log(json);
    setNotes(json);
  };
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1MWU1NjhjOGI3NWY1NWEyZjY4YzEwIn0sImlhdCI6MTcxNjY0MzE3Nn0.16DetZIEJNtIcUO98pO4Rfv-1C254a8O7N5IfQJT4D4",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    console.log("Add a note");

    const note = {
      _id: "65e62556b75d28gfgfgfce9980103",
      user: "65ce6a881250fdfe7226914f",
      title: title,
      description: description,
      tag: tag,
      date: "2024-03-04T19:47:34.243Z",
      __v: 0,
    };

    setNotes(notes.concat(note));
  };

  const deleteNote = async (id) => {
    // Todo : API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1MWU1NjhjOGI3NWY1NWEyZjY4YzEwIn0sImlhdCI6MTcxNjY0MzE3Nn0.16DetZIEJNtIcUO98pO4Rfv-1C254a8O7N5IfQJT4D4",
      },
    });

    const json = await response.json();
    console.log(json);
    console.log("Note is deleted id :- ", id);
    const newNote = notes.filter((note) => {
      if (id !== note._id) return note;
    });
    setNotes(newNote);
  };

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1MWU1NjhjOGI3NWY1NWEyZjY4YzEwIn0sImlhdCI6MTcxNjY0MzE3Nn0.16DetZIEJNtIcUO98pO4Rfv-1C254a8O7N5IfQJT4D4",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    console.log("Edit a note");

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  const [notes, setNotes] = useState(noteIntial);
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;
