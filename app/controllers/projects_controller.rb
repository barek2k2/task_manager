class ProjectsController < ApplicationController
  def index
    @projects = Project.all
  end

  def show
    @project = Project.friendly.find(params[:id])
  end

  def create
    @project = Project.new(project_params)
    respond_to do |format|
      format.json do
        if @project.save
          render :json => @project
        else
          render :json => { :errors => @project.errors.messages }, :status => 422
        end
      end
    end
  end

  def update
    @project = Project.find(params[:id])
    respond_to do |format|
      format.json do
        if @project.update(project_params)
          render :json => @project
        else
          render :json => { :errors => @project.errors.messages }, :status => 422
        end
      end
    end
  end

  def destroy
    Project.find(params[:id]).destroy
    respond_to do |format|
      format.json { render :json => {}, :status => :no_content }
    end
  end

  private
  def project_params
    params.require(:project).permit(:title, :description)
  end
end