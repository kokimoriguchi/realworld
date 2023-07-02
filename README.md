# Real World クローンアプリ

## 概要

Real World のクローンアプリになります。下記リンクから確認できます。
[RealWorld](https://realworld-demo.com)
機能としてはサインイン・サインアップ・サインアウトのログイン関係ができ、記事の作成・編集・削除閲覧ができます。
タグやお気に入り、コメントやユーザー情報の編集は未実装でレスポンシブ対応もできていない不完全版になります。

インフラ構成図は下記になります。
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/2741017/e8e73255-6272-0532-0b3c-a31884a26264.png)
EC2 インスタンス 2 台記述していますが、現在は片方停止させています。
またプライベートサブネット 2 箇所作成していますが RDS は現状 1 台のみになります。
https 通信可能にしており、ロードバランサーにより EC2 インスタンの負荷分散可能にしています。
また Git Hub Actions 使用し CI/CD 可能にしています。(現状は静的解析とテスト実行せず pull するのみ)
main ブランチに push すると git pull するようになっています。
インスタンスの CPU の問題で npm run build コマンド実行すると止まる可能性高いので、build ディレクトリもリモートリポジトリに push し、インスタンスが pull できるようにしインスタンス内で build 実行しなくて済むようにしています。また、現状 bundle install も止まる可能性あるので記述しておりません。あくまで動作確認程度にしています。

## 使用技術

### backend

- Ruby 3.1.2
- Ruby on Rails 7.1.2

### frontend

- JavaScript node16.15.0 (React 使用)
- Tailwind CSS

### database

- MySQL 5.7

### infra

- AWS
