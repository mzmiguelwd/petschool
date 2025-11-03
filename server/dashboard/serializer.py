from rest_framework import serializers


#Matrículas agrupadas por raza o tamaño
class MatriculaGroupSerializer(serializers.Serializer):
    label = serializers.CharField()   # 'raza' o 'tamano'
    total = serializers.IntegerField()


#Porcentaje de ocupación por plan
class PlanOccupancySerializer(serializers.Serializer):
    plan = serializers.CharField()
    porcentaje = serializers.FloatField()


#Top 5 caninos con mayor asistencia
class TopAsistenciaSerializer(serializers.Serializer):
    nombre_canino = serializers.CharField(source='matricula__nombre_canino')
    total_asistencias = serializers.IntegerField()


#Serializer principal del Dashboard
class DashboardDirectorSerializer(serializers.Serializer):
    matriculas_por_raza = MatriculaGroupSerializer(many=True)
    matriculas_por_tamano = MatriculaGroupSerializer(many=True)
    ocupacion_por_plan = PlanOccupancySerializer(many=True)
    top_5_asistencia = TopAsistenciaSerializer(many=True)
