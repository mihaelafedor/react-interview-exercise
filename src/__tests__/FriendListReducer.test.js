import * as reducer from '../reducers/FriendListReducer';
import {addFriend, deleteFriend, starFriend} from '../actions/FriendsActions';

test('Add new friend to list', () => {
    const state = {
        friendsById: [{id: 1, name: 'test1', sex:'male', starred:false}]
    }
    const testName = 'test2';
    const testSex = 'female'; 

    const newState = reducer.default(state, addFriend( testName, testSex));
    const friendArray = newState.friendsById;

    expect(friendArray.length).toBe(2);
    expect(friendArray[friendArray.length - 1].name).toBe(testName);
    expect(friendArray[friendArray.length - 1].sex).toBe(testSex);
});

test('Delete friend from list', () => {
  const testNameToBeDeleted = 'test1';
  const testNameToRemain = 'test2';
  const testIdToBeDeleted = 1;
  const testIdToRemain = 2;

  const state = {
        friendsById: [
          {id: testIdToBeDeleted, name: testNameToBeDeleted, sex:'male', starred:false},
          {id: testIdToRemain, name: testNameToRemain, sex:'male', starred:false}
        ]
    }

    const newState = reducer.default(state, deleteFriend( testIdToBeDeleted));
    const friendArray = newState.friendsById;
    
    expect(friendArray.length).toBe(1);
    expect(friendArray[friendArray.length - 1].name).toBe(testNameToRemain);
});

test('Try to delete friend that doesn\'t exist in list', () => {
  
  const testIdToBeDeleted = -1;

  const state = {
        friendsById: [
          {id: 1, name: 'test1', sex:'male', starred:false},
          {id: 2, name: 'test2', sex:'male', starred:false}
        ]
    }

    const newState = reducer.default(state, deleteFriend( testIdToBeDeleted));
    const friendArray = newState.friendsById;
    
    expect(friendArray.length).toBe(2);
  });

  test('Delete all friends from list', () => {
    const testNameToBeDeleted = 'test1';
    const testNameToBeDeleted2 = 'test2';
    const testIdToBeDeleted = 1;
    const testIdToBeDeleted2 = 2;
  
    const initialState = {
          friendsById: [
            {id: testIdToBeDeleted, name: testNameToBeDeleted, sex:'male', starred:false},
            {id: testIdToBeDeleted2, name: testNameToBeDeleted2, sex:'male', starred:false}
          ]
      }

      const newState1 = reducer.default(initialState, deleteFriend( testIdToBeDeleted));
      const friendArray1 = newState1.friendsById;
      
      expect(friendArray1.length).toBe(1);
      expect(friendArray1[friendArray1.length - 1].name).toBe(testNameToBeDeleted2);

      const newState2 = reducer.default(newState1, deleteFriend( testIdToBeDeleted2));
      const friendArray2 = newState2.friendsById;
      
      expect(friendArray2.length).toBe(0);
  });
  

  test('Star friend in list', () => {
    const testNameToBeStarred = 'test1';
    const testNameUnstarred = 'test2';
    const testIdToBeStarred = 1;
    const testIdUnstarred = 2;
  
    const state = {
          friendsById: [
            {id: testIdToBeStarred, name: testNameToBeStarred, sex:'male', starred:false},
            {id: testIdUnstarred, name: testNameUnstarred, sex:'male', starred:false}
          ]
      }
  
      const newState = reducer.default(state, starFriend( testIdToBeStarred));
      const friendArray = newState.friendsById;

      expect(friendArray[0].starred).toBe(true);
      expect(friendArray[1].starred).toBe(false);
  });

  test('Unstar friend in list', () => {
    const testNameToBeUnstarred = 'test1';
    const testNameStarred = 'test2';
    const testIdToBeUnstarred = 1;
    const testIdStarred = 2;
  
    const state = {
          friendsById: [
            {id: testIdToBeUnstarred, name: testNameToBeUnstarred, sex:'male', starred:true},
            {id: testIdStarred, name: testNameStarred, sex:'male', starred:true}
          ]
      }
  
      const newState = reducer.default(state, starFriend( testIdToBeUnstarred));
      const friendArray = newState.friendsById;

      expect(friendArray[0].starred).toBe(false);
      expect(friendArray[1].starred).toBe(true);
  });