class Api::ArticlesController < ApplicationController
  # include Authenticatable
  # before_action :authenticate_with_token!, only: [:create, :destroy, :update]


  def index
    articles = Article.all
    render json: { status: 'SUCCESS', data: articles }
  end

  def create
    article = Article.new(article_params)
    if article.save
      render json: {status: "create", data: article}
    else
      render json: {status: "error"}
    end
  end

  def show
    article = Article.find(params[:id])
    render json: {status: "get", article: article}
  end

  def destroy
    article = Article.find(params[:id])
    article.delete
  end

  def update

  end

  private
  def article_params
    params.require(:article).permit(:id, :title, :description, :body, :user_id, :tag_list)
  end
end
