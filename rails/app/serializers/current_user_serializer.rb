# frozen_string_literal: true

# current_userの必要な項目だけjsonファイルで送る
class CurrentUserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email
end
