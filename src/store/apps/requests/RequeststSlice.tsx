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


const initialState = {
  requests: [],
  currentFilter: 'total_requests',
  requestSearch: '',
  selectedRequest: null,
};

export const RequeststSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    getRequests: (state, action) => {
      state.requests = action.payload;
    },
    getRequest: (state, action) => {
      state.selectedRequest = action.payload;
    },
    setVisibilityFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    SearchRequest: (state, action) => {
      state.requestSearch = action.payload;
    },

  },
});

export const { getRequests, getRequest, setVisibilityFilter, SearchRequest } = RequeststSlice.actions;

export const fetchRequests = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    dispatch(getRequests(response.data));
  } catch (err: any) {
    throw new Error(err);
  }
};



export const fetchRequest = (id: any) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`/api/data/ticket/TicketData`);
    const tickets = response.data
    const ticketId = parseInt(id, 10)
    const ticket = tickets.filter((item: UserProps) => item.Id === ticketId)?.[0];

    dispatch(getRequest(ticket));
  } catch (err: any) {
    throw new Error(err);
  }
}

export default RequeststSlice.reducer;
