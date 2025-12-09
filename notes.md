/admin/ django.contrib.admin.sites.index admin:index
/admin/<app_label>/ django.contrib.admin.sites.app_index admin:app_list
/admin/<url> django.contrib.admin.sites.catch_all_view
/admin/auth/group/ django.contrib.admin.options.changelist_view admin:auth_group_changelist
/admin/auth/group/<path:object_id>/ django.views.generic.base.RedirectView
/admin/auth/group/<path:object_id>/change/ django.contrib.admin.options.change_view admin:auth_group_change
/admin/auth/group/<path:object_id>/delete/ django.contrib.admin.options.delete_view admin:auth_group_delete
/admin/auth/group/<path:object_id>/history/ django.contrib.admin.options.history_viewadmin:auth_group_history
/admin/auth/group/add/ django.contrib.admin.options.add_view admin:auth_group_add  
/admin/autocomplete/ django.contrib.admin.sites.autocomplete_view admin:autocomplete
/admin/jsi18n/ django.contrib.admin.sites.i18n_javascript admin:jsi18n
/admin/login/ django.contrib.admin.sites.login admin:login
/admin/logout/ django.contrib.admin.sites.logout admin:logout
/admin/matriculas/matricula/ django.contrib.admin.options.changelist_view admin:matriculas_matricula_changelist
/admin/matriculas/matricula/<path:object_id>/ django.views.generic.base.RedirectView  
/admin/matriculas/matricula/<path:object_id>/change/ django.contrib.admin.options.change_view admin:matriculas_matricula_change
/admin/matriculas/matricula/<path:object_id>/delete/ django.contrib.admin.options.delete_view admin:matriculas_matricula_delete
/admin/matriculas/matricula/<path:object_id>/history/ django.contrib.admin.options.history_view admin:matriculas_matricula_history
/admin/matriculas/matricula/add/ django.contrib.admin.options.add_view admin:matriculas_matricula_add
/admin/password_change/ django.contrib.admin.sites.password_change admin:password_change
/admin/password_change/done/ django.contrib.admin.sites.password_change_done admin:password_change_done
/admin/r/<path:content_type_id>/<path:object_id>/ django.contrib.contenttypes.views.shortcut admin:view_on_site
/admin/token_blacklist/blacklistedtoken/ django.contrib.admin.options.changelist_view admin:token_blacklist_blacklistedtoken_changelist
/admin/token_blacklist/blacklistedtoken/<path:object_id>/ django.views.generic.base.RedirectView
/admin/token_blacklist/blacklistedtoken/<path:object_id>/change/ django.contrib.admin.options.change_view admin:token_blacklist_blacklistedtoken_change
/admin/token_blacklist/blacklistedtoken/<path:object_id>/delete/ django.contrib.admin.options.delete_view admin:token_blacklist_blacklistedtoken_delete
/admin/token_blacklist/blacklistedtoken/<path:object_id>/history/ django.contrib.admin.options.history_view admin:token_blacklist_blacklistedtoken_history
/admin/token_blacklist/blacklistedtoken/add/ django.contrib.admin.options.add_view admin:token_blacklist_blacklistedtoken_add
/admin/token_blacklist/outstandingtoken/ django.contrib.admin.options.changelist_view admin:token_blacklist_outstandingtoken_changelist
/admin/token_blacklist/outstandingtoken/<path:object_id>/ django.views.generic.base.RedirectView
/admin/token_blacklist/outstandingtoken/<path:object_id>/change/ django.contrib.admin.options.change_view admin:token_blacklist_outstandingtoken_change
/admin/token_blacklist/outstandingtoken/<path:object_id>/delete/ django.contrib.admin.options.delete_view admin:token_blacklist_outstandingtoken_delete
/admin/token_blacklist/outstandingtoken/<path:object_id>/history/ django.contrib.admin.options.history_view admin:token_blacklist_outstandingtoken_history
/admin/token_blacklist/outstandingtoken/add/ django.contrib.admin.options.add_view admin:token_blacklist_outstandingtoken_add

/api/docs/ drf_spectacular.views.SpectacularSwaggerView swagger-ui
/api/redoc/ drf_spectacular.views.SpectacularRedocView redoc
/api/schema/ drf_spectacular.views.SpectacularAPIView schema

