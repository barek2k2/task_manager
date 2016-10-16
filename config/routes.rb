Rails.application.routes.draw do
  devise_for :users
  default_url_options :host => "localhost:3000"
  root :to => "welcome#index"
  resources :projects do
    resources :tasks do
      put :assign_status
    end
  end
  resources :users, only: [:index]
  resources :task_users
  mount ActionCable.server => '/cable'
end
