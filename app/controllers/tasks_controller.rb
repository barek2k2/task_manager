class TasksController < ApplicationController
  before_action :find_project
  def index
    @tasks = @project.tasks

    filter = params[:filter].to_s.downcase
    @tasks = @tasks.send(filter.to_sym) if filter.present? && Task.statuses.keys.include?(filter)
    respond_to do |format|
      format.html
      format.json do
        render :json => @tasks
      end
    end
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

  def assign_status
    @task = @project.tasks.find(params[:task_id])
    respond_to do |format|
      format.json do
        if @task.send("#{params[:status].downcase}!")
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