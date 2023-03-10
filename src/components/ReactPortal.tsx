import { Component } from "react";
import { createPortal } from "react-dom";

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

interface IReactPortalProps {
  wrapperId?: string;
  children: React.ReactNode;
}

interface IReactPortalState {
  wrapperElement: null | HTMLElement;
}

class ReactPortal extends Component<IReactPortalProps, IReactPortalState> {
  state = {
    wrapperElement: null,
  };

  componentDidMount() {
    const wrapperId = this.props.wrapperId || "react-portal-QZ-wrapper";
    let element = document.getElementById(wrapperId);
    element = createWrapperAndAppendToBody(wrapperId);
    this.setState({ wrapperElement: element });

    return () => {
      if (element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }

  render() {
    if (this.state.wrapperElement === null) return null;
    return createPortal(this.props.children, this.state.wrapperElement);
  }
}

export default ReactPortal;
