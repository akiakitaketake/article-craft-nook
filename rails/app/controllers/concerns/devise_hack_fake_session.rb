# frozen_string_literal: true

# deviseがエラーを起こさないためのフェイク用Sessionの作成
module DeviseHackFakeSession
  extend ActiveSupport::Concern

  # フェイク用のクラスを定義
  class FakeSession < Hash
    def enabled?
      false
    end

    def destroy; end
  end

  included do
    before_action :set_fake_session

    private

    def set_fake_session
      return unless Rails.configuration.respond_to?(:api_only) && Rails.configuration.api_only

      request.env['rack.session'] ||= ::DeviseHackFakeSession::FakeSession.new
    end
  end
end
