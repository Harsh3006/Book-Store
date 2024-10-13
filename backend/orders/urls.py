from django.urls import path
from orders.views import OrderListView, OrderDetailView

urlpatterns = [
    path('orders/my_orders/', OrderListView.as_view(), name='my_orders'),
    path('orders/<str:order_id>/', OrderDetailView.as_view() , name='order_details')
]
