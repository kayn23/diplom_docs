Rails.application.routes.draw do
  resources :cities
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  scope 'api' do
    post 'login', to: 'authentication#login'
    resources :users, only: %i[show update index] do
      member do
        post :add_roles # Создаем маршрут /api/users/:id/add_role
        post :remove_roles
      end
    end
    resources :cities, only: %i[index create destroy]
  end
end
