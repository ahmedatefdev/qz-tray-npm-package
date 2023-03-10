import { Component } from "react";
interface IReactPortalProps {
    wrapperId?: string;
    children: React.ReactNode;
}
interface IReactPortalState {
    wrapperElement: null | HTMLElement;
}
declare class ReactPortal extends Component<IReactPortalProps, IReactPortalState> {
    state: {
        wrapperElement: null;
    };
    componentDidMount(): () => void;
    render(): import("react").ReactPortal | null;
}
export default ReactPortal;
