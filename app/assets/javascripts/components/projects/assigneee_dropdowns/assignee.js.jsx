var Assignee = React.createClass({
  getInitialState(){
    return({
      assignee: this.props.assignee,
    })
  },

  assign(){
    this.props.handleAssignee(this.state.assignee)
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