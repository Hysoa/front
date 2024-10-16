import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import http from "../../utils/http";

export default function Manager() {
  const userToken = localStorage.getItem("userToken");
  const [clips, setClips] = useState([]);
  const [updateClip, setUpdateClip] = useState(false);
  const [addClip, setAddClip] = useState(false);
  const [canAddClip, setCanAddClip] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm();

  const watchClipTitle = watch("clipTitle");
  const watchClipUrl = watch("clipUrl");
  const watchAddClipTitle = watch("addClipTitle");
  const watchAddClipUrl = watch("addClipUrl");
  const watchAddClipOrder = watch("addClipOrder");

  const fetchAllClips = async () => {
    try {
      console.log("go fetch all clips");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/clip/getAll`
      );
      const data = await response.json();
      console.log(data.clips);
      setClips(data.clips);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClip = useCallback(async (id) => {
    try {
      http()
        .delete(`/clip/delete/${id}`)
        .then((response) => response.status === 200 && fetchAllClips());
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleAddClip = useCallback(async () => {
    try {
      http(userToken)
        .post("/clip/add", {
          title: watchAddClipTitle,
          url: watchAddClipUrl,
          order: watchAddClipOrder,
        })
        .then((response) => {
          if (response.status === 200) {
            fetchAllClips();
            setAddClip(false);
            reset();
          }
        });
    } catch (error) {
      console.error(error);
    }
  }, [userToken, watchAddClipTitle, watchAddClipUrl, watchAddClipOrder, reset]);

  const handleUpdateOrderClip = useCallback(
    async (id, order) => {
      console.log("update clip", id, order);
      try {
        http(userToken)
          .put(`/clip/update/${id}`, {
            order,
          })
          .then((response) => {
            if (response.status === 200) {
              fetchAllClips();
            }
          });
      } catch (error) {
        console.error(error);
      }
    },
    [userToken]
  );

  useEffect(() => {
    clips.length === 0 && fetchAllClips();
  }, [clips]);

  useEffect(() => {
    if (addClip) {
      if (
        watchAddClipTitle !== undefined &&
        watchAddClipTitle !== "" &&
        watchAddClipUrl !== undefined &&
        watchAddClipUrl !== ""
      ) {
        setCanAddClip(true);
      } else {
        setCanAddClip(false);
      }
    }
  }, [addClip, watchAddClipTitle, watchAddClipUrl, canAddClip]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="flex">
          <h1 className="text-2xl font-bold">Clips</h1>
          {!addClip && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setAddClip(true);
              }}
              className="ml-2"
            >
              ➕
            </button>
          )}
        </div>

        {addClip && (
          <form className="flex items-center">
            <div className="my-2 flex items-center">
              <div className="my-2 mr-5 flex">
                <label className="mr-2">Position</label>

                <select
                  name="hall"
                  id="hall"
                  className="text-black px-1 mr-2"
                  onChange={(e) => {
                    e.preventDefault();
                    // handleUpdateOrderClip(clip.id, e.target.value);
                  }}
                  {...register("addClipOrder")}
                >
                  <option value="">--</option>
                  {clips.map((c) => (
                    <option key={c.id} value={c.order}>
                      {c.order}
                    </option>
                  ))}
                  <option value={clips.length + 1}>{clips.length + 1}</option>
                </select>
                <label className="mr-2">Nom du clip</label>
                <input
                  type="text"
                  className="flex flex-col gap-4 pl-2 placeholder-black text-black"
                  placeholder="Un super nom"
                  {...register("addClipTitle")}
                />
              </div>
              <div className="my-2 flex">
                <label className="mr-2">Lien de la vidéo</label>
                <input
                  type="text"
                  className="flex flex-col gap-4 pl-2 w-96 placeholder-black text-black"
                  placeholder="https://www.youtube.com/embed/l3chem3sC0u1l13"
                  {...register("addClipUrl")}
                />
              </div>
            </div>

            {canAddClip && (
              <span className="ml-2" onClick={() => handleAddClip()}>
                ➕
              </span>
            )}
            <span
              className="ml-2"
              onClick={(e) => {
                e.preventDefault();
                setAddClip(false);
              }}
            >
              🔚
            </span>
          </form>
        )}

        <form className="flex flex-col">
          {clips
            .sort((a, b) => a.order > b.order)
            .map((clip) => (
              <div className="my-2 flex items-center" key={`clip-${clip.id}`}>
                <div className="my-2 mr-5 flex">
                  <label htmlFor={`clip-${clip.id}`} className="mr-2">
                    Position
                  </label>

                  <select
                    name="hall"
                    id="hall"
                    value={clip.order}
                    className="text-black px-1"
                    onChange={(e) => {
                      e.preventDefault();
                      handleUpdateOrderClip(clip.id, e.target.value);
                    }}
                  >
                    {clips.map((c) => (
                      <option key={c.id} value={c.order}>
                        {c.order}
                      </option>
                    ))}
                  </select>

                  <label htmlFor={`clip-${clip.id}`} className="mx-2">
                    Nom du clip
                  </label>
                  <input
                    type="text"
                    className="flex flex-col gap-4 pl-2 placeholder-black text-black"
                    placeholder={clip.title}
                    {...register("clipTitle")}
                  />
                </div>
                <div className="my-2 flex">
                  <label htmlFor={`clip-${clip.id}`} className="mr-2">
                    Lien de la vidéo
                  </label>
                  <input
                    type="text"
                    className="flex flex-col gap-4 pl-2 w-96 placeholder-black text-black"
                    placeholder={clip.url}
                    {...register("clipUrl")}
                  />
                </div>

                <span
                  className="ml-2"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteClip(clip.id);
                  }}
                >
                  ❌
                </span>
              </div>
            ))}
        </form>
      </div>
    </div>
  );
}
