

export default function OtherSettings() {
    return (
      <div className="p-4">
        <h2 className="text-lg font-YekanBakh-Regular mb-4">سایر تنظیمات</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">نمایش اعلان‌ها</label>
            <input type="checkbox" className="w-6 h-6" />
          </div>
          <div>
            <label className="block mb-2">حالت تاریک</label>
            <input type="checkbox" className="w-6 h-6" />
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">ذخیره تنظیمات</button>
        </div>
      </div>
    );
  }