from django.contrib import admin
from books.models import Book, Review


class BookAdmin(admin.ModelAdmin):
    list_display = ['title', 'author']


class ReviewAdmin(admin.ModelAdmin):
    list_display = ['user', 'rating', 'book', 'added_at']


admin.site.register(Book, BookAdmin)
admin.site.register(Review, ReviewAdmin)
