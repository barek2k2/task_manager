var Comment = React.createClass({
  getInitialState(){
    return({
      comment: this.props.comment,
      task: this.props.task
    })
  },

  deleteComment(){
    var that = this;
    $.ajax({
      url: "/tasks/"+that.state.task.id+"/comments/" + that.state.comment.id,
      method: 'DELETE',
      success: function(res){
        that.props.handleDeleteComment(res);
      },
      error: function(res){
        console.log(res);
      }
    })

  },

  render: function() {
    var that = this;
    return (
      <li className="comment">
        {that.state.comment.content}
        <a className="pull-right delete_label" onClick={that.deleteComment}>X</a>
      </li>
    );
  }
});