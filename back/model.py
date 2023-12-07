from pydantic import BaseModel


class Id(BaseModel):
     id: int

class Object(BaseModel):
      id: int
      cords: list[float]
      address: str

class Element(BaseModel):
     cords: list[float] | None = None
     name: str | None = None

class ElementWithId(Element, Id):
     pass

class ElementWithoutId(Element):
     pass

class Tree(ElementWithoutId):
    photos: list[str] | None = None
    height: int | None = None
    trunkDiameter: int | None = None
    aestaticAssessment: str | None = None
    comment: str | None = None

    typeOfPlantGroup: str | None = None
    typeOfDamage: str | None = None
    recommendation: str | None = None
    typeOfPlant: str | None = None
    ageClass: int | None = None
    crownProjection: int | None = None
    trunkNumber: int | None = None
    sanitaryCondition: str | None = None

class TreeWithId(Tree, Id):
     pass

class TreeWithoutId(Tree):
     pass

class Elements(BaseModel):
     trees: list[ElementWithId]
     furnitures: list[ElementWithId]
     areas: list[ElementWithId] | None = None