class Api::SessionsController < ApplicationController
  def create
    # ユーザの取得
    # seviceディレクトリ内のファイルでモジュールの定義しているのでAuthenticationServiceにそのファイルのメソッド記述で使用可能。
    user = AuthenticationService.authenticate_user_with_password!(login_params[:email],login_params[:password])

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
    render json: { status: 'CREATED', token: token }
  end

  private
  def login_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

end
