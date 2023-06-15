class Api::UsersController < ApplicationController

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
    # CookieからJWTを取得
    # token = cookies[:token]

    token = request.headers['Authorization']&.split(' ')&.last  # Authorizationヘッダーからトークンを取得

    unless token
      return render json: { message: 'unauthorized' }, status: :unauthorized
    end

    # 秘密鍵の取得
    rsa_private = OpenSSL::PKey::RSA.new(File.read(Rails.root.join('auth/service.key')))

    # JWTのデコード。JWTからペイロードが取得できない場合は認証エラーにする
    begin
      decoded_token = JWT.decode(token, rsa_private, true, { algorithm: 'RS256' })
    rescue JWT::DecodeError, JWT::ExpiredSignature, JWT::VerificationError
      return render json: { message: 'unauthorized' }, status: :unauthorized
    end

    # subクレームからユーザーIDを取得
    user_id = decoded_token.first["sub"]

    # ユーザーを検索
    user = User.find(user_id)

    # userが取得できた場合はユーザー情報を返す、取得できない場合は認証エラー
    if user.nil?
      render json: { message: 'unauthorized' }, status: :unauthorized
    else
      render json: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      }, status: :ok
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
