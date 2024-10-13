from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models

from books.models import Book

User = get_user_model()
MY_DOMAIN = settings.MY_DOMAIN


class Customer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='customer')
    profile_picture = models.ImageField(upload_to="customer", blank=True, null=True)
    dob = models.DateField(verbose_name='Date of Birth', null=True, blank=True)
    phone_number = models.CharField(max_length=10, null=True, blank=True)

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'
    
    def get_profile_picture_url(self):
        if self.profile_picture:
            return MY_DOMAIN + self.profile_picture.url
        return None
    

class ShippingAddress(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='shipping_address')
    recipient_name = models.CharField(max_length=50)
    recipient_phone_number = models.CharField(max_length=10)
    street = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    postal_code = models.CharField(max_length=6)
    is_default = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if self.is_default:
            # Set other addresses of the same customer as not default
            ShippingAddress.objects.filter(customer=self.customer).exclude(id=self.id).update(is_default=False)
        else:
            # Single address will always be dafault
            shipping_address = ShippingAddress.objects.filter(customer=self.customer).exclude(id=self.id).count()
            if shipping_address == 0:
                self.is_default=True
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.customer} - {self.recipient_name} - {self.city} - {self.state}'
    
    class Meta:
        ordering = ('recipient_name', )


class Wishlist(models.Model):
    customer = models.OneToOneField(Customer, on_delete=models.CASCADE, related_name='wishlist')
    books = models.ManyToManyField(Book, blank=True)

    def __str__(self):
        return self.customer


class CartItem(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='cart_items')
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.customer} - {self.book.title}"

    @property
    def total_price(self):
        return self.quantity * self.book.price

    class Meta:
        ordering = ('customer', 'book')
        unique_together = ('customer', 'book')


class Cart(models.Model):
    customer = models.OneToOneField(Customer, on_delete=models.CASCADE, related_name='cart')
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    items = models.ManyToManyField(CartItem, blank=True)

    class Meta:
        ordering = ('customer', )
