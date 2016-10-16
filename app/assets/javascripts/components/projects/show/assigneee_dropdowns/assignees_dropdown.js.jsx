var AssigneeDropdown = React.createClass({
  getInitialState(){
    return({
      assignees: this.props.assignees,
      task: this.props.task
    })
  },

  render: function() {
    var that = this;
    assignees = that.state.assignees.map(function(assignee){
      return(
        <Assignee task={that.state.task} key={assignee.id} assignee={assignee} handleAssignee={that.props.handleAssignee} />
      )
    })
    return (
      <div className="dropdown">
          <a href="#" data-toggle="dropdown" className="dropdown-toggle">Assign <b className="caret"></b></a>
          <ul className="dropdown-menu">
            {assignees}
          </ul>
      </div>
    );
  }
});