import { Project } from "../components/Project";

export module Listener {
  //custom type - encode a function type with no implementation
  export type Listener = (items: Project.Project[]) => void;
}
