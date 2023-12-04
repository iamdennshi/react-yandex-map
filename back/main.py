from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5500",
    "http://localhost:8500",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Object(BaseModel):
      id: int
      cords: list[float]
      address: str

objects = [
    {'id': 0, "cords": [58.013436, 56.260534], "address": "сад Декабристов"},
    {'id': 1, "cords": [58.010829, 56.253604], "address": "сад имени Любимова"}
]


@app.get("/objects")
async def getObjects() -> list[Object]:
    return objects


@app.get("/objects/{object_id}")
async def getObjectById(object_id: int) -> Object:
    if object_id >= len(objects):
         raise HTTPException(status_code=404, detail="Object not found")
    return objects[object_id]



class Element(BaseModel):
     id: int
     cords: list[float]

class Tree(Element):
    photos: list[str]
    height: int
    trunkDiameter: int
    aestaticAssessment: str
    comment: str

    typeOfPlantGroup: str | None = None
    typeOfDamage: str | None = None
    recommendation: str | None = None
    typeOfPlant: str | None = None
    ageClass: int | None = None
    crownProjection: int | None = None
    trunkNumber: int | None = None
    sanitaryCondition: str | None = None

class Elements(BaseModel):
     trees: list[Element]
     furnitures: list[Element]
     areas: list[Element] | None = None
     
elements = [
     {
        'trees': [
            {'id': 0, 'cords': [58.013436, 56.260534], 'photos': ['someUrlToPhoto'], 'height': 100, 'trunkDiameter': 10, 'aestaticAssessment': 'good', 'comment': "nice"},
            {'id': 1, 'cords': [58.01296212927088, 56.25939887536343], 'photos': ['someUrlToPhoto'], 'height': 100, 'trunkDiameter': 10, 'aestaticAssessment': 'good', 'comment': "nice"},
            {'id': 2, 'cords': [58.01320823677178, 56.259917091923946], 'photos': ['someUrlToPhoto'], 'height': 100, 'trunkDiameter': 10, 'aestaticAssessment': 'good', 'comment': "nice"},
        ],
        'furnitures': [
            {'id': 0, 'cords': [58.013582, 56.260926]},
            {'id': 1, 'cords': [58.013354859708976, 56.26046694477438]},
            {'id': 2, 'cords': [58.01339898804816, 56.2601745839907]},
        ],
    },
    {
         'trees': [
            {'id': 0, 'cords': [58.013436, 56.260534], 'photos': ['someUrlToPhoto'], 'height': 100, 'trunkDiameter': 10, 'aestaticAssessment': 'good', 'comment': "nice"},
            {'id': 1, 'cords': [58.01296212927088, 56.25939887536343], 'photos': ['someUrlToPhoto'], 'height': 100, 'trunkDiameter': 10, 'aestaticAssessment': 'good', 'comment': "nice"},
            {'id': 2, 'cords': [58.01320823677178, 56.259917091923946], 'photos': ['someUrlToPhoto'], 'height': 100, 'trunkDiameter': 10, 'aestaticAssessment': 'good', 'comment': "nice"},
        ],
        'furnitures': [
            {'id': 0, 'cords': [58.013582, 56.260926]},
            {'id': 1, 'cords': [58.013354859708976, 56.26046694477438]},
            {'id': 2, 'cords': [58.01339898804816, 56.2601745839907]},
        ],
    }
]


@app.get("/objects/{object_id}/elements")
async def getElemetns(object_id: int) -> Elements:
    if object_id >= len(objects):
         raise HTTPException(status_code=404, detail="Object not found")
    
    new_elements = elements[object_id].copy() 
    for x in new_elements.keys(): # Аналог SQL запроса - SELECT id, cords from 'Elements', чтобы исплючить не нужные свойства
        new_elements.update({x: list(map(lambda elem: {'id': elem['id'], 'cords': elem['cords']}, new_elements[x]))}) 
    return new_elements



@app.get("/objects/{object_id}/elements/trees/{tree_id}")
async def getTreeById(object_id: int, tree_id: int) -> Tree:
    if object_id >= len(objects):
         raise HTTPException(status_code=404, detail="Object not found")

    for i in elements[object_id].get('trees'):
         if i['id'] == tree_id:
              return i
    raise HTTPException(status_code=404, detail="Tree not found")


@app.post("/objects/{object_id}/elements/trees/", status_code=status.HTTP_201_CREATED)
async def addNewTree(object_id: int, element: Tree) -> Tree:
    if object_id >= len(objects):
        raise HTTPException(status_code=404, detail="Object not found")
    

    elements[object_id]['trees'].append({
         'id': element.id,
         'cords': element.cords,
         'photos': element.photos.copy(),
         'height': element.height,
         'trunkDiameter': element.trunkDiameter,
         'aestaticAssessment': element.aestaticAssessment,
         'comment': element.comment,
         'typeOfPlantGroup': element.typeOfPlantGroup,
         'typeOfDamage': element.typeOfDamage,
         'recommendation': element.recommendation,
         'typeOfPlant': element.typeOfPlant,
         'ageClass': element.ageClass,
         'crownProjection': element.crownProjection,
         'trunkNumber': element.trunkNumber,
         'sanitaryCondition': element.sanitaryCondition,
    })
    return element




