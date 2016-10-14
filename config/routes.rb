Rails.application.routes.draw do
  default_url_options :host => "localhost:3000"
  root :to => "welcome#index"
  resources :projects do
    resources :tasks
  end
end
