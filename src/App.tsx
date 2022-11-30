import { useEffect, useState } from 'react'
import data_address from './address';
import PhotoStatus from './List';
import ListItem from './ListItem';
import { Images, UploadStatus } from './ImageType';
import './App.css'


function App() {
    const [images, setImages] = useState<FileList>()
    const [sketchList, setSketchList] = useState<Images[]>([])
    const [saveStatus, setSaveStatus] = useState(false)

    let handleChange = (event: { target: { files: any; }; }) => {
        const file = event.target.files
        if (!file) return
        setImages(file);
    }

    let uploadImage = async () => {
        // 两处疑问：
        // 点击上传后，识别过程可能失败
        // 识别后无论成功与否立即取消loading照片（涉及网络接口，暂时模拟成功失败）
        let fireUpload = Promise.resolve(data_address[0])
        let fireUpload2 = Promise.resolve(data_address[1])
        let fireUpload3 = Promise.resolve(data_address[2])
        let upload = Promise.all([fireUpload, fireUpload2, fireUpload3])
        let list = await upload.then((v) => { return v })

        let elems: Images[] = []
        for (let i = 0; i < list.length; i++) {
            let random = Math.floor(Math.random() * 3)
            let elem = {
                status: UploadStatus[random],
                file: list[i]
            }
            elems.push(elem)
        }
        setSketchList([...sketchList, ...elems])
    }

    const deleteItem = (i: number) => {
        sketchList.splice(i, 1)
        setSketchList([...sketchList])
    }

    useEffect(() => {
        if (!images) return
        let elems: Images[] = []
        for (let i = 0; i < images.length; i++) {
            let element = URL.createObjectURL(images[i]);
            let random = Math.floor(Math.random() * 3)
            let elem = {
                status: UploadStatus[random],
                file: element
            }
            elems.push(elem)
        }
        setSketchList([...sketchList, ...elems])
    }, [images])

    useEffect(() => {
        let count = 0;
        if (!sketchList.length) {
            setSaveStatus(false)
            return
        }
        for (let i = 0; i < sketchList.length; i++) {
            const elem = sketchList[i];
            if (elem.status === "Success") {
                count++
            }
        }
        if (count === sketchList.length) {
            setSaveStatus(true)
        } else {
            setSaveStatus(false)
        }
    }, [sketchList])

    return (
        <div style={{ width: "800px" }}>
            <div>
                {!!sketchList && <img src={sketchList[0]?.file} style={{ width: "200px", height: "200px" }} />}
            </div>
            
            <input type="file" multiple onChange={handleChange} />

            <div style={{ display: "flex" }}>
                <div onClick={uploadImage} style={{ width: "80px", height: "79px", paddingTop: "20px", background: "lightgreen", margin: "4px" }} >Upload</div>
                <PhotoStatus containerWidth={790} itemWidth={80} itemCount={sketchList.length} sketchList={sketchList} deleteItem={deleteItem}>
                    {ListItem}
                </PhotoStatus>
                <div onClick={uploadImage} style={{ width: "80px", height: "79px", paddingTop: "20px", background: `${saveStatus ? "lightgreen" : "red"}`, margin: "4px" }} >SAVE</div>
            </div>

        </div>
    )
}

export default App
