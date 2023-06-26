Rails.application.routes.draw do
  namespace :api, format: :json do
    resources :users
    resources :articles
    resource :user, only: [:show]
    post "/sign_in", to: "sessions#create"
  end
end
