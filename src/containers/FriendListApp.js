import React, { Component } from 'react';
import styles from './FriendListApp.css';
import { connect } from 'react-redux';

import { addFriend, deleteFriend, starFriend } from '../actions/FriendsActions';
import { FriendList, AddFriendInput, Pagination } from '../components';

class FriendListApp extends Component {

  render() {

    const actions = {
      addFriend: this.props.addFriend,
      deleteFriend: this.props.deleteFriend,
      starFriend: this.props.starFriend
    };

    return (
      <div className={styles.friendListApp}>
        <h1>The FriendList</h1>
        <AddFriendInput addFriend={actions.addFriend} />
        <FriendList friends={this.state.pageOfFriends} actions={actions} />
        <Pagination elements={this.props.FriendListReducer.friendsById} onChangePage={this.onChangePage} />
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      pageOfFriends: []
    }

    this.onChangePage = this.onChangePage.bind(this)
  }

  onChangePage(pageOfFriends) {
    // update state with new page of items
    this.setState({ pageOfFriends: pageOfFriends });
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {
  addFriend,
  deleteFriend,
  starFriend
})(FriendListApp)
