# frozen_string_literal: true

# Userモデルのカラムの中で、どの情報をレスポンスに含めるかを選択する
class UserSerializer < ActiveModel::Serializer
  attributes :name
end
