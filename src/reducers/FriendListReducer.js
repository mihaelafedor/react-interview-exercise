import * as types from '../constants/ActionTypes';

const initialState = {
  friendsById: [
    {
      id: 0,
      name: 'Theodore Roosevelt',
      starred: true,
      sex: 'male'
    },
    {
      id: 1,
      name: 'Abraham Lincoln',
      starred: false,
      sex: 'male'
    },
    {
      id: 2,
      name: 'George Washington',
      starred: false,
      sex: 'male'
    }
  ]
};

export default function friends(state = initialState, action) {
  switch (action.type) {
    case types.ADD_FRIEND:
      return addFriend(state, action)
    case types.DELETE_FRIEND:
      return deleteFriend(state, action)
    case types.STAR_FRIEND:
      return starFriend(state, action)
    default:
      return state;
  }
}

function addFriend(state, action) {
  var friends = state.friendsById
  var id = 0

  if (friends.length > 0) {
    id = friends[friends.length - 1].id + 1
  }

  return {
    ...state,
    friendsById: [
      ...state.friendsById,
      {
        id: id,
        name: action.name,
        sex: action.sex,
        starred: false,
      }
    ],
  };
}

function deleteFriend(state, action) {
  return {
    ...state,
    friendsById: state.friendsById.filter(item => item.id !== action.id)
  };
}

function starFriend(state, action) {
  let friends = [...state.friendsById];
  let friend = friends.find(item => item.id === action.id);
  friend.starred = !friend.starred;
  return {
    ...state,
    friendsById: friends
  };
}