from django.urls import path

from users.views import UserRegisterView, UserLoginView, RefreshTokenView, CustomerRecordView, \
    ShippingAddressView, WishlistView, CartView, CheckIsInCart

urlpatterns = [
    path('user/register/', UserRegisterView.as_view(), name='register'),
    path('user/login/', UserLoginView.as_view(), name='login'),
    path('refresh-token/', RefreshTokenView.as_view(), name='token_refresh'),
    path('user/record/', CustomerRecordView.as_view(), name='customer_record'),
    path('user/shipping_address/', ShippingAddressView.as_view(), name='shipping_addresss'),
    path('user/my_wishlist/', WishlistView.as_view(), name='my_wishlist'),
    path('user/my_cart/', CartView.as_view(), name='my_cart'),
    path('user/in_cart/', CheckIsInCart.as_view(), name='check_is_in_cart'),
]
