import { useState } from "react";
import { useAtomValue } from "jotai";
import { userProfile } from "../../stores/store";
import useGet from "../../hooks/useGet";
import useUpdate from "../../hooks/useUpdate";
import { getFormData } from "../../utils/form-data";
import { handleToast } from "../../utils/message";
import { transformedErrors } from "../../utils";

const ProfileUser = () => {
  const user = useAtomValue(userProfile);

  //! Data fetching hooks
  const { data, isLoading } = useGet([`user-profile-${user?.id}`], `/user/${user?.id}`);
  const { mutateAsync, isPending } = useUpdate('/user', [`user-profile-${user?.id}`]);
  const { mutateAsync: mutateAsyncPassword, isPending: isPendingPassword } = useUpdate('/user', [`user-profile-${user?.id}`]);

  //! Tabs state
  const [activeTab, setActiveTab] = useState("personalInfo");

  //! Handle Profile Update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = getFormData(e.target);
      await mutateAsync({ slug: `${user?.id}/change-profile`, body: formData });
      handleToast("success", "پروفایل شما با موفقیت ویرایش شد");
    } catch (error) {
      handleError(error);
    }
  };

  //! Handle Password Change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const { oldPassword, password, confirmPassword } = getFormData(e.target);

    if (password !== confirmPassword) {
      handleToast("error", "رمز عبور جدید و تکرار آن مطابقت ندارند");
      return;
    }

    try {
      await mutateAsyncPassword({ slug: `${user?.id}/change-password`, body: { oldPassword, password } });
      handleToast("success", "رمز عبور شما با موفقیت تغییر یافت");
    } catch (error) {
      handleError(error);
    }
  };

  //! General error handler
  const handleError = (error) => {
    const errors = transformedErrors(error?.response?.data?.errors);
    if (errors) {
      Object.entries(errors).forEach(([key, value]) => {
        handleToast("error", `${key}: ${value[0]}`);
      });
    }
    if (error?.response?.data?.message) {
      handleToast("error", error?.response?.data?.message);
    }
  };

  if (isLoading) return <div>در حال بارگذاری...</div>;

  return (
    <div className="p-1">
      {/* Header */}
      <div className="p-3 bg-stone-200 rounded-xl my-4">
        <h1 className="text-sm font-YekanBakh-Bold">پروفایل</h1>
      </div>

      {/* Tabs */}
      <div className="bg-white p-3">
        <nav className="flex gap-2">
          <TabButton isActive={activeTab === "personalInfo"} onClick={() => setActiveTab("personalInfo")}>
            مشخصات حقیقی
          </TabButton>
          <TabButton isActive={activeTab === "changePassword"} onClick={() => setActiveTab("changePassword")}>
            تغییر پسورد
          </TabButton>
        </nav>
      </div>

      {/* Content */}
      <div className="px-4 py-5 sm:px-6">
        {activeTab === "personalInfo" ? (
          <PersonalInfoForm data={data?.data} onSubmit={handleProfileUpdate} isPending={isPending} />
        ) : (
          <ChangePasswordForm onSubmit={handlePasswordChange} isPending={isPendingPassword} />
        )}
      </div>
    </div>
  );
};

//! Tab Button Component
const TabButton = ({ isActive, children, onClick }) => (
  <button
    onClick={onClick}
    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
      isActive ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
    }`}
  >
    {children}
  </button>
);

//! Personal Info Form Component
const PersonalInfoForm = ({ data, onSubmit, isPending }) => (
  <form onSubmit={onSubmit}>
    <div className="flex flex-col lg:flex-row gap-3">
      <InputField label="نام" name="first_name" defaultValue={data?.first_name} />
      <InputField label="نام خانوادگی" name="last_name" defaultValue={data?.last_name} />
    </div>
    <div className="flex flex-col lg:flex-row gap-3 mt-5">
      <InputField label="شماره موبایل" name="phone" defaultValue={data?.phone} dir="ltr" />
      <InputField label="ایمیل" name="email" defaultValue={data?.email} dir="ltr" />
    </div>
    <div className="mt-6 flex justify-end">
      <SubmitButton isPending={isPending} text="ذخیره" />
    </div>
  </form>
);

//! Change Password Form Component
const ChangePasswordForm = ({ onSubmit, isPending }) => (
  <form onSubmit={onSubmit}>
    <div className="flex flex-col gap-4">
      <InputField label="رمز عبور قدیمی" name="oldPassword" type="password" />
      <InputField label="رمز عبور جدید" name="password" type="password" />
      <InputField label="تکرار رمز عبور جدید" name="confirmPassword" type="password" />
      <div className="mt-4 flex justify-end">
        <SubmitButton isPending={isPending} text="ذخیره تغییرات" />
      </div>
    </div>
  </form>
);

//! Reusable InputField Component
const InputField = ({ label, name, type = "text", defaultValue, dir = "rtl" }) => (
  <div className="w-full lg:w-1/3">
    <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      defaultValue={defaultValue}
      dir={dir}
      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
    />
  </div>
);

//! Submit Button Component
const SubmitButton = ({ isPending, text }) => (
  <button
    type="submit"
    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-indigo-600"
    disabled={isPending}
  >
    {isPending ? "در حال ارسال..." : text}
  </button>
);

export default ProfileUser;
