Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  scope 'api' do
    post 'login', to: 'authentication#login'
    resources :users, only: %i[show create update index] do
      member do
        post :add_roles
        post :remove_roles
        post :update_roles
      end
      resources :cars
    end
    resources :cities, only: %i[index create destroy]
    resources :warehouses, except: :destroy
    resources :orders, except: %i[update] do
      member do
        post :cargo_accepted
        post :payment
      end
      resources :cargos do
        member do
          post :hand_over
        end
      end
    end

    resources :shippings, only: %i[index show] do
      member do
        post :start_load
        post :start_delivery
      end

      resources :cargo_in_shippings, only: %i[index] do
        member do
          post :load
          post :upload
        end
      end
    end

    post 'warehouses/:warehouse_id/upload_cargo/:id', to: 'warehouses#upload_cargo'

    resources :routes, only: %i[update]
  end
end
