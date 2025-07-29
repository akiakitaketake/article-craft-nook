# frozen_string_literal: true

ActiveRecord::Base.transaction do
  user1 = User.create!(name: 'テスト太郎', email: 'test1@example.com', password: 'password', confirmed_at: Time.current)

  user2 = User.create!(name: 'テスト次郎', email: 'test2@example.com', password: 'password', confirmed_at: Time.current)

  15.times do |i|
    Article.create!(title: "テストタイトル1_#{i}", content: "テスト本文1_#{i}", status: :published, user: user1)

    Article.create!(title: "テストタイトル2_#{i}", content: "テスト本文2_#{i}", status: :published, user: user2)
  end
end
