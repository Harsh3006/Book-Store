from django.urls import path

from books.views import BookListView, BookDetailView, BookCategoriesView, BookGenresView

urlpatterns = [
    path('books/all_books/', BookListView.as_view(), name='book_list'),
    path('books/<int:book_id>/', BookDetailView.as_view(), name='book_detail'),
    path('books/all_categories/', BookCategoriesView.as_view(), name='category_list'),
    path('books/all_genres/', BookGenresView.as_view(), name='genre_list'),
]
