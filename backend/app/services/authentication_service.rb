module AuthenticationService
  # selfをつけることでクラスメソッドとして呼び出せる。かつモジュールになっているのでどこでも呼び出せる。
  # 下記はemailとpassword受け取りfindで検索している。.authenticateはメソッドでハッシュ化されたパスワードの検証を行なってくれるメソッド。
  def self.authenticate_user_with_password!(email, password)
    user = User.find_by(email: email)&.authenticate(password)
    raise AuthenticationError if user.nil?

    user
  end

  # 秘密鍵の取得とJWT.decodeでトークン化を解除している。そこに秘密鍵も持たせ強固にしている。
  # payloadと秘密鍵の組み合わせのトークンでpayloadはiss.sub.expでできておりsubの部分がidになっている。
  def self.authenticate_user_with_token!(token)
    rsa_private = OpenSSL::PKey::RSA.new(File.read(Rails.root.join('auth/service.key')))
    begin
      decoded_token = JWT.decode(token, rsa_private, true, { algorithm: 'RS256' })
    rescue JWT::DecodeError, JWT::ExpiredSignature, JWT::VerificationError
      raise AuthenticationError
    end
    user_id = decoded_token.first["sub"]
    user = User.find(user_id)
    raise AuthenticationError if user.nil?

    user
  end
end
