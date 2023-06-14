# 作成手順書

## 認証部分

1. gem 'bcrypt', '~> 3.1.7'を有効にし bundle install
2. テーブルのカラムに password_digest を追加する。
3. そのカラムを持つモデルファイルに has_secure_password を追加する。このようにすることで:password, :password_confirmation を渡すことで自動的に暗号にしてくれる。
4. rails のディレクトリで mkdir auth && cd $\_を実施（auth ディレクトリ作成しそのディレクトリに移動する）
5. openssl genrsa 2024 > service.key で service.key という名前の秘密鍵を作成する。openssl genrsa は秘密鍵を生成するコマンドであり、2024 は鍵の長さ（ビット数）を指定する引数です。
6. application コントローラーに include ActionController::Cookies を追加し cookie 使用可能にする
7. config/application ファイルに config.middleware.use ActionDispatch::Cookies を追加し機能渡せるようにしている。
8. rails g controller sessions でコントローラー作成しログイン作成する。
9. users コントローラーで作成したユーザーを sessions コントローラーで必要なパスワード等受け取り cookie に保存する。
10. users コントローラーで SHOW アクション定義し、SHOW アクション用の route 用意し cookie 取得しデコードする。
