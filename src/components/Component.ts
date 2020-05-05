export module Component {
  //Component Base Class, using generics to ensure flexibility of the variables
  export abstract class Component<
    T extends HTMLElement,
    U extends HTMLElement
  > {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
      templateId: string,
      hostElementId: string,
      insertAtStart: boolean,
      newElementId?: string
    ) {
      this.templateElement = <
        HTMLTemplateElement //selecting elements
      >document.getElementById(templateId)!;
      this.hostElement = <T>document.getElementById(hostElementId)!; //get the piece of code in which the template should be displayed in
      const importedNode = document.importNode(
        //imports a node and set the ID
        this.templateElement.content,
        true
      );
      this.element = <U>importedNode.firstElementChild; //imports the element
      if (newElementId) {
        this.element.id = newElementId;
      }
      this.attach(insertAtStart);
    }
    private attach(insertWhere: boolean) {
      this.hostElement.insertAdjacentElement(
        insertWhere ? "afterbegin" : "beforeend",
        this.element
      );
    }
    abstract configure(): void;
    abstract renderContent(): void;
  }
}
