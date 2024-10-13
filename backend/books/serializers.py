from rest_framework import serializers

from books.models import Book, Review


class BookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Book
        fields = '__all__'

    def create(self, validated_data):
        return Book.objects.create(**validated_data)

    def to_representation(self, instance):
        result = super().to_representation(instance)
        result['cover_image'] = instance.get_cover_image_url()
        return result


class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review
        fields = '__all__'
