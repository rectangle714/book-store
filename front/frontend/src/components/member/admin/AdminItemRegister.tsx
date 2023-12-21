import { useRef, useState } from "react";
import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import store from "../../../store/configureStore";
import { registerItem } from "../../../store/modules/item";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Item } from "../../../store/modules/item";
import LoadingBar from "../../common/LoadingBar";

const AdminItemRegister = () => {
  const [imageSrc, setImageSrc]: any = useState(null);
  const [file, setFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentsInputRef = useRef<HTMLInputElement>(null);
  const item = useRef<Item>({ title: "", contents: "" });

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const onSelectedFiles = async (e: any) => {
    let reader = new FileReader();

    reader.onload = function (e) {
      setImageSrc(e.target?.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    setFile(e.currentTarget.files[0]);
  };

  const itemSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const enteredTitle = titleInputRef.current!.value;
    const enteredContents = contentsInputRef.current!.value;

    if (enteredTitle == "" || enteredTitle == undefined) {
      alert("제목을 입력해주세요");
      return;
    }

    if (enteredContents == "" || enteredContents == undefined) {
      alert("내용을 입력해주세요");
      return;
    }

    const formData = new FormData();
    item.current = { title: enteredTitle, contents: enteredContents };
    formData.append("title", item.current.title);
    formData.append("contents", item.current.contents);
    if (file !== undefined) {
      formData.append("file", file);
    }
    for (const data of formData) {
      console.log(data);
    }

    setIsLoading(true);
    const result = await store.dispatch(registerItem(formData));
    console.log("payload: ", result.payload);
    if (result.payload == "200") {
      alert("상품을 등록했습니다.");
      setIsLoading(false);
      window.location.reload();
    }
  };

  return (
    <>
      <form encType="multipart/form/data">
        <div style={{ textAlign: "center", borderBottom: "solid 3px black", borderTop:"solid 3px black" }}>
          <table
            style={{
              width: "490px",
              marginLeft: "auto",
              marginRight: "auto",
              borderCollapse: "separate",
              borderSpacing: "10px 20px",
            }}
          >
            <colgroup>
              <col width={"30%"} />
              <col width={"*"} />
              <col width={"30%"} />
            </colgroup>
            <tbody>
              <tr>
                <td>상품명</td>
                <td colSpan={2}>
                  <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    id='title'
                    inputRef={titleInputRef}
                  />
                </td>
              </tr>
              <tr>
                <td>내용</td>
                <td colSpan={2}>
                  <TextField
                    placeholder="상품 내용 입력"
                    multiline
                    inputRef={ contentsInputRef }
                    sx={{ width: "100%" }}
                    InputProps={{
                      style : { height:'120px' }
                    }}
                    rows={2}
                    maxRows={4}
                    name='contents'
                  />
                </td>
              </tr>
              <tr>
                <td>이미지</td>
                <td>
                  <img src={imageSrc} style={{ height:'200px', width:'200px', objectFit:'scale-down', objectPosition: 'center center'}}/>
                </td>
                <td>
                  <Button color='success' component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload
                    <VisuallyHiddenInput 
                      accept="image/*" 
                      multiple type="file"
                      onChange={e => onSelectedFiles(e)}
                    />
                  </Button>
                </td>
              </tr>
              <tr>
                <td colSpan={3}>
                  <Button  style={{width: '50%', height:'50px', marginTop:'28px'}}  color='success' variant='contained' size="large" onClick={itemSubmitHandler}>등록</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ paddingTop: 10 }}>
        </div>
      </form>
      <LoadingBar isOpen={ isLoading } />
    </>
  );
};

export default AdminItemRegister;
