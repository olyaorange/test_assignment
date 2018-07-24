import * as types from "../constants/ActionTypes";

const initialState = {
    settings: undefined,
};

export default function invest(state = initialState, action) {
    switch (action.type) {
        case types.SET_SETTINGS:
            return {
                ...state,
                settings: action.settings
            };
        default:
            return state;
    }
}
