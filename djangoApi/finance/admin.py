from django.contrib import admin

from .models import Category, Budget, Transaction

admin.site.register(Category)
admin.site.register(Budget)
admin.site.register(Transaction)


# git add . 
# git commit -m "made header and other staff"
# git push