import { Images } from "./ImageType";

function ListItem({ style, photo, deleteItem, index }: { style: any, photo: Images, deleteItem: any, index: number }) {
    if (photo.status === "Success") {
        return (
            <div style={{ ...style, height: "100px", margin: "4px", background: 'grey' }}>
                <img src={photo.file} style={{ width: "80px", height: "96px" }} />
            </div>
        );
    } else if (photo.status === "Error") {
        return (
            <div style={{ ...style, height: "100px", margin: "4px", background: 'grey', color: "red" }}>
                <div style={{ width: "80px", height: "20px" }} onClick={() => {deleteItem(index)}}>×</div>
                <div style={{ width: "80px", height: "73px" }} onClick={() => alert("Upload Error")}>Error</div>
            </div>
        );
    } else if (photo.status === "Loading") {
        return (
            <div style={{ ...style, height: "100px", margin: "4px", background: 'grey' }}>
                <div style={{ display: "absolute", left: "50px" }} onClick={() => {deleteItem(index)}}>×</div>
                <div style={{ width: "80px", height: "73px" }}>loading</div>
            </div>
        );
    } else {
        return (
            <div style={{ ...style, height: "100px", margin: "4px", background: 'red' }}>
                <div style={{ width: "80px", height: "20px" }} onClick={() => {deleteItem(index)}}>×</div>
                <div style={{ width: "80px", height: "73px" }}> Else </div>
            </div>
        )
    }
}

export default ListItem