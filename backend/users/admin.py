from django.contrib import admin
from users.models import Customer, ShippingAddress, Wishlist, Cart, CartItem


class ShippingAddressAdmin(admin.StackedInline):
    model = ShippingAddress
    can_delete = True
    extra = 0


class CustomerAdmin(admin.ModelAdmin):
    list_display = ['user', 'phone_number']
    inlines = [ShippingAddressAdmin]


class WishlistAdmin(admin.ModelAdmin):
    list_display = ['customer', 'books_count']

    def books_count(self, obj):
        return obj.books.count()


class CartAdmin(admin.ModelAdmin):
    list_display = ['customer', 'items_count', 'last_updated']

    def items_count(self, obj):
        return obj.items.count()


class CartItemAdmin(admin.ModelAdmin):
    list_display = ['customer', 'book', 'quantity']


admin.site.register(Customer, CustomerAdmin)
admin.site.register(Wishlist, WishlistAdmin)
admin.site.register(Cart, CartAdmin)
admin.site.register(CartItem, CartItemAdmin)
