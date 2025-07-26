# frozen_string_literal: true

# articleレコードの設定ファイル
class Article < ApplicationRecord
  belongs_to :user
  enum :status, { unsaved: 10, draft: 20, published: 30 }
  validates :title, :content, presence: true, if: :published?
  validate :verify_only_one_unsaved_status_is_allowed

  private

  def verify_only_one_unsaved_status_is_allowed
    return unless unsaved? && user.articles.unsaved.present?

    raise StandardError, '未保存の記事は複数所有保有できません'
  end
end
