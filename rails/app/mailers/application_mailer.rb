# frozen_string_literal: true

# メール送信処理の共通規定クラス
class ApplicationMailer < ActionMailer::Base
  default from: 'from@example.com'
  layout 'mailer'
end
