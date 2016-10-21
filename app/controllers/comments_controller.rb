class CommentsController < ApplicationController
  before_action :find_task


  def create
    @comment = @task.comments.new(comment_params)
    respond_to do |format|
      format.json do
        if @comment.save
          #ActionCable.server.broadcast 'activity_channel', :task => @task
          render :json => @task.comments
        else
          render :json => {:errors => @comment.errors.messages}, :status => 422
        end
      end
    end
  end



  def destroy
    @task.comments.find(params[:id]).destroy
    respond_to do |format|
      format.json { render :json => @task.comments }
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:task_id, :content)
  end

  def find_task
    @task = Task.find(params[:task_id])
  end
end