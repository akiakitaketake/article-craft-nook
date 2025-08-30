# article-craft-nook

## アプリ概要
エンジニアとしての学習・スキル証明を目的に、**記事投稿アプリ**を開発しました。  
これはシングルページアプリケーション (SPA) として作成しており、フロントエンドには、**TypeScript / React**、
バックエンドには、**Ruby / Ruby on rails**、インフラには、**AWS**を使用しています。
技術学習者向けサービス「Zenn」を参考に、ユーザーが記事を執筆・公開できる仕組みを実装しています。  

- アプリケーションは、以下のリンクからアクセスできます。  
  - [https://article-craft-nook.com](https://article-craft-nook.com)

## 主な機能
- 記事の閲覧（Markdownで保存 → HTMLで表示）
- ユーザー登録（メール認証付き）
- サインイン／サインアウト
- 記事の新規作成・編集（下書き／公開の切替、リアルタイムプレビュー）

シンプルながら、認証・権限管理・エディタ機能などWebサービスに必要な基本機能を一通り備えています。

## 技術スタック
- **バックエンド**: Ruby on Rails（APIモード）
  - 認証に `devise_token_auth` を利用
  - RSpec / Rubocop によるテスト・静的解析
- **フロントエンド**: Next.js（Reactベース）
  - TypeScript による型安全な実装
  - Material-UI によるモダンなUI
- **開発環境**: Docker によるコンテナ化
- **本番環境**: AWS にデプロイ
- **CI/CD**: GitHub Actions を利用して自動テスト・デプロイを構築

## 動作イメージ
**記事アプリホームページ**  
ログインをしなくても、他のユーザーが投稿した記事を閲覧することができます。
![記事アプリホーム画面](https://drive.google.com/uc?id=1Ac8F-nqFLnT7gZU-DKhzJfh_s4rsDRpe)  
**記事詳細ページ**  
記事をクリックすると、記事の詳細ページに遷移します。
![記事詳細ページ](https://drive.google.com/uc?id=1t6chsjYBY1YWq-IIFhl_mbtv6UwAPnTq)
**新規登録ページ**  
左上の新規登録のボタンをクリックすると新規登録ページに遷移します。  
メールアドレス、パスワード、ユーザー名を入力し、送信ボタンをクリックすると、入力したemail宛に認証メールが届きます。  
![新規登録画面](https://drive.google.com/uc?id=1RiE3MY3PjIkhhtQvBXm4zyQ_QVBHuk6R)  
**認証メール**  
「アカウントを有効化する」をクリックすると、認証処理が行われて、ログインページに遷移します。
![認証メール](https://drive.google.com/uc?id=1A5aesxCRZVIwEnY4KiYKPcsQhAf_SjJz)
**メール認証後のログインページ**  
新規登録で登録したメールアドレス、パスワードでログインできます。
![ログイン画面](https://drive.google.com/uc?id=1nt88ssVPbFNwov7AzdehQqqHMObz6vX2)  
**ログイン後のホームページ**  
ログイン後のホームページではヘッダーがログインユーザー用に切り替わっています。
![ログイン後のホーム画面](https://drive.google.com/uc?id=1UPSgBxatoNa1E1u6NZ9Vi2cEZDLHr-PO)  
**記事編集ページ**   
記事編集ページには右上にプレビュースイッチ、下書きor公開スイッチをを配置し、簡単に切り替えれるようにしました。
それにより記事を書きながら完成予想をすぐに確認することができます。
![記事編集画面](https://drive.google.com/uc?id=1UlpEgYfEkVHB8R8-C9_UUCfWd6pLkhZB)  
**マイ記事管理ページ**  
記事の管理ページでは自分の書いた記事をまとめてみることができます。  
公開中、下書きを一目で確認することができ、このページから記事編集ページ、記事のプレビューページに遷移することができます。
![マイ記事管理ページ](https://drive.google.com/uc?id=1Jf0jWIcTP15qxUIg_1JCyaFPhD1EPDl2)



## 工夫した点
- フロントエンド・バックエンド・インフラを一貫して設計・実装・運用  
- Markdownエディタ＋リアルタイムプレビューにより直感的な執筆体験を実現  
- ユーザー登録時にメール認証を導入し、実務を想定したセキュリティを確保  
- Docker や GitHub Actions を活用し、再現性の高い開発環境とCI/CDパイプラインを構築  

## 得られた経験
- 設計から開発・テスト・デプロイまで一人で完結させるフルスタック開発経験  
- クラウドサービス（AWS）を活用した本番運用の基礎理解  
- CI/CDの自動化による継続的改善プロセスの実践  

## デモ
（ここにデモURLやスクリーンショットを載せると、より分かりやすいです）
