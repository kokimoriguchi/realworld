module Authenticatable
  def authenticate_with_token!
    raise AuthenticationError if unauthorized?
  end

  def current_user
    token = request.headers['Authorization']&.split(' ')&.last  # Authorizationヘッダーからトークンを取得
    unless token
      return render json: { message: 'unauthorized' }, status: :unauthorized
    end

    # authentication_serviceファイルのメソッド使用しトークンをデコードし解読してユーザーID取り出しそのIDがDBに存在するか確認している。
    AuthenticationService.authenticate_user_with_token!(token)
  rescue AuthenticationError
    nil
  end

  def unauthorized?
    current_user.nil?
  end

  def logged_in?
    if @current_user
      render json: {logged_in: true, user: @current_user}
    else
      render json: {logged_in: false}
    end
  end

end