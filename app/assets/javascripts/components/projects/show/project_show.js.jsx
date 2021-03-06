var ProjectShow = React.createClass({
  getInitialState(){
    return({
      project: this.props.project,
      titleEditable: false,
      descriptionEditable: false,
      assignees: this.props.assignees,
      statuses: this.props.statuses,
      labels: this.props.labels
    })
  },

  handleTitleChange(e){
    if(e.charCode != undefined && e.charCode == 13 && !e.shiftKey){
      this.handleTitleChanged();
      return;
    }
    newProject = this.state.project
    newProject.title = e.target.value
    this.setState({
      project: newProject
    })
  },

  handleDescriptionChange(e){
    if(e.charCode != undefined && e.charCode == 13 && !e.shiftKey ){
      this.handleDescriptionChanged();
      return;
    }
    newProject = this.state.project
    newProject.description = e.target.value
    this.setState({
      project: newProject
    })
  },

  showEditableTitle(e){
    this.setState({titleEditable: true});
  },

  showEditableDescription(e){
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

  handleFilter(e){
    var status = e.target.text.toLowerCase();
    var that = this;
    $.ajax({
      url: "/projects/"+that.state.project.slug+"/tasks.json?filter="+status,
      success: function(res){
        var project = that.state.project
        project.tasks = res
        that.setState({project: project})
      }
    });
  },

  componentDidUpdate: function() {
    resizeAllTextAreaHeight();
  },

  render: function() {
    var that = this;
    var title;
    if(that.state.titleEditable){
      title = <input type="text" className="full" value={that.state.project.title} onKeyPress={that.handleTitleChange} onChange={that.handleTitleChange} onBlur={that.handleTitleChanged} />
    }
    else{
      title = that.state.project.title
    }
    var description;
    if(that.state.descriptionEditable){
      description = <textarea type="text" className="full" value={that.state.project.description} onKeyPress={that.handleDescriptionChange} onChange={that.handleDescriptionChange} onBlur={that.handleDescriptionChanged} />
    }
    else{
      description = that.state.project.description
    }

    tasks = that.state.project.tasks.map(function(task){
      return(<Task key={task.id} project={that.props.project} task={task} assignees={that.state.assignees} statuses={that.state.statuses} labels={that.state.labels} handleDelete={that.handleDelete} />)
    })

    statuses = that.state.statuses.map(function(status){
      return(
        <li className="status" key={status}>
          <a onClick={that.handleFilter}>{status.toUpperCase()}</a>
        </li>
      );
    })

    var paddingLeftZero = {paddingLeft: '0px'}
    var paddingBottom = {paddingBottom: '5px'}

    return (
      <div>
        <div className="row">
          <h1 style={paddingLeftZero} className="col-md-12" onClick={this.showEditableTitle}>
            {title}
          </h1>
          <div style={{paddingLeft: '0px', paddingBottom: '15px'}} className="col-md-12" onClick={this.showEditableDescription}>
            {description}
          </div>
          <div className="row">
            <div className="col-md-6 col-xs-6">
              <h3>{that.state.project.tasks.length} Tasks</h3>
            </div>
            <div className="col-md-6 col-xs-6">
              <div className="dropdown pull-right">
                <a href="#" data-toggle="dropdown" className="dropdown-toggle">FILTER <b className="caret"></b></a>
                <ul className="dropdown-menu">
                  {statuses}
                </ul>
              </div>
            </div>
          </div>

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