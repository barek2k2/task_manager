var Task = React.createClass({
  getInitialState(){
    task = this.props.task
    task.users = task.users || []
    return({
      task: task,
      project: this.props.project,
      titleEditable: false,
      descriptionEditable: false,
      assignees: this.props.assignees,
      statuses: this.props.statuses
    })
  },

  handleTitleChange(e){
    if(e.charCode != undefined && e.charCode == 13 && !e.shiftKey){
      this.handleTitleChanged();
      return;
    }
    newTask = this.state.task
    newTask.title = e.target.value
    this.setState({
      task: newTask
    })
  },

  handleDescriptionChange(e){
    if(e.charCode != undefined && e.charCode == 13 && !e.shiftKey){
      this.handleDescriptionChanged();
      return;
    }
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
      url: "/projects/" + that.props.project.slug + "/tasks/" + that.state.task.id,
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
      url: "/projects/" + that.props.project.slug + "/tasks/" + that.state.task.id,
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
  handleDeleteUser(deletedUser){
    task = this.state.task
    var users = task.users.filter(function(user){
      return user.id != deletedUser.id
    });
    task.users = users;
    this.setState({task: task});

  },
  handleAssignee(assignee){
    var task = this.state.task
    if(!task.users.hasObjectExists(assignee)){
      task.users.push(assignee)
    }
    this.setState({task: task})
  },
  render: function() {
    var that = this;
    var title;
    if(this.state.titleEditable){
      title = <input type="text" className="full" value={this.state.task.title} onKeyPress={this.handleTitleChange} onChange={this.handleTitleChange} onBlur={this.handleTitleChanged} />
    }
    else{
      title = this.state.task.title
    }
    var description;
    if(this.state.descriptionEditable){
      description = <textarea type="text" className="full" value={this.state.task.description} onKeyPress={this.handleDescriptionChange} onChange={this.handleDescriptionChange} onBlur={this.handleDescriptionChanged} />
    }
    else{
      description = this.state.task.description
    }

    users = this.state.task.users.map(function(user){
      return(<UserTask key={user.id} task={that.state.task} user={user} handleDeleteUser={that.handleDeleteUser} />)
    })

    return (
      <li className="shadow list">
        <h3 onClick={this.showEditableTitle}>{title}</h3>
        <p className="task_desc" onClick={this.showEditableDescription}>{description}</p>
        <div className="assignee_count">{this.state.task.users.length} Assignees</div>
        <AssigneeDropdown task={this.state.task} handleAssignee={this.handleAssignee}  assignees={this.state.assignees} />
        <div className="row users_task">{users}</div>
        <AssignStatus task={this.state.task} statuses={that.state.statuses} />
        <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
      </li>
    );
  }
});