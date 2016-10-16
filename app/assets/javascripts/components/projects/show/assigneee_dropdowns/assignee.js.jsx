var Assignee = React.createClass({
  getInitialState(){
    return({
      assignee: this.props.assignee,
      task: this.props.task
    })
  },

  assign(){
    var that = this;
    $.ajax({
      url: "/task_users",
      method: 'POST',
      data: {task_user: {task_id: that.state.task.id, user_id: that.state.assignee.id}} ,
      success: function(res){
        that.props.handleAssignee(that.state.assignee)
      },
      error: function(res){
        console.log(res);
      }
    });
  },
  render: function() {
    var that = this;
    assignee = that.state.assignee
    return (
      <li className="assignee" key={assignee.id} onClick={that.assign}>
        <a href="javascript: void(0)">{assignee.email}</a>
      </li>
    );
  }
});