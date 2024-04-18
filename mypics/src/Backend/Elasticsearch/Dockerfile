FROM python:3.9
WORKDIR /Elasticsearch
RUN pip install fastapi uvicorn requests
COPY ./main.py /Elasticsearch/
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "82"]