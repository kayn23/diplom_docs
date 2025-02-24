Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  scope 'api' do
    post 'login', to: 'authentication#login'
    resources :users, only: %i[show update] do
      member do
        post :add_roles # Создаем маршрут /api/users/:id/add_role
        post :remove_roles
      end
    end
  end
end
