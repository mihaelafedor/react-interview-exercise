import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './AddFriendInput.css';

class AddFriendInput extends Component {

  render() {
    return (
      <div>
        <input
          type="text"
          autoFocus="true"
          className={classnames('form-control', styles.addFriendNameInput)}
          placeholder="Type the name of a friend"
          value={this.state.name}
          onChange={this.handleNameChange.bind(this)} />

        <select value={this.state.sex}
          onChange={this.handleSexChange.bind(this)}
          className={classnames('form-control', styles.addFriendGenderInput)}>
          <option value="" disabled selected hidden>Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button onClick={this.handleSubmit.bind(this)} className="btn btn-success btn-add">Add</button>
      </div>
    );
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      name: this.props.name || '',
      sex: this.props.sex || ''
    };
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSubmit(e) {
    this.props.addFriend(this.state.name, this.state.sex);
    var message = this.state.name + " was successfully added!";
    alert(message);
    this.setState({ name: '', sex: '' });
  }

  handleSexChange(e) {
    this.setState({ sex: e.target.value });
  }
}

AddFriendInput.propTypes = {
  addFriend: PropTypes.func.isRequired
};

export default AddFriendInput
