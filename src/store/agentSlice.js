import { createSlice } from "@reduxjs/toolkit";

const AgentSlice = createSlice({
    name:'agents',
    initialState:{
        agents:[],
        agent:null
    
    },
    reducers:{
        getAgentList(state,action){
            state.agents=action.payload
        },
        getAgentDetail(state,action){
            state.agent=action.payload
        },
        updateAgentBasicInfo(state,action){
            state.agent=action.payload
        },
        updateAgentDetailInfo(state,action){
            state.agent.agentDetail=action.payload
        
        }
    }
});
export const agentActions=AgentSlice.actions;
export default AgentSlice;