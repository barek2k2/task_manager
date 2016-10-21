Rails.application.routes.draw do
  devise_for :users
  default_url_options :host => "localhost:3000"
  root :to => "welcome#index"
  resources :projects do
    resources :tasks do
      put :assign_status
      put :add_label
    end
  end
  resources :users, only: [:index]
  resources :task_users
  resources :label_tasks
  resources :labels
  resources :tasks do
    resources :comments
  end
  mount ActionCable.server => '/cable'
end