/api/v1/auth/ rest_framework.routers.APIRootView api-root
/api/v1/auth/<drf_format_suffix:format> rest_framework.routers.APIRootView api-root  
/api/v1/auth/auth/login rest_framework_simplejwt.views.TokenObtainPairView token_obtain_pair
/api/v1/auth/auth/refresh/ rest_framework_simplejwt.views.TokenRefreshView token_refresh
/api/v1/auth/management/ users.views.UserViewSet users-management-list
/api/v1/auth/management/<pk>/ users.views.UserViewSet users-management-detail
/api/v1/auth/management/<pk>\.<format>/ users.views.UserViewSet users-management-detail  
/api/v1/auth/management\.<format>/ users.views.UserViewSet users-management-list  
/api/v1/auth/me/ users.views.ProfileView user-profile
/api/v1/auth/public-list/ users.views.PublicUserListViewSet users-public-list
/api/v1/auth/public-list/<pk>/ users.views.PublicUserListViewSet users-public-detail
/api/v1/auth/public-list/<pk>\.<format>/ users.views.PublicUserListViewSet users-public-detail
/api/v1/auth/public-list\.<format>/ users.views.PublicUserListViewSet users-public-list
/api/v1/auth/register/ users.views.RegisterView user-register

/api/v1/caninos/ rest_framework.routers.APIRootView api-root
/api/v1/caninos/<drf_format_suffix:format> rest_framework.routers.APIRootView api-root
/api/v1/caninos/caninos/ matriculas.views.caninos.CaninoViewSet caninos-list  
/api/v1/caninos/caninos/<pk>/ matriculas.views.caninos.CaninoViewSet caninos-detail  
/api/v1/caninos/caninos/<pk>\.<format>/ matriculas.views.caninos.CaninoViewSet caninos-detail
/api/v1/caninos/caninos\.<format>/ matriculas.views.caninos.CaninoViewSet caninos-list
/api/v1/caninos/matriculas/ matriculas.views.matriculas.MatriculaViewSet matriculas-list
/api/v1/caninos/matriculas/<pk>/ matriculas.views.matriculas.MatriculaViewSet matriculas-detail
/api/v1/caninos/matriculas/<pk>/cambiar_estado/ matriculas.views.matriculas.MatriculaViewSet matriculas-cambiar-estado
/api/v1/caninos/matriculas/<pk>/cambiar_estado\.<format>/ matriculas.views.matriculas.MatriculaViewSet matriculas-cambiar-estado
/api/v1/caninos/matriculas/<pk>\.<format>/ matriculas.views.matriculas.MatriculaViewSet matriculas-detail
/api/v1/caninos/matriculas\.<format>/ matriculas.views.matriculas.MatriculaViewSet matriculas-list

/api/v1/dashboard/ rest_framework.routers.APIRootView api-root
/api/v1/dashboard/<drf_format_suffix:format> rest_framework.routers.APIRootView api-root
/api/v1/dashboard/cliente/ dashboard.views.DashboardClienteView dashboard-cliente-list
/api/v1/dashboard/cliente\.<format>/ dashboard.views.DashboardClienteView dashboard-cliente-list
/api/v1/dashboard/director/ dashboard.views.DashboardDirectorView dashboard-director-list
/api/v1/dashboard/director\.<format>/ dashboard.views.DashboardDirectorView dashboard-director-list
/api/v1/dashboard/reporte/<str:tipo>/ dashboard.views.ReporteCSVView reporte-csv

/api/v1/matriculas/ rest_framework.routers.APIRootView api-root
/api/v1/matriculas/<drf_format_suffix:format> rest_framework.routers.APIRootView api-root
/api/v1/matriculas/caninos/ matriculas.views.caninos.CaninoViewSet caninos-list  
/api/v1/matriculas/caninos/<pk>/ matriculas.views.caninos.CaninoViewSet caninos-detail
/api/v1/matriculas/caninos/<pk>\.<format>/ matriculas.views.caninos.CaninoViewSet caninos-detail
/api/v1/matriculas/caninos\.<format>/ matriculas.views.caninos.CaninoViewSet caninos-list
/api/v1/matriculas/matriculas/ matriculas.views.matriculas.MatriculaViewSet matriculas-list
/api/v1/matriculas/matriculas/<pk>/ matriculas.views.matriculas.MatriculaViewSet matriculas-detail
/api/v1/matriculas/matriculas/<pk>/cambiar_estado/ matriculas.views.matriculas.MatriculaViewSet matriculas-cambiar-estado
/api/v1/matriculas/matriculas/<pk>/cambiar_estado\.<format>/ matriculas.views.matriculas.MatriculaViewSet matriculas-cambiar-estado
/api/v1/matriculas/matriculas/<pk>\.<format>/ matriculas.views.matriculas.MatriculaViewSet matriculas-detail
/api/v1/matriculas/matriculas\.<format>/ matriculas.views.matriculas.MatriculaViewSet matriculas-list

