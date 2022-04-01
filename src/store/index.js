import { configureStore } from "@reduxjs/toolkit";
import AgentSlice from "./agentSlice";
import AuthSlice from "./authSlice";
import TicketSlice from "./ticketSlice";

const store=configureStore({reducer:{auth:AuthSlice.reducer,agents:AgentSlice.reducer,tickets:TicketSlice.reducer}});
export default store;