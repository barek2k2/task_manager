var NewTask = React.createClass({
  getInitialState(){
    return({
      project: this.props.project,
      task: {title: '', description: ''}
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

  handleSave(){
    var that = this;
    $.ajax({
      url: "/projects/" + that.props.project.slug + "/tasks",
      method: "POST",
      data: {task: {title: that.state.task.title, description: that.state.task.description}},
      success: function(response){
        that.props.handleCreated(response)
        that.setState({task: {name: '', description: ''}})
        $('#myModal').modal('hide');
      }
    });
  },
  render: function() {
    return (
      <div>
        <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">New Task</button>
        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">New Task</h4>
              </div>
              <div className="modal-body">
                <form className="form-horizontal">
                  <div className="form-group">
                    <label htmlFor="inputEmail3" className="col-sm-2 control-label">Title</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" value={this.state.task.title || ''}  id="inputEmail3" placeholder="Title" onChange={this.handleTitleChange} />
                    </div>
                  </div>
                 <div className="form-group">
                   <label htmlFor="inputEmail3" className="col-sm-2 control-label">Description</label>
                   <div className="col-sm-10">
                     <textarea className="form-control" id="inputEmail3" value={this.state.task.description || ''} rows="5" placeholder="Description" onChange={this.handleDescriptionChange} />
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