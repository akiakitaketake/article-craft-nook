# frozen_string_literal: true

module Api
  module V1
    module Current
      # ユーザーがログインor認証済みの時にcurrent_userを表示させる
      class UsersController < Api::V1::BaseController
        before_action :authenticate_user!

        def show
          render json: current_user, serializer: CurrentUserSerializer
        end
      end
    end
  end
end
