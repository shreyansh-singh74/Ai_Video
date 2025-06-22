"use client" // This component must be a client component

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { useRef, useState } from "react";

interface FileUplodProps{
    onSuccess:(res:any) => void
    onProgress?:(progress:number) => void
    fileType?: "image" | "video"
}

const FileUpload = ({
    onSuccess,
    onProgress,
    fileType 
}:FileUplodProps) => {

    const [uploading,setUploading] = useState(false);
    const [error,setError] = useState<string | null>(null)

    // Optional validation
    const validateFile = (file:File) => {
        if(fileType == "video"){
            if(!file.type.startsWith("video/")){
                setError("Please upload valid video file");
            }
        }
        if(file.size>100 *1024*1024){
            setError("File size must be less than 100 MB")
        }
        return true;
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file || !validateFile(file)) return;

        setUploading(true)
        setError(null)

        try {
            const authRes = await fetch("/api/auth/imagekit-auth");
            const auth = await authRes.json()



        } catch (error) {
            
        }

    }

    return (
        <>
            <input 
            type="file" 
            accept={fileType === "video" ? "video/*" : "image/*"}
            onChange={handlFileChange}
            />
            {uploading && (
                <span>Loading...</span>
            )}

        </>
    );
};

export default FileUpload;