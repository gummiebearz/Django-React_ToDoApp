from django.db import models

# DEFINE MODEL FOR TO-DO OBJECT
class Todo(models.Model):
    # what the task is
    title = models.CharField(max_length = 100)
    # description of task
    description = models.TextField()
    # completion status of task
    completed = models.BooleanField(default = False)

    def __str__(self):
        return self.title
