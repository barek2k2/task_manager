class LabelsController < ApplicationController

  def create
    @label = Label.new(label_params)
    respond_to do |format|
      format.json do
        if @label.save
          task = Task.find_by_id(params[:task_id])
          task.labels << @label
          render :json => task.labels
        else
          render :json => {:errors => @label.errors.messages}, :status => 422
        end
      end
    end
  end


  private
  def label_params
    params.require(:label).permit(:name, :color)
  end

end