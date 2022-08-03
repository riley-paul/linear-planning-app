from django import forms

class JsonForm(forms.Form):
  file = forms.FileField(label='Select a File')