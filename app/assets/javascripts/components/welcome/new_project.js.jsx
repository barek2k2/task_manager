var NewProject = React.createClass({
  getInitialState(){
    return({
      project: {title: '', description: ''},
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

  handleSave(){
    var that = this;
    $.ajax({
      url: "/projects",
      method: "POST",
      data: {project: {title: that.state.project.title, description: that.state.project.description}},
      success: function(response){
        that.props.handleCreated(response)
        that.setState({project: {name: '', description: ''}})
      }
    });
  },
  render: function() {
    return (
      <div>
        <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">New Project</button>
        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">New Project</h4>
              </div>
              <div className="modal-body">
                <form className="form-horizontal">
                  <div className="form-group">
                    <label htmlFor="inputEmail3" className="col-sm-2 control-label">Title</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" value={this.state.project.title || ''} id="inputEmail3" placeholder="Title" onChange={this.handleTitleChange} />
                    </div>
                  </div>
                 <div className="form-group">
                   <label htmlFor="inputEmail3" className="col-sm-2 control-label">Description</label>
                   <div className="col-sm-10">
                     <textarea className="form-control" value={this.state.project.description || ''} id="inputEmail3" rows="5" placeholder="Description" onChange={this.handleDescriptionChange} />
                   </div>
                 </div>

                  <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                      <button type="button" className="btn btn-success" onClick={this.handleSave}>Save</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});