from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
class ProductSetPagination(PageNumberPagination):
    page_query_param = "p"
    page_size = 12
    page_size_query_param = "page_size"
    max_page_size = 12
    def get_paginated_response(self, data):
        actual_page =self.get_page_number(self.request,data)
        if self.get_next_link() != None and self.get_previous_link() != None:
            return Response({
                'next': f"{str(int(actual_page) + 1)}",
                'previous':f"{str(int(actual_page) - 1)}",
                'results': data
            })
        if self.get_next_link() == None and self.get_previous_link() != None:
            return Response({
                'next': None,
                'previous':f"{str(int(actual_page) - 1)}",
                'results': data
            })
        if self.get_next_link() != None and self.get_previous_link() == None:
            return Response({
                'next': f"{str(int(actual_page) + 1)}",
                'previous':None,
                'results': data
            })
        return Response({
                'next': None,
                'previous':self.get_previous_link(),
                'results': data
            })
    