/api/v1/users/ rest_framework.routers.APIRootView api-root
/api/v1/users/<drf_format_suffix:format> rest_framework.routers.APIRootView api-root
/api/v1/users/management/<pk>\.<format>/ users.views.UserViewSet users-management-detail
/api/v1/users/management\.<format>/ users.views.UserViewSet users-management-list
/api/v1/users/me/ users.views.ProfileView user-profile
/api/v1/users/public-list/ users.views.PublicUserListViewSet users-public-list
/api/v1/users/public-list/<pk>/ users.views.PublicUserListViewSet users-public-detail
/api/v1/users/public-list/<pk>\.<format>/ users.views.PublicUserListViewSet users-public-detail
/api/v1/users/public-list\.<format>/ users.views.PublicUserListViewSet users-public-list
/api/v1/users/register/ users.views.RegisterView user-register

/admin/ django.contrib.admin.sites.index admin:index
/admin/<app_label>/ django.contrib.admin.sites.app_index admin:app_list  
/admin/<url> django.contrib.admin.sites.catch_all_view
/admin/auth/group/ django.contrib.admin.options.changelist_view admin:auth_group_changelist
/admin/auth/group/<path:object_id>/ django.views.generic.base.RedirectView  
/admin/auth/group/<path:object_id>/change/ django.contrib.admin.options.change_view admin:auth_group_change
/admin/auth/group/<path:object_id>/delete/ django.contrib.admin.options.delete_view admin:auth_group_delete
/admin/auth/group/<path:object_id>/history/ django.contrib.admin.options.history_view admin:auth_group_history
/admin/auth/group/add/ django.contrib.admin.options.add_view admin:auth_group_add
/admin/autocomplete/ django.contrib.admin.sites.autocomplete_view admin:autocomplete
/admin/jsi18n/ django.contrib.admin.sites.i18n_javascript admin:jsi18n  
/admin/login/ django.contrib.admin.sites.login admin:login
/admin/logout/ django.contrib.admin.sites.logout admin:logout
/admin/matriculas/matricula/ django.contrib.admin.options.changelist_view admin:matriculas_matricula_changelist
/admin/matriculas/matricula/<path:object_id>/ django.views.generic.base.RedirectView
/admin/matriculas/matricula/<path:object_id>/change/ django.contrib.admin.options.change_view admin:matriculas_matricula_change
/admin/matriculas/matricula/<path:object_id>/delete/ django.contrib.admin.options.delete_view admin:matriculas_matricula_delete
/admin/matriculas/matricula/<path:object_id>/history/ django.contrib.admin.options.history_view admin:matriculas_matricula_history
/admin/matriculas/matricula/add/ django.contrib.admin.options.add_view admin:matriculas_matricula_add
/admin/password_change/ django.contrib.admin.sites.password_change admin:password_change
/admin/password_change/done/ django.contrib.admin.sites.password_change_done admin:password_change_done
/admin/r/<path:content_type_id>/<path:object_id>/ django.contrib.contenttypes.views.shortcut admin:view_on_site
/admin/token_blacklist/blacklistedtoken/ django.contrib.admin.options.changelist_view admin:token_blacklist_blacklistedtoken_changelist
/admin/token_blacklist/blacklistedtoken/<path:object_id>/ django.views.generic.base.RedirectView
/admin/token_blacklist/blacklistedtoken/<path:object_id>/change/ django.contrib.admin.options.change_view admin:token_blacklist_blacklistedtoken_change  
/admin/token_blacklist/blacklistedtoken/<path:object_id>/delete/ django.contrib.admin.options.delete_view admin:token_blacklist_blacklistedtoken_delete  
/admin/token_blacklist/blacklistedtoken/<path:object_id>/history/ django.contrib.admin.options.history_view admin:token_blacklist_blacklistedtoken_history  
/admin/token_blacklist/blacklistedtoken/add/ django.contrib.admin.options.add_view admin:token_blacklist_blacklistedtoken_add
/admin/token_blacklist/outstandingtoken/ django.contrib.admin.options.changelist_view admin:token_blacklist_outstandingtoken_changelist
/admin/token_blacklist/outstandingtoken/<path:object_id>/ django.views.generic.base.RedirectView
/admin/token_blacklist/outstandingtoken/<path:object_id>/change/ django.contrib.admin.options.change_view admin:token_blacklist_outstandingtoken_change  
/admin/token_blacklist/outstandingtoken/<path:object_id>/delete/ django.contrib.admin.options.delete_view admin:token_blacklist_outstandingtoken_delete  
/admin/token_blacklist/outstandingtoken/<path:object_id>/history/ django.contrib.admin.options.history_view admin:token_blacklist_outstandingtoken_history  
/admin/token_blacklist/outstandingtoken/add/ django.contrib.admin.options.add_view admin:token_blacklist_outstandingtoken_add

