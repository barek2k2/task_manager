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
    newProject = {id: project.id, title: project.title, description: project.description};
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
    return (
      <div>
        <h1>Welcome to Task Manager ({this.state.projects.length})</h1>
          <NewProject handleCreated={this.handleCreated} />
          <ul>
          {projects}
          </ul>
      </div>
    );
  }
});