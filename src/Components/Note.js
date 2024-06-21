import React, { useContext, useEffect } from "react";
import Noteitem from "./Noteitem";
import NoteContext from "../Contexts/Notes/NoteContext";
import AddNote from "./AddNote";

const Note = () => {
  const context = useContext(NoteContext);
  const { notes, addNote, getNotes } = context;
  useEffect(() => {
    getNotes();
  }, []);
  return (
    <>
      <AddNote />
      <div className="row my-3">
        <h2>Your Note</h2>
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
};

export default Note;
