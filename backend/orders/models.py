from django.db import models

from books.models import Book
from users.models import Customer, ShippingAddress

payment_method_choices = [
    ('UPI', 'UPI'),
    ('Debit Card', 'Debit Card'),
    ('Credit Card', 'Credit Card'),
    ('Net Banking', 'Net Banking'),
    ('Cash on Delivery', 'Cash on Delivery')
]

order_status_choices = [
    ('Pending', 'Pending'),
    ('Shipped', 'Shipped'),
    ('Out for Delivery', 'Out for Delivery'),
    ('Delivered', 'Delivered')
]


class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, related_name='orders', null=True)
    ordered_at = models.DateTimeField(auto_now_add=True)
    delivery_charge = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(choices=payment_method_choices, default='Cash on Delivery')
    is_paid = models.BooleanField(default=False)
    paid_at = models.DateTimeField(auto_now=False, auto_now_add=False, null=True, blank=True)
    status = models.CharField(choices=order_status_choices, default='Pending')
    shipped_at = models.DateTimeField(null=True, blank=True)
    delivered_at = models.DateTimeField(null=True, blank=True)
    shipped_address = models.ForeignKey(ShippingAddress, on_delete=models.SET_NULL, null=True)

    def save(self, *args, **kwargs):
        self.total_amount = sum(item.unit_price * item.quantity for item in self.order_items.all()) + self.delivery_charge
        super().save(*args, **kwargs)

    class Meta:
        ordering = ('-ordered_at', )


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')
    book = models.ForeignKey(Book, on_delete=models.SET_NULL, null=True)
    quantity = models.PositiveIntegerField(default=0)
    unit_price = models.DecimalField(max_digits=5, decimal_places=2)

    @property
    def total_price(self):
        return self.quantity * self.unit_price
