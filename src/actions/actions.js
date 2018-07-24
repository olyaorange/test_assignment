import * as types from "../constants/ActionTypes";

export const setInvestSettings = settings => ({
    type: types.SET_SETTINGS,
    settings
});