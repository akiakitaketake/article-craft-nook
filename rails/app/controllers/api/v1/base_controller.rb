# frozen_string_literal: true

module Api
  module V1
    # devise_token_authのメソッドを短い名前のまま変更せずに利用するためのエイリアス設定
    class BaseController < ApplicationController
      alias current_user current_api_v1_user
      alias authenticate_user! authenticate_api_v1_user!
      alias user_signed_in? api_v1_user_signed_in?
    end
  end
end
