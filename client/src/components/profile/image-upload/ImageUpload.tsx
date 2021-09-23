import { Card, CircularProgress } from "@mui/material";
import InsertPhotoSharpIcon from "@mui/icons-material/InsertPhotoSharp";
import { useCallback, useState } from "react";
import { UserStore } from "../../../service/UserStore";
import { UserService } from "../../../service/UserService";

export function ImageUpload() {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(UserStore.getUserAvatar());

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) {
      return;
    }

    setLoading(true);

    // @ts-ignore
    UserService.updateUserAvatar(files[0]).then((avatarUrl) => {
      setAvatar(avatarUrl);
      setLoading(false);
    });
  }, []);

  let avatarImage = avatar ? (
    <img src={avatar} alt={"nope"} width={238} height={238} />
  ) : (
    <InsertPhotoSharpIcon sx={{ fontSize: 40 }} />
  );

  if (loading) {
    avatarImage = <CircularProgress />;
  }

  return (
    <>
      <Card
        variant="outlined"
        onChange={handleFileChange}
        sx={{
          width: 238,
          height: 238,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        {avatarImage}
      </Card>

      <input type="file" accept="image/*" placeholder="Image to upload" onChange={handleFileChange} />
    </>
  );
}