/api/docs/ drf_spectacular.views.SpectacularSwaggerView swagger-ui  
/api/redoc/ drf_spectacular.views.SpectacularRedocView redoc
/api/schema/ drf_spectacular.views.SpectacularAPIView schema

/api/v1/caninos/ matriculas.views.matriculas.MatriculaViewSet matriculas-list
/api/v1/caninos/ rest_framework.routers.APIRootView api-root
/api/v1/caninos/<drf_format_suffix:format> rest_framework.routers.APIRootViewapi-root
/api/v1/caninos/<pk>/ matriculas.views.matriculas.MatriculaViewSet matriculas-detail
/api/v1/caninos/<pk>/cambiar_estado/ matriculas.views.matriculas.MatriculaViewSet matriculas-cambiar-estado
/api/v1/caninos/<pk>/cambiar_estado\.<format>/ matriculas.views.matriculas.MatriculaViewSet matriculas-cambiar-estado
/api/v1/caninos/<pk>\.<format>/ matriculas.views.matriculas.MatriculaViewSet matriculas-detail
/api/v1/caninos/\.<format>/ matriculas.views.matriculas.MatriculaViewSet matriculas-list

/api/v1/dashboard/ rest_framework.routers.APIRootView api-root
/api/v1/dashboard/<drf_format_suffix:format> rest_framework.routers.APIRootViewapi-root
/api/v1/dashboard/cliente/ dashboard.views.DashboardClienteView dashboard-cliente-list
/api/v1/dashboard/cliente\.<format>/ dashboard.views.DashboardClienteView dashboard-cliente-list
/api/v1/dashboard/director/ dashboard.views.DashboardDirectorView dashboard-director-list
/api/v1/dashboard/director\.<format>/ dashboard.views.DashboardDirectorView dashboard-director-list
/api/v1/dashboard/reporte/<str:tipo>/ dashboard.views.ReporteCSVView reporte-csv

/api/v1/matriculas/ matriculas.views.matriculas.MatriculaViewSet matriculas-list
/api/v1/matriculas/ rest_framework.routers.APIRootView api-root
/api/v1/matriculas/<drf_format_suffix:format> rest_framework.routers.APIRootViewapi-root
/api/v1/matriculas/<pk>/ matriculas.views.matriculas.MatriculaViewSet matriculas-detail
/api/v1/matriculas/<pk>/cambiar_estado/ matriculas.views.matriculas.MatriculaViewSet matriculas-cambiar-estado
/api/v1/matriculas/<pk>/cambiar_estado\.<format>/ matriculas.views.matriculas.MatriculaViewSet matriculas-cambiar-estado
/api/v1/matriculas/<pk>\.<format>/ matriculas.views.matriculas.MatriculaViewSet matriculas-detail
/api/v1/matriculas/\.<format>/ matriculas.views.matriculas.MatriculaViewSet matriculas-list

/api/v1/users/ rest_framework.routers.APIRootView api-root
/api/v1/users/<drf_format_suffix:format> rest_framework.routers.APIRootViewapi-root
/api/v1/users/auth/login/ rest_framework_simplejwt.views.TokenObtainPairViewtoken_obtain_pair
/api/v1/users/auth/refresh/ users.views.CookieTokenRefreshView token_refresh
/api/v1/users/management/ users.views.UserViewSet users-management-list  
/api/v1/users/management/<pk>/ users.views.UserViewSet users-management-detail  
/api/v1/users/management/<pk>\.<format>/ users.views.UserViewSet users-management-detail
/api/v1/users/management\.<format>/ users.views.UserViewSet users-management-list
/api/v1/users/me/ users.views.ProfileView user-profile
/api/v1/users/public/ users.views.PublicUserListViewSet users-public-list
/api/v1/users/public/<pk>/ users.views.PublicUserListViewSet users-public-detail
/api/v1/users/public/<pk>\.<format>/ users.views.PublicUserListViewSet users-public-detail
/api/v1/users/public\.<format>/ users.views.PublicUserListViewSet users-public-list
/api/v1/users/register/ users.views.RegisterView user-register
