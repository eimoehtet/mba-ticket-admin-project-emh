import { createSlice } from "@reduxjs/toolkit";
const TicketSlice = createSlice ({
    name:'tickets',
    initialState:{
        tickets:[],
        ticket:null
    },
    reducers:{
        getTicekts(state,action){
            state.tickets=action.payload
        },
        addTicket(state,action){
            state.tickets=[...state.tickets,action.payload]
        },
        getTicket(state,action){
            state.ticket=action.payload;
        },
        updateTicket(state,action){
            state.ticket=action.payload;
        }
       
    }
});
export const ticketActions=TicketSlice.actions;
export default TicketSlice;