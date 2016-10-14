var Task = React.createClass({
  getInitialState(){
    return({
      task: this.props.task,
      project: this.props.project,
      titleEditable: false,
      descriptionEditable: false
    })
  },

  handleTitleChange(e){
    newTask = this.state.task
    newTask.title = e.target.value
    this.setState({
      task: newTask
    })
  },

  handleDescriptionChange(e){
    newTask = this.state.task
    newTask.description = e.target.value
    this.setState({
      task: newTask
    })
  },

  showEditableTitle(e){
    this.setState({titleEditable: true});
  },

  showEditableDescription(){
    this.setState({descriptionEditable: true});
  },

  handleTitleChanged(){
  var that = this;
    that.setState({titleEditable: false});
    $.ajax({
      url: "/tasks/" + that.state.task.id,
      method: 'PUT',
      data: {task: {title: that.state.task.title }},
      error: function(res){
        console.log(res);
      }
    })
  },

  handleDescriptionChanged(){
  var that = this;
    that.setState({descriptionEditable: false});
    $.ajax({
      url: "/tasks/" + that.state.task.id,
      method: 'PUT',
      data: {task: {description: that.state.task.description }},
      error: function(res){
        console.log(res);
      }
    })
  },

  handleDelete(){
    var that = this;
    $.ajax({
      url: "/projects/" + that.props.project.slug + "/tasks/" + that.state.task.id,
      method: 'DELETE',
      success: function(res){
        that.props.handleDelete(that.state.task)
      },
      error: function(res){
        console.log(res)
      }
    })
  },
  render: function() {
    var title;
    if(this.state.titleEditable){
      title = <input type="text" className="full" value={this.state.task.title} onChange={this.handleTitleChange} onBlur={this.handleTitleChanged} />
    }
    else{
      title = this.state.task.title
    }
    var description;
    if(this.state.descriptionEditable){
      description = <textarea type="text" className="full" value={this.state.task.description} onChange={this.handleDescriptionChange} onBlur={this.handleDescriptionChanged} />
    }
    else{
      description = this.state.task.description
    }

    return (
      <li className="shadow">
        <h3 onClick={this.showEditableTitle}>{title}</h3>
        <p className="task_desc" onClick={this.showEditableDescription}>{description}</p>
        <div className="assignee_count">10 Assignees</div>
        <a className="btn btn-primary" href={this.state.task.url}>Show</a>
        <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
      </li>
    );
  }
});