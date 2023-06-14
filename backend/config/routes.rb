Rails.application.routes.draw do
  namespace :api, format: :json do
    resources :users
    resource :user, only: [:show]
  end
  post "/sign_in", to: "sessions#create"
end
