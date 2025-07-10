import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import PrimaryButton from "../../common/PrimaryButton";
import toast from "react-hot-toast";
import {
  fetchAuthPage,
  UpdateAuthPageApi,
} from "../../../api/authPage/authPage";
import { useSelector } from "react-redux";

function UpdateAuthPage({ onClose }) {
  const { authPageData, isAuthPageLoading } = useSelector(
    (state) => state.authPage
  );
  const methods = useForm();
  const { register, handleSubmit, reset, setValue } = methods;
  const [imagePreview, setImagePreview] = useState("");

  // Initialize form when Redux data is loaded
  useEffect(() => {
    if (authPageData && Object.keys(authPageData).length > 0) {
      reset(authPageData);
      setImagePreview(authPageData.backgroundContent || "");
    }
  }, [authPageData, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setValue("backgroundContent", file);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("des", data.des);
    formData.append("signInText", data.signInText);
    formData.append("signUpText", data.signUpText);
    formData.append("subTitleBuyer", data.subTitleBuyer);
    formData.append("subTitleSeller", data.subTitleSeller);
    formData.append("backgroundContent", data.backgroundContent);

    try {
      await UpdateAuthPageApi(formData);
      const res = await fetchAuthPage();
      onClose();
      toast.success("Auth Page Updated!");
      if (res?.data?.data) {
        const newData = res.data.data;
        reset(newData);
        setImagePreview(newData.backgroundContent || "");
      }
    } catch (error) {
      toast.error("Failed to update auth page");
      console.error("Update error:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 rounded-lg ">
      <h2 className="text-2xl font-bold mb-6">Update Auth Page</h2>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              {...register("title")}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              {...register("des")}
              className="w-full border rounded p-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Sign In Text</label>
              <input
                {...register("signInText")}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Sign Up Text</label>
              <input
                {...register("signUpText")}
                className="w-full border rounded p-2"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Buyer Subtitle</label>
            <textarea
              {...register("subTitleBuyer")}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Seller Subtitle</label>
            <textarea
              {...register("subTitleSeller")}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Background Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border rounded p-2 bg-white"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Background Preview"
                className="mt-4 max-h-[500px] w-full rounded shadow"
              />
            )}
          </div>

          <div className="pt-4">
            <PrimaryButton type="submit" isSubmitting={isAuthPageLoading}>
              Update
            </PrimaryButton>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default UpdateAuthPage;
