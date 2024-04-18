from fastapi import FastAPI
from pydantic import BaseModel
import requests
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

class Image(BaseModel):
    img_url: str

class SearchParams(BaseModel):
    user_id: str
    searchInput: str

@app.post("/search")
async def search(search_params: SearchParams):
    # sending get request and saving the response as response object
    r = requests.get(url = "http://host.docker.internal:9200/images/_search", params={'q': search_params.searchInput, 'size':10000})
    
    # extracting data in json format
    data = r.json()
    
    print(data["hits"])
    
    arr = []
    for elem in data["hits"]["hits"]:
        categories = elem["_source"]["categories"]
        hasHighScore = False
        for cat in categories:
            if search_params.searchInput in cat["category"] and cat["score"] >= 0.2:
                hasHighScore = True
        
        if(hasHighScore):
            arr.append(elem["_source"]["uri"].replace("&amp;", "&"))

    
    print("ARRAY---------")
    print(arr)

    myobj = {
        "url_list": arr,
        "user_id": search_params.user_id,
    }
    jsondata = json.dumps(myobj)
    req = requests.post("http://host.docker.internal:81/searched_posts", jsondata)

    resp = req.json()
    print(resp)


    return resp

@app.get("/addservice")
async def add_service():
    myobj = {
    "mllib":"caffe",
    "description":"image classification service",
    "type":"supervised",
    "parameters":{
    "input":{
      "connector":"image"
    },
    "mllib":{
      "nclasses":1000
    }
    },
    "model":{
        "repository":"/opt/models/ggnet/"
    }
    }
    jsondata = json.dumps(myobj)
    # sending get request and saving the response as response object
    r = requests.post("http://host.docker.internal:8080/services/imageserv", jsondata)
    
    # extracting data in json format
    data = r.json()

    return data

@app.post("/addindex")
async def add_index(image: Image):
    print("---------------IMG URL---------------")
    print(image.img_url)
    myobj = {
    "service": "imageserv",
    "parameters": {
        "mllib": {"gpu": True},
        "input": {
            "width": 224,
            "height": 224
        },
        "output": {
            "best": 3,
            "template": "{ {{#body}}{{#predictions}} \"uri\":\"{{uri}}\",\"categories\": [ {{#classes}} { \"category\":\"{{cat}}\",\"score\":{{prob}} } {{^last}},{{/last}}{{/classes}} ] {{/predictions}}{{/body}} }",
            "network": {
                "url": "http://host.docker.internal:9200/images/img",
                "http_method": "POST"
            }
        }
    },
    "data": [
        image.img_url
    ]
    }
    jsondata = json.dumps(myobj)
    r = requests.post("http://host.docker.internal:8080/predict", jsondata)

    data = r.json()
    print(data)

    return data

