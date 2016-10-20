class LabelTasksController < ApplicationController
  before_action :load_task

  def create
    @label_task = @task.labelings.new(label_task_params)
    respond_to do |format|
      format.json do
        if @label_task.save
          render :json => @task.labels
        else
          render :json => { :errors => @label_task.errors.messages }, :status => 422
        end
      end
    end
  end

  def destroy
    @task.labelings.find_by(task_id: params[:label_task][:task_id],label_id: params[:label_task][:label_id]).destroy
    respond_to do |format|
      format.json { render :json => @task.labels }
    end
  end

  private
  def label_task_params
    params.require(:label_task).permit(:task_id, :label_id)
  end
  def load_task
    @task = Task.find(params[:label_task][:task_id])
  end
end