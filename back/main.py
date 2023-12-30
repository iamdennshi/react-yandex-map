from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from model import *
from data import *

app = FastAPI()

origins = [
    "http://localhost:5500",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/objects")
async def get_objects() -> list[Object]:
    return objects

@app.get("/objects/{object_id}")
async def get_object_by_id(object_id: int) -> Object:
    if object_id >= len(objects):
         raise HTTPException(status_code=404, detail="Object not found")
    return objects[object_id]
  
@app.get("/objects/{object_id}/elements")
async def get_elements(object_id: int) -> Elements:
    if object_id >= len(objects):
         raise HTTPException(status_code=404, detail="Object not found")
    
    new_elements = elements[object_id].copy() 
    for x in new_elements.keys(): # Аналог SQL запроса - SELECT id, cords from 'Elements', чтобы исплючить не нужные свойства
        new_elements.update({x: list(map(lambda elem: {'id': elem['id'], 'cords': elem['cords'], 'name': elem['name']}, new_elements[x]))}) 
    return new_elements


@app.get("/objects/{object_id}/elements/trees/{tree_id}")
async def get_tree_by_id(object_id: int, tree_id: int) -> TreeWithId:
    if object_id >= len(objects):
         raise HTTPException(status_code=404, detail="Object not found")

    for i in elements[object_id].get('trees'):
         if i['id'] == tree_id:
              return i
    raise HTTPException(status_code=404, detail="Tree not found")

@app.post("/objects/{object_id}/elements/trees/", status_code=status.HTTP_201_CREATED)
async def add_tree(object_id: int, element: TreeWithoutId) -> TreeWithId:
    if object_id >= len(objects):
        raise HTTPException(status_code=404, detail="Object not found")
    
    newTree = {
         'id': len(elements[object_id]['trees']),
         'cords': element.cords,
         'name': element.name,
         'photos': element.photos,
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
    }

    elements[object_id]['trees'].append(newTree)
    return newTree


@app.put("/objects/{object_id}/elements/trees/{tree_id}")
async def update_tree(object_id: int, tree_id: int, element: TreeWithoutId) -> TreeWithId:
    elementWithRequiredAttributes = element.model_dump(exclude_unset=True)
    requiredElement : dict =  list(filter(lambda e: e['id'] == tree_id, elements[object_id]['trees']))[0]
    requiredElement.update(elementWithRequiredAttributes)
    return requiredElement


@app.delete("/object/{object_id}/elements/trees/{tree_id}")
async def delete_tree(object_id: int, tree_id: int):
    treeElements = elements[object_id]['trees']
    index = -1
    for i in range(len(treeElements)):
        if treeElements[i]["id"] == tree_id:
            index = i
            break
    
    if (index != -1):
        del treeElements[i]
        return {"message": "Successfuly deleted"}
    return {"message": f"Not found tree with tree_id = {tree_id}"}       
        


