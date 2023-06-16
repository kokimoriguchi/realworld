# 作成手順書

## rails セットアップ

1. ディレクトリの作成
2. ディレクトリ移動し、rails new backend -d mysql --api
3. Gem ファイルに gem 'dotenv-rails'と gem 'rack-cors'を追記.
4. .env ファイルの作成。DATABASE_DEFAULT_USER = '<ユーザー名>'の形で環境変数作成。
5. database.yml ファイルに環境変数で接続方法等記述する。※.gitignore に/.env を忘れないこと。
6. routes.rb に下記記述。コントローラー名に対応した resource のルートが localhost:3000/api の形で続く。
7. rails g controller api::コントローラー名 で先ほどの route に対応したコントローラーファイル作成
8. config/puma.rb ファイルの port ENV.fetch("PORT") { 3000 }この部分で port 番号の変更
9. config/initializers/cors.rb のコメントアウトを戻し、下記記述にする。とりあえず origins の部分で許可する URL は React の port 番号の URL。resource の許可ファイルは全てに設定。

## react セットアップ

1. プロジェクト直下に移動し npm create-react-app frontend で React の雛形作成
2. frontend ディレクトリで npm install axios で axios のインストール
3. tailwind の追加。npm install -D tailwindcss postcss autoprefixer を行い、npx tailwindcss init を打ち込む。
4. tailwind.config.js ファイルに下記を書き込む。

```
module.exports = {
content: [
"./src/**/*.{js,jsx,ts,tsx}",
],
theme: {
extend: {},
},
plugins: [],
}
```

5. index.css ファイルに下記書き込む

```
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

## 認証部分

1. gem 'bcrypt', '~> 3.1.7'を有効にし gem jwt を記述し bundle install
2. テーブルのカラムに password_digest を追加する。
3. そのカラムを持つモデルファイルに has_secure_password を追加する。このようにすることで:password, :password_confirmation を渡すことで自動的に暗号にしてくれる。
4. rails のディレクトリで mkdir auth && cd $\_を実施（auth ディレクトリ作成しそのディレクトリに移動する）
5. openssl genrsa 2024 > service.key で service.key という名前の秘密鍵を作成する。openssl genrsa は秘密鍵を生成するコマンドであり、2024 は鍵の長さ（ビット数）を指定する引数です。
6. application コントローラーに include ActionController::Cookies を追加し cookie 使用可能にする
7. config/application ファイルに config.middleware.use ActionDispatch::Cookies を追加し機能渡せるようにしている。
8. rails g controller sessions でコントローラー作成しログイン作成する。
9. controller 配下に api/v1 作成し users コントローラーの作成
10. users コントローラーで作成したユーザーを sessions コントローラーで必要なパスワード等受け取り cookie に保存する。
11. users コントローラーで SHOW アクション定義し、SHOW アクション用の route 用意し cookie 取得しデコードする。
12. login 機能できたたら責務分割で app/service 配下に authentication＿service.rb ファイル作成し。モジュール作成で機能分割する。

##　記事の CRUD 処理

1. rails g model article title:string description:string body:string tag_list:string でモデルの作成
2. 下記のようにマイグレーションファイルを書き null の無許可と user テーブルとの関連付けで user_id を付与する

```
class CreateArticles < ActiveRecord::Migration[7.0]
  def change
    create_table :articles do |t|
      t.string :title, null: false
      t.string :description, null: false
      t.string :body, null: false
      t.string :tag_list
      t.references :user, foreign_key: true, null: false

      t.timestamps
    end
  end
end

```

3. rails g controller articles でコントローラーの作成
