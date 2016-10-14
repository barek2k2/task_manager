Rails.application.routes.draw do
  devise_for :users
  default_url_options :host => "localhost:3000"
  root :to => "welcome#index"
  resources :projects do
    resources :tasks
  end
  mount ActionCable.server => '/cable'
end
