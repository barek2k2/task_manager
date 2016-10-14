var UserTask = React.createClass({
  getInitialState(){
    return({
      user: this.props.user
    })
  },

  deleteUser(){
    this.props.handleDeleteUser(this.props.user);
  },

  render: function() {
    var that = this;
    return (
      <div className="user_task col-md-1">
        {this.state.user.email}
        <a className="pull-right" onClick={that.deleteUser}>X</a>
      </div>
    );
  }
});