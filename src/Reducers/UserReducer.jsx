import { createSlice } from "@reduxjs/toolkit";
import { userList } from "../Data";

const userSlice = createSlice({
    name: "users",
    initialState: userList,
    reducers: {
        
        //add
        adduser: (state,action) =>{
           // console.log(action)
           state.push(action.payload)
        },
        
        //update
        updateUser: (state, action) => {
            const {id,name,weight,height,ability} = action.payload;
            const upoke = state.find(user => user.id == id);
            if(upoke){
                upoke.name = name;
                upoke.weight = weight;
                upoke.height = height;
                upoke.ability = ability;

            }
        },
        
        //delete
        deleteUser: (state,action) => {
            const {id}=action.payload;
            const uu = state.find(user => user.id == id);
            if (uu){
                return state.filter(f => f.id !==id);
            }
        }

        //auth
        
    
    }
})
export const {adduser,updateUser,deleteUser} = userSlice.actions;
export default userSlice.reducer; 