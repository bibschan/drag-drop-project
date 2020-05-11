//Drag and Drop Interfaces
interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void; //signal the browser that thing you're dragging over is a valid drag target
  dropHandler(event: DragEvent): void; //react to the drop that happens, handles the drop, updates the data
  dragLeaveHandler(event: DragEvent): void; //visual feedback for the user
}
