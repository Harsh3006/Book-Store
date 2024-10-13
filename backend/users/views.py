from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from books.models import Book
from users.models import Cart, CartItem, Customer, ShippingAddress, Wishlist
from users.serializers import UserRegisterSerializer, UserLoginSerializer, CustomerSerializer, \
    ShippingAddressSerializer, WishlistSerializer, CartItemSerializer


class UserRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response("Account created succesfuly!", status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RefreshTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.data.get('refresh_token')
        if not refresh_token:
            return Response('Refresh token is required.', status=status.HTTP_400_BAD_REQUEST)
        try:
            token = RefreshToken(refresh_token)
            access_token = str(token.access_token)
        except Exception:
            return Response('Invalid refresh token.', status=status.HTTP_400_BAD_REQUEST)
        return Response({'access_token': access_token}, status=status.HTTP_200_OK)


class CustomerRecordView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            customer = Customer.objects.get(user=request.user)
            serializer = CustomerSerializer(customer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Customer.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        try:
            data = request.data
            customer_data = {
                'user': {
                    'first_name': data.get('first_name'),
                    'last_name': data.get('last_name'),
                    },
                'dob': data.get('dob'),
                'phone_number': data.get('phone_number'),
                'profile_picture': request.FILES.get('profile_picture')
                }
            customer = Customer.objects.get(user=request.user)
            serializer = CustomerSerializer(data=customer_data, instance=customer)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response('Profile Updated', status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Customer.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class ShippingAddressView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            customer = Customer.objects.get(user=request.user)
            shipping_address = ShippingAddress.objects.filter(customer=customer)
            serializer = ShippingAddressSerializer(shipping_address, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except (Customer.DoesNotExist):
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        try:
            customer = Customer.objects.get(user=request.user)
            shipping_address = request.data
            # updating existing shipping address
            if shipping_address['id']:
                shipping_address_obj = ShippingAddress.objects.filter(id=shipping_address['id'])
                if shipping_address_obj.exists():
                    serializer = ShippingAddressSerializer(data=shipping_address, instance=shipping_address_obj.first())
                    if serializer.is_valid():
                        serializer.save()
                    else:
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response('Invalid Shipping Address Id', status=status.HTTP_400_BAD_REQUEST)
                return Response('Shipping Address Updated', status=status.HTTP_200_OK)
            # adding new address
            serializer = ShippingAddressSerializer(data=shipping_address, context={'customer': customer})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response('New shipping address added to your saved addresses', status=status.HTTP_200_OK)
        except Customer.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class WishlistView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            customer = Customer.objects.get(user=request.user)
            wishlist = Wishlist.objects.get(customer=customer)
            serializer = WishlistSerializer(wishlist)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except (Customer.DoesNotExist, Wishlist.DoesNotExist):
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        try:
            customer = Customer.objects.get(user=request.user)
            wishlist = Wishlist.objects.get(customer=customer)
            book_id = request.data.get('book_id', None)
            is_remove = request.data.get('remove', False)
            if book_id:
                book = Book.objects.get(id=book_id)
                if is_remove:
                    wishlist.books.remove(book)
                    wishlist.save()
                    return Response('Book removed from wishlist', status=status.HTTP_200_OK)
                wishlist.books.add(book)
                wishlist.save()
                return Response('Book added to wishlist', status=status.HTTP_200_OK)
            return Response('Book id is required', status=status.HTTP_400_BAD_REQUEST)
        except (Customer.DoesNotExist, Wishlist.DoesNotExist, Book.DoesNotExist):
            return Response(status=status.HTTP_404_NOT_FOUND)


class CheckIsInCart(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            book_id = request.data.get('book_id', None)
            if book_id:
                customer = Customer.objects.get(user=request.user)
                cart = Cart.objects.get(customer=customer)
                cart_item = CartItem.objects.filter(cart=cart, book__id=book_id)
                if cart_item.exists():
                    return Response(True, status=status.HTTP_200_OK)
                return Response(False, status=status.HTTP_200_OK)
            return Response('Book id is required', status=status.HTTP_400_BAD_REQUEST)
        except Cart.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            customer = Customer.objects.get(user=request.user)
            cart = Cart.objects.get(customer=customer)
            serializer = CartItemSerializer(cart.items.all(), many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        try:
            customer = Customer.objects.get(user=request.user)
            cart = Cart.objects.get(customer=customer)
            cart_item = request.data
            if cart_item['cart_item_id']:
                # updating existing cart item
                cart_item_obj = CartItem.objects.filter(id=cart_item['cart_item_id']).first()
                if cart_item_obj:
                    if cart_item['is_delete']:
                        cart.items.remove(cart_item_obj)
                        cart.save()
                        cart_item_obj.delete()
                        cart_item_obj.save()
                        return Response('Book removed from cart', status=status.HTTP_200_OK)
                    cart_item_obj.quantity = cart_item['quantity']
                    cart_item_obj.save()
                    return Response('Cart Updated', status=status.HTTP_200_OK)
                return Response('Invalid Cart Item Id', status=status.HTTP_400_BAD_REQUEST)
            # add new cart item
            book = Book.objects.get(id=cart_item['book_id'])
            new_cart_item = CartItem.objects.create(customer=customer, book=book)
            cart.items.add(new_cart_item)
            cart.save()
            return Response('Book added to cart', status=status.HTTP_200_OK)
        except (Cart.DoesNotExist, Book.DoesNotExist):
            return Response(status=status.HTTP_404_NOT_FOUND)
