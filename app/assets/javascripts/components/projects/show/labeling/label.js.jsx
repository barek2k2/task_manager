var Label = React.createClass({
  getInitialState(){
    return({
      label: this.props.label,
      task: this.props.task
    })
  },

  deleteLabel(){
    var that = this;
    $.ajax({
      url: "/label_tasks/0",
      method: 'DELETE',
      data: {label_task: {task_id: that.state.task.id, label_id: that.state.label.id}} ,
      success: function(res){
        that.props.handleDeleteLabel(res);
      },
      error: function(res){
        console.log(res);
      }
    });

  },

  render: function() {
    var that = this;
    return (
      <div className="label_task col-md-1">
        {this.state.label.name}
        <a className="pull-right delete_label" onClick={that.deleteLabel}>X</a>
      </div>
    );
  }
});