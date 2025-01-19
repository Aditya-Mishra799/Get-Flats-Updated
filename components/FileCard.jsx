import { deleteObject, getUploadURL } from "@/server-actions/s3Actions";
import axios from "axios";
import { Trash, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const FileCard = ({
  name,
  progress,
  s3Key,
  isUploading,
  onDelete,
  onAbort,
  onRestart,
  id,
}) => {
  //   const setS3Key = (value) =>
  //     setFiles((prev) => {
  //       const items = prev.map((item, index) => {
  //         if (index === idx) {
  //           return { ...item, s3Key: value };
  //         }
  //         return item;
  //       });
  //       return items;
  //     });
  const startUploading = async () => {
    if (s3Key === null && isUploadingRef.current === false) {
      isUploadingRef.current = true;
      try {
        const uploadUrlRequest = await getUploadURL(file.name, file.type, true);
        if (!uploadUrlRequest.success) {
          throw new Error(uploadUrlRequest.message);
        }
        const { uploadUrl, key } = uploadUrlRequest.data;
        const cancelTokenSource = axios.CancelToken.source();
        setCancelToken(cancelTokenSource);
        await axios.put(uploadUrl, file, {
          headers: { "Content-Type": file.type },
          onUploadProgress: (event) => {
            const currentProgress = Math.round(
              (event.loaded * 100) / event.total
            );
            setProgress(currentProgress);
          },
          cancelToken: cancelTokenSource.token,
        });
        setS3Key(key);
      } catch (error) {
        if (axios.isCancel(error)) {
          setS3Key(null);
          setProgress(0);
        } else {
          console.error(error.message);
        }
      } finally {
        isUploadingRef.current = false;
        setCancelToken(null);
      }
    }
  };

  const abortUploading = () => {
    if (s3Key !== null && cancelToken && isUploadingRef.current === true) {
      cancelToken();
    }
  };
  const deleteFile = async () => {
    if (s3Key !== null && isUploadingRef.current == false) {
      try {
        const deleteResponse = await deleteObject(s3Key);
        if (!deleteResponse.success) {
          throw new Error(deleteResponse.message);
        }
        setFiles((prev) => [...prev.filter((_, index) => index != idx)]);
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  return (
    <div className="flex gap-2 justify-between items-center bg-gray-100 rounded p-2 w-full">
      <div className="w-full space-y-1">
        <p className="text-xs max-w-[180px] text-slate-700 text-ellipsis overflow-x-hidden text-nowrap">
          {name}
        </p>
        {isUploading && (
          <div className="w-full bg-gray-200 h-1 rounded-full">
            <div
              className={`bg-slate-700 h-1 rounded-l-full ${
                progress === 100 ? "rounded-r-full" : "rounded-r-none"
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
      {isUploading ? (
        <button className="px-2 py-2" onClick={onAbort} type = "button">
          <X />
        </button>
      ) : (
        s3Key && (
          <button className="px-2 py-2" onClick={onDelete} type = "button">
            <Trash />
          </button>
        )
      )}
    </div>
  );
};

export default FileCard;
