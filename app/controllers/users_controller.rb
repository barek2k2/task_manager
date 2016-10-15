class UsersController < ApplicationController
  def index
    @users = User.order(email: :asc)
    @users = @users.where("email LIKE ?", "%#{params[:q]}%") if params[:q].present?
    respond_to do |format|
      format.json{
          render :json => @users.map(&:name).to_json
      }
    end
  end
end