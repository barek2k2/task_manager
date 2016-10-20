var NewLabel = React.createClass({
  getInitialState(){
    return({
      label: {name: '', color: ''},
      task: this.props.task,
      createMode: false
    })
  },

  handleCreateLabelOnCLick(e){
    this.setState({createMode: true});
    e.preventDefault();
    e.stopPropagation();
    return false;
  },

  handleTitleChange(e){
    var label = this.state.label;
    label.name = e.target.value;
    this.setState({label: label});
  },

  handleTitleChanged(e){
    var that = this;
    if(e.charCode != undefined && e.charCode == 13 && !e.shiftKey){
      $.ajax({
        url: "/labels.json?task_id=" + that.state.task.id,
        data: {label: {name: that.state.label.name, color: that.state.label.color}},
        method: 'POST',
        success: function(res){
          that.props.labelCreated(res)
          that.setState({createMode: false})
        },
        error: function(){

        }
      });
      return;
    }
  },
  render: function() {
    var that = this;
    var liContent = "";
    if(this.state.createMode){
      liContent = <input type="text" className="new_label"  onKeyPress={that.handleTitleChanged} onChange={that.handleTitleChange} />
    }
    else{
      liContent = <b>New Label</b>
    }

    return (
      <li className="label_">
        <a onClick={that.handleCreateLabelOnCLick}>{liContent}</a>
      </li>
    );
  }
});