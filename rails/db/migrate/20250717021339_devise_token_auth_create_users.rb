# frozen_string_literal: true

# devise_token_authを基底としたuserモデル作成のためのファイル
class DeviseTokenAuthCreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_users_table
    add_users_indexes
  end

  private

  # ユーザーテーブル作成
  def create_users_table
    create_table(:users) do |table|
      add_auth_basic_columns(table)
      add_recoverable_columns(table)
      add_rememberable_columns(table)
      add_confirmable_columns(table)
      add_user_info_columns(table)
      add_tokens_column(table)
      table.timestamps
    end
  end

  # index追加だけまとめる
  def add_users_indexes
    add_index :users, :email, unique: true
    add_index :users, %i[uid provider], unique: true
    add_index :users, :reset_password_token, unique: true
    add_index :users, :confirmation_token, unique: true
    # add_index :users, :unlock_token, unique: true
  end

  # 必須項目
  def add_auth_basic_columns(table)
    table.string :provider, null: false, default: 'email'
    table.string :uid, null: false, default: ''
    table.string :encrypted_password, null: false, default: ''
  end

  # パスワード再設定
  def add_recoverable_columns(table)
    table.string   :reset_password_token
    table.datetime :reset_password_sent_at
    table.boolean  :allow_password_change, default: false
  end

  # ログイン維持
  def add_rememberable_columns(table)
    table.datetime :remember_created_at
  end

  # メール認証
  def add_confirmable_columns(table)
    table.string   :confirmation_token
    table.datetime :confirmed_at
    table.datetime :confirmation_sent_at
    table.string   :unconfirmed_email # Only if using reconfirmable
  end

  # ユーザー固有情報
  def add_user_info_columns(table)
    table.string :name
    table.string :nickname
    table.string :image
    table.string :email
    # ロック用・必要なら展開
    # table.integer :failed_attempts, default: 0, null: false
    # table.string  :unlock_token
    # table.datetime :locked_at
  end

  # トークン
  def add_tokens_column(table)
    table.text :tokens
  end
end
