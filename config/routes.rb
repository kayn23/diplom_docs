Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  scope 'api' do
    post 'login', to: 'authentication#login'
    resources :users, only: %i[show update index] do
      member do
        post :add_roles
        post :remove_roles
      end
      resources :cars
    end
    resources :cities, only: %i[index create destroy]
    resources :warehouses, except: :destroy
    resources :orders, except: %i[destroy update] do
      member do
        post :cargo_accepted
        post :payment
      end
      resources :cargos
    end

    resources :routes, only: %i[update]
  end
end
