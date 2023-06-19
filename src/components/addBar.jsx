import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../redux/operations';
import { Report } from 'notiflix/build/notiflix-report-aio';
import Filter from './Filter';
import css from '../form_css/form.module.css';
import { nanoid } from 'nanoid';

const Bar = () => {
  const dispatch = useDispatch();
  const contactsString = useSelector((state) => JSON.stringify(state.contacts.items));
  const contacts = JSON.parse(contactsString);
  const [text, setText] = useState('');
  const [completed, setCompleted] = useState('');

  const handleNameChange = (e) => {
    setText(e.target.value);
  };

  const handleNumberChange = (e) => {
    setCompleted(e.target.value);
  };

  const newContactAudit = (newContact) => {
    return contacts.filter(
      (contact) => contact.text && newContact.text && contact.text.toLowerCase() === newContact.text.toLowerCase()
    );
  };
  

  const contactFormSubmitHandler = (newContact) => {
    if (newContactAudit(newContact).length > 0) {
      Report.failure(
        'Usuario no Admitido',
        'EL USUARIO YA SE ENCUENTRA REGISTRADO',
        'Aceptar',
        );
      return false;
    } else {
      dispatch(addTask(newContact));
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newContact = {
      id: nanoid(),
      text,
      completed,
    };

    if (contactFormSubmitHandler(newContact)) {
      setText('');
      setCompleted('');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={css.form}>
        <h3 className={css.title}>Add Contact</h3>
        <input
          className={css.int}
          type="text"
          placeholder="Name"
          value={text}
          onChange={handleNameChange}
          autoComplete="on"
        />
        <input
          className={css.int}
          type="text"
          placeholder="Number"
          value={completed}
          onChange={handleNumberChange}
          autoComplete="on"
        />
        <button className={css.btn} type="submit">
          Add Contact
        </button>
      </form>
      <Filter />
    </>
  );
};

export default Bar;
