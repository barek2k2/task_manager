var AssignStatus = React.createClass({
  getInitialState(){
    var task = this.props.task
    task.status = task.status || 'TODO'
    task.status = task.status.toUpperCase()
    return({
      task: task,
      statuses: this.props.statuses
    })
  },

  handleStatusChanged(e){
    var newStatus = e.target.text
    var that = this;
    $.ajax({
      url: "/projects/"+that.props.task.project_id+"/tasks/"+that.props.task.id+"/assign_status?status=" + newStatus,
      method: 'PUT',
      success: function(res){
        var task = that.state.task
        task.status = newStatus
        that.setState({task: task})
      },
      error: function(res){
        console.log(res)
      }
    });
  },


  render: function() {
    var that = this;
    statuses = that.state.statuses.map(function(status){
      return(
        <li key={status} className="status">
          <a onClick={that.handleStatusChanged}>{status.toUpperCase()}</a>
        </li>
      )
    })
    return (
      <div className="dropdown">
        <a href="#" data-toggle="dropdown" className="dropdown-toggle">{that.state.task.status} <b className="caret"></b></a>
        <ul className="dropdown-menu">
          {statuses}
        </ul>
      </div>
    );
  }
});