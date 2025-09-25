from django.db import models
from django.utils.timezone import now


class User(models.Model):
    GENDER_CHOICES = [
        ("Male", "Male"),
        ("Female", "Female"),
    ]

    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True, max_length=150)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    profile_photo = models.ImageField(upload_to="profile_photos/", blank=True, null=True)
    join_date = models.DateField(default=now)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Subscription(models.Model):
    SUBSCRIPTION_CHOICES = [
        ("1 Month", "1 Month"),
        ("3 Months", "3 Months"),
        ("6 Months", "6 Months"),
        ("12 Months", "12 Months"),
    ]

    STATUS_CHOICES = [
        ("Active", "Active"),
        ("Pending", "Pending"),
        ("Expired", "Expired"),
    ]

    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, related_name="subscriptions", on_delete=models.CASCADE)
    subscription_type = models.CharField(max_length=20, choices=SUBSCRIPTION_CHOICES)
    subscription_start = models.DateField(default=now)
    subscription_end = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="Pending")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def days_left(self):
        return (self.subscription_end - now().date()).days

    def __str__(self):
        return f"{self.user.name} - {self.subscription_type} ({self.status})"
