from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from orders.models import Order
from orders.serializers import OrderListSerializer, OrderSerializer
from pagination import DefaultPagination
from users.models import Customer


class OrderListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderListSerializer
    pagination_class = DefaultPagination

    def get_queryset(self):
        try:
            customer = Customer.objects.get(user=self.request.user)
            queryset = Order.objects.filter(customer=customer)
            return queryset
        except Customer.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class OrderDetailView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'order_id'

    def get_queryset(self):
        try:
            customer = Customer.objects.get(user=self.request.user)
            queryset = Order.objects.filter(customer=customer)
            return queryset
        except Customer.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
