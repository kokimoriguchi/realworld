class SessionsController < ApplicationController
  def create
    # ユーザの取得
    user = User.find_by(email: login_params[:email])&.authenticate(login_params[:password])

    # ペイロードの作成
    payload = {
      iss: "login_realworld", # JWTの発行者
      sub: user.id, # JWTの主体
      exp: (DateTime.current + 14.days).to_i # JWTの有効期限
    }

    # 秘密鍵の取得
    rsa_private = OpenSSL::PKey::RSA.new(File.read(Rails.root.join('auth/service.key')))

    # JWTの作成
    token = JWT.encode(payload, rsa_private, "RS256")

    # JWTをCookieにセット
    cookies[:token] = token

    render json: { status: 'CREATED', data: cookies }
  end

  private
  def login_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

end
