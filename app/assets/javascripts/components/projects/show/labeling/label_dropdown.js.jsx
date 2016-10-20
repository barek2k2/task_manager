var LabelDropdown = React.createClass({
  getInitialState(){
    return({
      task: this.props.task,
      project: this.props.project,
      labels: this.props.labels
    })
  },

  handleLabelClicked(e){
    that = this;
    $.ajax({
      url: "/label_tasks.json",
      data: {label_task: {label_id: e.target.className, task_id: that.state.task.id}},
      method: 'POST',
      success: function(res){
        that.props.labelCreated(res)
      },
      error: function(){

      }
    });
  },

  render: function() {
    var that = this;
    labels = that.state.labels.map(function(label){
      return(
        <li key={label.id} className="label_">
          <a onClick={that.handleLabelClicked} className={label.id} >{label.name}</a>
        </li>
      )
    })
    return (
      <div className="dropdown">
        <a href="#" data-toggle="dropdown" className="dropdown-toggle">Labels <b className="caret"></b></a>
        <ul className="dropdown-menu">
          {labels}
          <NewLabel task={that.state.task} labelCreated={that.props.labelCreated} />
        </ul>
      </div>
    );
  }
});