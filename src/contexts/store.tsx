import { createStore } from "redux";

export default createStore(function(state, action){
  if(state === undefined){
    return {data: []}
  }

  switch(action.type){
    case 'SETDATA':
      return console.log("SetData");
  }

  return state;
})