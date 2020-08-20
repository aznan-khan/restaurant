import * as ActionTypes from './ActionTypes';

export const Comments = (state = {
    errMessage: null,
    comments: []
    }, action) => {
    switch(action.type)  {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMessage: null, comments: action.payload};
        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMessage: action.payload, comments: []};
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();
            console.log("Comment: ", comment);
            return state.concat(comment);
        default:
            return state;
    }
}
