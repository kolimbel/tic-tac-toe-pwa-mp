import ReactDom from "react-dom";

export const ModalName = ({isOpened})=>{

    if (!isOpened){return null}
    const modal = ()=>{
        <>
        aaaaaaa
        </>
    };

    return ReactDom.createPortal(modal, document.body);
}
