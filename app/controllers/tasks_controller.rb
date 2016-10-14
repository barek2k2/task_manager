class TasksController < ApplicationController
  before_action :find_project
  def index
    @tasks = @project.tasks
  end

  def show
    @task = @project.tasks.find(params[:id])
  end

  def create
    @task = @project.tasks.new(task_params)
    respond_to do |format|
      format.json do
        if @task.save
          #ActionCable.server.broadcast 'activity_channel', :task => @task
          render :json => @task
        else
          render :json => { :errors => @task.errors.messages }, :status => 422
        end
      end
    end
  end

  def update
    @task = @project.tasks.find(params[:id])
    respond_to do |format|
      format.json do
        if @task.update(task_params)
          render :json => @task
        else
          render :json => { :errors => @task.errors.messages }, :status => 422
        end
      end
    end
  end

  def destroy
    @project.tasks.find(params[:id]).destroy
    respond_to do |format|
      format.json { render :json => {}, :status => :no_content }
    end
  end

  private
  def task_params
    params.require(:task).permit(:title, :description)
  end
  def find_project
    @project = Project.friendly.find(params[:project_id])
  end
end