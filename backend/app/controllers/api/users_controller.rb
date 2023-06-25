class Api::UsersController < ApplicationController
  include Authenticatable
  before_action :authenticate_with_token!, only: [:show, :index]

  def index
    users = User.all
    render json: { status: 'SUCCESS', data: users }
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: { status: 'SUCCESS', data: user }
    else
      render json: { status: 'ERROR', data: user.errors }
    end
  end

  def show
    render json: {
      user: {
        id: current_user.id,
        name: current_user.name,
      }
    }, status: :ok
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
