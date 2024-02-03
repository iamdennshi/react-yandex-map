import makeEditMark from "./makeEditMark";
import removeMark from "./removeMark";

window.makeEditMark = makeEditMark;
window.editMark = window.makeEditMark();
window.removeMark = removeMark;
