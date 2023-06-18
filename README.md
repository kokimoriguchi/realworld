# Real World クローンアプリ

## 概要

Real World のクローンアプリになります。
機能としてログイン・記事の CRUD 処理ができます。その他の機能は未実装です。
postman の API 確認した後にフロント側に React 作成し API 叩くようにして画面描画しています。
Docker 導入していないので、確認される際は git clone していただき react と rails 各インストールしてから.env ファイル作成し。MySQL との接続できる状態にし mysql.server start 実行。
その後、ターミナル 2 つ使用し片方で rails s 実行。もう片方で npm start すると実行できます。
backend ディレクトリが Rails のデータで、
frontend ディレクトリが React のデータになります。

## 使用技術

### backend

- Ruby 3.1.2
- Ruby on Rails 7.1.2

### frontend

- JavaScript(React 使用)
- Tailwind CSS

### database

- MySQL
