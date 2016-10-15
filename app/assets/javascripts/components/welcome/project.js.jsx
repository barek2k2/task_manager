var Project = React.createClass({
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

  handleDelete(){
    var that = this;
    $.ajax({
      url: "/projects/" + that.state.project.id,
      method: 'DELETE',
      success: function(){
        that.props.handleDelete(that.state.project)
      },
      error: function(res){
        console.log(res)
      }
    })
  },
  render: function() {
    var title;
    if(this.state.titleEditable){
      title = <input type="text" className="full" value={this.state.project.title} onChange={this.handleTitleChange} onBlur={this.handleTitleChanged} />
    }
    else{
      title = this.state.project.title
    }
    var description;
    if(this.state.descriptionEditable){
      description = <textarea type="text" className="full" value={this.state.project.description} onChange={this.handleDescriptionChange} onBlur={this.handleDescriptionChanged} />
    }
    else{
      description = this.state.project.description
    }

    return (
      <li className="shadow list">
        <h3 onClick={this.showEditableTitle}>{title}</h3>
        <p className="project_desc" onClick={this.showEditableDescription}>{description}</p>
        <div className="task_count">60 Tasks</div>
        <div className="assignee_count">10 Assignees</div>
        <a className="btn btn-primary" href={this.state.project.url}>Show</a>
        <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
      </li>
    );
  }
});