import { createSlice } from '@reduxjs/toolkit';
import {fetchTasks,addTask} from "../operations";
export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: {
      items: [],
      isLoading: false,
      error: null
    },
    filter: ""
  },
  reducers: {
    filterContacts(state, action) {
      state.filter = action.payload;
    },
    addContact(state, action) {
      state.items.push(action.payload);
    },
    deleteContact(state, action) {
      state.items = state.items.filter(contact => {
        return contact.id !== action.payload;
      });
    },
  },
  extraReducers:{
    [fetchTasks.pending](state) {
      state.contacts.isLoading = true;
    },
    [fetchTasks.fulfilled](state,  payload ) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items = payload;
    },
    [fetchTasks.rejected](state, { payload }) {
      state.contacts.isLoading = false;
      state.contacts.error = payload;
    },
    [addTask.pending](state) {
      state.contacts.isLoading = true;
    },
    [addTask.fulfilled](state, { payload }) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items.push(payload);
    },
    [addTask.rejected](state, { payload }) {
      state.contacts.isLoading = false;
      state.contacts.error = payload;
    },
  },
});

export const { addContact, deleteContact, filterContacts } = contactsSlice.actions;
const contactReducer = contactsSlice.reducer;  ///
export default contactReducer;
