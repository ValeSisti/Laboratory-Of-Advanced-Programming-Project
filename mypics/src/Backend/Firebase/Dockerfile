FROM python:3.9
WORKDIR /Firebase
RUN pip install firebase_admin fastapi uvicorn python-multipart
COPY ./firebase_storage_service.py ./labap-785cc-firebase-adminsdk-gdm5s-736b213798.json /Firebase/
CMD ["uvicorn", "firebase_storage_service:app", "--host", "0.0.0.0", "--port", "80"]