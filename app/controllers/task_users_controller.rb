class TaskUsersController < ApplicationController
  before_action :load_task

  def create
    @task_user = @task.task_users.new(task_user_params)
    respond_to do |format|
      format.json do
        if @task_user.save
          render :json => @task
        else
          render :json => { :errors => @task_user.errors.messages }, :status => 422
        end
      end
    end
  end

  def destroy
    @task.task_users.find_by(task_id: params[:task_user][:task_id],user_id: params[:task_user][:user_id]).destroy
    respond_to do |format|
      format.json { render :json => {}, :status => :no_content }
    end
  end

  private
  def task_user_params
    params.require(:task_user).permit(:task_id, :user_id)
  end
  def load_task
    @task = Task.find(params[:task_user][:task_id])
  end
end