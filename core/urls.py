"""dsnac URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.views import defaults as default_views
from django.conf import settings

from ui import views
from reading import views as book_views
from users import views as user_views
from payments import views as payment_views
from storage import views as storage_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('', views.HomePage.as_view(), name='home'),

    path('books/', book_views.BookList.as_view(), name='book_list'),
    path('borrowed/', book_views.BorrowedList.as_view(), name='borrowed_list'),
    path('ebooks/', book_views.EbooksList.as_view(), name='ebooks_list'),
    path('manuscripts/', book_views.ManuscriptsList.as_view(), name='manuscripts_list'),
    path('returned/', book_views.ReturnedBooksList.as_view(), name='returned_list'),
    path('books/tag/<int:pk>/', book_views.BooksByTagList.as_view(), name='tag'),

    path('magazines/', book_views.MagazineList.as_view(), name='magazine_list'),
    path('documents/', book_views.DocumentList.as_view(), name='document_list'),
    path('audios/', storage_views.AudioList.as_view(), name='audio_list'),
    path('videos/', storage_views.VideoList.as_view(), name='video_list'),
    path('contact/', views.ContactView.as_view(), name='contact'),
    path('contact/success/', views.ContactSuccessView.as_view(), name='contact_success'),
    path('quick/search/', views.QuickSearch.as_view(), name='quick_search'),

    path('categories/', book_views.CategoryList.as_view(), name='category_list'),
    path('category/<int:pk>/', book_views.CategoryDetailView.as_view(), name='category_detail'),

    # Borrow
    path('book/waiting_list/<int:pk>/', views.add_to_waiting_list, name='add_to_waiting_list'),
    path('book/return/<int:pk>/', views.return_book, name='return_book'),

    # Blog
    path('blog/', views.BlogList.as_view(), name='blog_list'),
    path('blog/<int:pk>/', views.BlogDetail.as_view(), name='blog_detail'),

    # Books
    path('book/add/', book_views.AddBookView.as_view(), name='add_book'),
    path('book/save/', book_views.save_book, name='save_book'),
    path('book/<str:slug>/', book_views.BookDetail.as_view(), name='book_detail'),
    path('book/read/<str:slug>/', book_views.ReadBook.as_view(), name='read_book'),
    path('review/<int:pk>/', views.add_review, name='add_review'),
    path('favorite/<int:pk>/', views.add_favorite, name='add_favorite'),
    path('borrow/<int:pk>/', views.borrow_book, name='borrow_book'),
    path('bookpage/<int:pk>/', views.BookPageView.as_view(), name='page_detail'),
    path('bookpage/<int:pk>/', views.BookPageView.as_view(), name='page_detail'),

    # Profile
    path('profile/<int:pk>/', user_views.UserDetail.as_view(), name='user_detail'),
    path('my/loans/', book_views.my_loans, name='my_loans'),
    path('my/reading/', book_views.my_reading, name='my_reading'),


    # Donate
    # Old version with quick payments
    # path('make-donation/', payment_views.DonateView.as_view(), name='donate'),
    # path('make-donation/quick/', payment_views.QuickDonateView.as_view(), name='quick_donate'),

    path('donation/campaigns/', payment_views.CampaignListView.as_view(), name='donate'),
    path('donation/campaigns/<int:pk>/', payment_views.CampaignDetailView.as_view(), name='campaign_detail'),
    path('donation/process/', payment_views.DonateView.as_view(), name='process_payment'),

    # Custom Pages
    path('page/<int:pk>/', views.CustomPageDetail.as_view(), name='page'),

    path('search/', include('haystack.urls')),
    # path('search/', views.ExtendedSearchView.as_view(), name='search'),
    path('prefetch_search/', views.prefetch_search, name='prefetch_search'),
    path('tinymce/', include('tinymce.urls')),

    # Search word in Book
    path('search_word/', book_views.search_word)

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        path('400/', default_views.bad_request, kwargs={'exception': Exception('Bad Request!')}),
        path('403/', default_views.permission_denied, kwargs={'exception': Exception('Permission Denied')}),
        path('404/', default_views.page_not_found, kwargs={'exception': Exception('Page not Found')}),
        path('500/', default_views.server_error),
    ]