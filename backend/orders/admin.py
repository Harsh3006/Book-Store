from django.contrib import admin
from orders.models import Order, OrderItem


class OrderItemInlineAdmin(admin.StackedInline):
    model = OrderItem
    extra = 0
    can_delete = False


class OrderAdmin(admin.ModelAdmin):
    list_display = ['ordered_at', 'total_amount', 'status', 'is_paid']
    inlines = [OrderItemInlineAdmin]


admin.site.register(Order, OrderAdmin)
