FROM python:3.9
WORKDIR /Neo4j
RUN pip install fastapi uvicorn neo4j
COPY ./main.py /Neo4j/
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "81"]