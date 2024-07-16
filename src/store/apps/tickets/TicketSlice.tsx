import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from 'src/store/Store';

const API_URL = '/api/data/ticket/TicketData';

type UserProps = {
  AgentName: string;
  Date: string;
  Id: number
  Label: string;
  Status: string;
  thumb: string;
  ticketDescription:string;
  ticketTitle: string;
}

interface StateType {
  tickets: any[];
  currentFilter: string;
  ticketSearch: string;
  selectedTicket: null;
}

const initialState = {
  tickets: [],
  currentFilter: 'total_tickets',
  ticketSearch: '',
  selectedTicket: null,
};

export const TicketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    getTickets: (state, action) => {
      state.tickets = action.payload;
    },
    getTicket: (state, action) => {
      state.selectedTicket = action.payload;
    },
    setVisibilityFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    SearchTicket: (state, action) => {
      state.ticketSearch = action.payload;
    },
    DeleteTicket: (state: StateType, action) => {
      const index = state.tickets.findIndex((ticket) => ticket.Id === action.payload);
      state.tickets.splice(index, 1);
    },
  },
});

export const { getTickets, getTicket, setVisibilityFilter, SearchTicket, DeleteTicket } = TicketSlice.actions;

export const fetchTickets = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    dispatch(getTickets(response.data));
  } catch (err: any) {
    throw new Error(err);
  }
};



export const fetchTicket = (id: any) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`/api/data/ticket/TicketData`);
    const tickets = response.data
    const ticketId = parseInt(id, 10)
    const ticket = tickets.filter((item: UserProps) => item.Id === ticketId)?.[0];

    dispatch(getTicket(ticket));
  } catch (err: any) {
    throw new Error(err);
  }
}

export default TicketSlice.reducer;
