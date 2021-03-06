var CommentBox = React.createClass({
  getInitialState(){
    var task = this.props.task
    task.comments = task.comments || []
    return({
      task: task,
      comment: {content: '', task_id: this.props.task}
    })
  },

  handleDeleteComment(res){
    var task = this.state.task;
    task.comments = res
    this.setState({task: task})
  },

  handleContentChange(e){
    if(e.charCode != undefined && e.charCode == 13 && !e.shiftKey){
      this.handleContentChanged();
      return;
    }
    newComment = this.state.comment
    newComment.content = e.target.value
    this.setState({
      comment: newComment
    })
  },

  handleContentChanged(){
    var that = this;
    $.ajax({
      url: "/tasks/"+that.state.task.id+"/comments",
      method: 'POST',
      data: {comment: that.state.comment},
      success: function(res){
        var task = that.state.task
        task.comments = res
        that.setState({task: task, comment: {content: '', task_id: that.state.task.id}})
      },
      error: function(res){
        console.log(res);
      }
    })
  },

  render: function() {
    var that = this;
    buttonStyle = {float: 'right'}
    buttonId = "commentBoxModal" + that.state.task.id;

    comments = that.state.task.comments.map(function(comment){
      return(<Comment key={comment.id} task={that.state.task} comment={comment} handleDeleteComment={that.handleDeleteComment} />)
    });
    var s = comments.length > 1 ? 's' : ''
    commentCount = <li className="comment"><strong>{comments.length} Comment{s}</strong></li>

    return (
      <div className="col-md-6 col-xs-6">
        <button type="button" style={buttonStyle} className="btn btn-info btn-lg" data-toggle="modal" data-target={"#" + buttonId}>Discussion</button>
        <div id={buttonId} className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Discussion</h4>
              </div>
              <div className="modal-body">
                <ul>
                  {commentCount}
                  {comments}
                </ul>
                <textarea value={this.state.comment.content} rows="4" className="comment-box full" placeholder="Comment" onKeyPress={that.handleContentChange} onChange={that.handleContentChange} />
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