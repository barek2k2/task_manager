var ProjectShow = React.createClass({
  getInitialState(){
    return({
      project: this.props.project,
      titleEditable: false,
      descriptionEditable: false
    })
  },

  handleTitleChange(e){
    newProject = this.state.project
    newProject.title = e.target.value
    this.setState({
      project: newProject
    })
  },

  handleDescriptionChange(e){
    newProject = this.state.project
    newProject.description = e.target.value
    this.setState({
      project: newProject
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
      url: "/projects/" + that.state.project.id,
      method: 'PUT',
      data: {project: {title: that.state.project.title }},
      error: function(res){
        console.log(res);
      }
    })
  },

  handleDescriptionChanged(){
  var that = this;
    that.setState({descriptionEditable: false});
    $.ajax({
      url: "/projects/" + that.state.project.id,
      method: 'PUT',
      data: {project: {description: that.state.project.description }},
      error: function(res){
        console.log(res);
      }
    })
  },

  handleDelete(deletedTask){
    project = this.state.project
    var tasks = project.tasks.filter(function(task){
      return task.id != deletedTask.id
    });
    project.tasks = tasks
    this.setState({project: project})
  },

  handleCreated(task){
    newTask = {id: task.id, project_id: task.project_id, title: task.title, description: task.description};
    project = this.state.project;
    project.tasks.push(newTask);
    this.setState({project: project});
  },

  render: function() {
    var that = this;
    var title;
    if(that.state.titleEditable){
      title = <input type="text" className="full" value={that.state.project.title} onChange={that.handleTitleChange} onBlur={that.handleTitleChanged} />
    }
    else{
      title = that.state.project.title
    }
    var description;
    if(that.state.descriptionEditable){
      description = <textarea type="text" className="full" value={that.state.project.description} onChange={that.handleDescriptionChange} onBlur={that.handleDescriptionChanged} />
    }
    else{
      description = that.state.project.description
    }

    tasks = that.state.project.tasks.map(function(task){
      return(<Task key={task.id} project={that.props.project} task={task} handleDelete={that.handleDelete} />)
    })

    return (
      <div>
        <div className="row">
          <h1 className="col-md-12" onClick={this.showEditableTitle}>
            {title}
          </h1>
          <div className="col-md-12" onClick={this.showEditableDescription}>
            {description}
          </div>
          <h3>{that.state.project.tasks.length} Tasks</h3>
          <NewTask project={that.state.project} handleCreated={that.handleCreated} />
        </div>
        <div className="row">
          <ul>
            {tasks}
          </ul>
        </div>
      </div>
    );
  }
});