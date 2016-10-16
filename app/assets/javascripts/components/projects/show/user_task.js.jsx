var UserTask = React.createClass({
  getInitialState(){
    return({
      user: this.props.user,
      task: this.props.task
    })
  },

  deleteUser(){
    var that = this;
    $.ajax({
      url: "/task_users/0",
      method: 'DELETE',
      data: {task_user: {task_id: that.state.task.id, user_id: that.state.user.id}} ,
      success: function(res){
        that.props.handleDeleteUser(that.state.user);
      },
      error: function(res){
        console.log(res);
      }
    });

  },

  render: function() {
    var that = this;
    return (
      <div className="user_task col-md-1">
        {this.state.user.email}
        <a className="pull-right delete_assignee" onClick={that.deleteUser}>X</a>
      </div>
    );
  }
});