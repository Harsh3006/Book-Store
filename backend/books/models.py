from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator

User = get_user_model()
MY_DOMAIN = settings.MY_DOMAIN


class Book(models.Model):
    title = models.CharField(max_length=150)
    author = models.CharField(max_length=150)
    category = models.CharField(max_length=100, null=True, blank=True)
    genre = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    cover_image = models.ImageField(upload_to="books", blank=True)
    publication_date = models.DateField(null=True, blank=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    customer_rating = models.DecimalField(max_digits=2, decimal_places=1, null=True, blank=True)
    count_in_stock = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.title

    def get_cover_image_url(self):
        if self.cover_image:
            return MY_DOMAIN + self.cover_image.url
        return None

    class Meta:
        ordering = ('title',)


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    comment = models.TextField(null=True, blank=True)
    rating = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.user:
            return f'{self.user.first_name} {self.user.last_name}-{self.book.title}'
        return f'Unkown - {self.book.title}'

    class Meta:
        ordering = ('-added_at', '-rating')
