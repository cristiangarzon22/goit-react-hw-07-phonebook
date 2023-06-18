import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../redux/operations';
import { Report } from 'notiflix/build/notiflix-report-aio';
import Filter from './Filter';
import css from '../form_css/form.module.css';
import { nanoid } from 'nanoid';

const Bar = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts.items);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const newContactAudit = (newContact) => {
    return contacts.filter(
      (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
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
      console.log(newContact);
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    if (contactFormSubmitHandler(newContact)) {
      setName('');
      setNumber('');
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
          value={name}
          onChange={handleNameChange}
          autoComplete="on"
        />
        <input
          className={css.int}
          type="text"
          placeholder="Number"
          value={number}
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
