import PageWrapper from "../components/PageWrapper";

export default function Profile() {
  return (
   <>
      <div className="
        max-w-3xl mx-auto p-8 rounded-2xl shadow-xl 
        bg-gradient-to-b from-orange-200 to-yellow-100
      ">
        
        <h2 className="text-3xl font-bold text-center mb-8">Profile Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEFT SIDE INFO */}
          <div className="space-y-4 text-lg">
            <p><b>Name:</b> Roshni</p>
            <p><b>Phone Number:</b> +1234567890</p>
            <p><b>Email:</b> roshni@example.com</p>
            <p><b>Subjects:</b> Mathematics, Science</p>
            <p><b>Subscription Status:</b> Active</p>
            <p><b>Valid Thru:</b> 01/01/2025</p>
            <p><b>Expiry Thru:</b> 01/01/2026</p>
            <p><b>Days Left:</b> 35</p>
          </div>

          {/* IMAGE UPLOAD BOX */}
          <div className="flex justify-center items-center">
            <label className="
              border-2 border-dashed border-gray-400 
              rounded-xl w-48 h-48 flex items-center justify-center 
              cursor-pointer hover:border-blue-500 text-blue-500
            ">
              <input type="file" className="hidden" />
              CHOOSE FILE
            </label>
          </div>
        </div>

        {/* BUTTON */}
        <div className="flex justify-center mt-10">
          <button className="
            bg-blue-600 text-white px-8 py-3 rounded-xl 
            font-semibold hover:bg-blue-700 shadow-lg
          ">
            REQUEST RENEWAL
          </button>
        </div>
      </div>
    </>
  );
}
