var Projects = React.createClass({
  getInitialState(){
    return({
      projects: this.props.projects
    })
  },
  handleDelete(deletedProject){
    var projects = this.state.projects.filter(function(project){
      return project.id != deletedProject.id
    });
    this.setState({projects: projects})
  },
  handleCreated(project){
    newProject = {id: project.id, title: project.title, description: project.description, url: project.url};
    projects = this.state.projects;
    projects.push(newProject);
    this.setState({projects: projects});
  },
  render: function() {
    var that = this;
    projects = this.state.projects.map(function(project){
      return(<Project key={project.id} project={project} handleDelete={that.handleDelete} />)
    })
    projects = projects.length > 0 ? projects : <h4>No Project</h4>
    var h2Style = {marginTop: '0px'}
    return (
      <div>
        <h1>Welcome to Task Manager</h1>
          <div className="row">
            <div className="col-md-6 col-xs-6">
              <NewProject handleCreated={this.handleCreated} />
            </div>
            <div className="col-md-6 col-xs-6">
              <h2 style={h2Style} className="pull-right">{this.state.projects.length} Projects</h2>
            </div>
          </div>
          <ul>
          {projects}
          </ul>
      </div>
    );
  }
});