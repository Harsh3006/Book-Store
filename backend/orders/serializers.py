from rest_framework import serializers

from books.serializers import BookSerializer
from orders.models import Order, OrderItem
from users.serializers import ShippingAddressSerializer


class OrderItemSerializer(serializers.ModelSerializer):
    book = BookSerializer()

    class Meta:
        model = OrderItem
        fields = ['book', 'quantity', 'unit_price', 'total_price']


class OrderListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = ['id', 'ordered_at', 'total_amount', 'is_paid', 'status']

    def to_representation(self, instance):
        result = super().to_representation(instance)
        result['id'] = f'OD{instance.id:04d}'
        return result


class OrderSerializer(serializers.ModelSerializer):
    shipped_address = ShippingAddressSerializer()

    class Meta:
        model = Order
        fields = '__all__'

    def to_representation(self, instance):
        result = super().to_representation(instance)
        result['id'] = f'OD{instance.id:04d}'
        order_items = OrderItem.objects.filter(order=instance)
        result['order_items'] = OrderItemSerializer(order_items, many=True).data
        return result
