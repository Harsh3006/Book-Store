from datetime import date, timedelta

from django.contrib.postgres.search import SearchVector
from django.db.models import Q

from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from books.models import Book
from books.serializers import BookSerializer
from pagination import DefaultPagination


class BookListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = BookSerializer
    pagination_class = DefaultPagination

    def get_queryset(self):
        include_out_of_stock = self.request.query_params.get('include_out_of_stock', False)
        if include_out_of_stock == 'true':
            queryset = Book.objects.all()
        else:
            queryset = Book.objects.filter(count_in_stock__gt=0)
        search = self.request.query_params.get('search', None)
        if search is not None and len(search) >= 3:
            queryset = queryset.annotate(search=SearchVector('title', 'author', 'category')).filter(
                Q(search__icontains=search) | Q(search=search))
        categories = self.request.GET.getlist('categories[]', [])
        if len(categories) > 0:
            queryset = queryset.filter(category__in=categories)
        genres = self.request.GET.getlist('genres[]', [])
        if len(genres) > 0:
            queryset = queryset.filter(genre__in=genres)
        customer_rating = self.request.query_params.get('customer_rating', None)
        if customer_rating:
            queryset = queryset.filter(customer_rating__gte=customer_rating)
        publication_date_str = self.request.query_params.get('publication_date', None)
        if publication_date_str:
            today = date.today()
            if publication_date_str == 'last_week':
                publication_date = today - timedelta(days=7)
            elif publication_date_str == 'last_month':
                publication_date = today - timedelta(days=30)
            elif publication_date_str == 'last_year':
                publication_date = today - timedelta(days=365)
            queryset = queryset.filter(publication_date__gte=publication_date)
        price_min = self.request.query_params.get('price_range_min', None)
        price_max = self.request.query_params.get('price_range_max', None)
        if price_min and price_max:
            queryset = queryset.filter(price__gte=price_min, price__lte=price_max)
        return queryset


class BookDetailView(RetrieveAPIView):
    queryset = Book.objects.all()
    permission_classes = [AllowAny]
    serializer_class = BookSerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'book_id'


class BookCategoriesView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        categories = Book.objects.order_by('category').values_list('category', flat=True).distinct()
        return Response({'categories': categories}, status=status.HTTP_200_OK)


class BookGenresView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        genres = Book.objects.order_by('genre').values_list('genre', flat=True).distinct()
        return Response({'genres': genres}, status=status.HTTP_200_OK)
