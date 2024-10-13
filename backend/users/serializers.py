import os
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from books.models import Book 
from books.serializers import BookSerializer
from users.models import Customer, ShippingAddress, Wishlist, Cart, CartItem

User = get_user_model()


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        customer = Customer.objects.create(user=user) #creating customer object for storing additional information
        Wishlist.objects.create(customer=customer) #creating a wishlist for the customer
        Cart.objects.create(customer=customer) #creating a cart for the customer
        return user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = User.objects.filter(email=email).first()
            if user:
                if user.is_active:
                    customer = Customer.objects.filter(user=user).first()
                    if customer:
                        if user.check_password(password):
                            refresh = RefreshToken.for_user(user)
                            attrs['refresh_token'] = str(refresh)
                            attrs['access_token'] = str(refresh.access_token)
                            attrs['user'] = f'{user.first_name} {user.last_name}'
                        else:
                            raise serializers.ValidationError("Invalid email or password.")
                    else:
                        raise serializers.ValidationError("No customer exists for this email.")
                else:
                    raise serializers.ValidationError("Email not verified.")
            else:
                raise serializers.ValidationError('No user exists for this email.')
        else:
            raise serializers.ValidationError("Email and password are required.")

        return attrs

    def to_representation(self, instance):
        return {
            'user': instance['user'],
            'access_token': instance['access_token'],
            'refresh_token': instance['refresh_token']
        }


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name')
        instance.last_name = validated_data.get('last_name')
        instance.save()
        return instance


class CustomerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Customer
        fields = ['user', 'phone_number', 'dob', 'profile_picture']

    def create(self, validated_data):
        return Customer.objects.create(**validated_data)

    def update(self, instance, validated_data):
        user = instance.user
        if 'user' in validated_data:
            user_data = validated_data.pop('user')
            serializer = UserSerializer(data=user_data, instance=user)
            serializer.is_valid(raise_exception=True)
            serializer.save()
        instance.phone_number = validated_data.get('phone_number')
        instance.dob = validated_data.get('dob')
        if validated_data['profile_picture']:
            # Delete previous image if it exists
            if instance.profile_picture:
                previous_image_path = instance.profile_picture.path
                if os.path.exists(previous_image_path):
                    os.remove(previous_image_path)
            instance.profile_picture = validated_data.get('profile_picture')
        instance.save()
        return instance

    def to_representation(self, instance):
        result = super().to_representation(instance)
        result['profile_picture'] = instance.get_profile_picture_url()
        return result


class ShippingAddressSerializer(serializers.ModelSerializer):
    is_delete = serializers.BooleanField(default=False, required=False, write_only=True)

    class Meta:
        model = ShippingAddress
        fields = ['id', 'recipient_name', 'recipient_phone_number', 'street', 'city', 'state',
                  'postal_code', 'is_default', 'is_delete']

    def create(self, validated_data):
        if 'is_delete' in validated_data:
            validated_data.pop('is_delete')
        customer = self.context.get('customer')
        validated_data['customer'] = customer
        return ShippingAddress.objects.create(**validated_data)

    def update(self, instance, validated_data):
        if validated_data.get('is_delete'):
            instance.delete()
        else:
            instance.recipient_name = validated_data.get('recipient_name')
            instance.recipient_phone_number = validated_data.get('recipient_phone_number')
            instance.street = validated_data.get('street')
            instance.city = validated_data.get('city')
            instance.state = validated_data.get('state')
            instance.postal_code = validated_data.get('postal_code')
            instance.is_default = validated_data.get('is_default')
            instance.save()
        return instance


class WishlistSerializer(serializers.ModelSerializer):
    books = BookSerializer(many=True)

    class Meta:
        model = Wishlist
        fields = ['books']


class CartItemSerializer(serializers.ModelSerializer):
    book = BookSerializer()

    class Meta:
        model = CartItem
        fields = ['id', 'book', 'quantity', 'total_price']
