// 'use client'

// import { useFormContext } from 'react-hook-form'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Textarea } from '@/components/ui/textarea'

// export default function AdditionalDetails() {
//   const { register, formState: { errors } } = useFormContext()

//   return (
//     <div className="space-y-4">
//       <div>
//         <Label htmlFor="callFrequency">Call Frequency (days)</Label>
//         <Input
//           id="callFrequency"
//           type="number"
//           {...register('callFrequency', {
//             valueAsNumber: true,
//             min: { value: 1, message: 'Call frequency must be at least 1 day' },
//           })}
//           defaultValue={7}
//         />
//         {errors.callFrequency && <p className="text-red-500 text-sm mt-1">{errors.callFrequency.message}</p>}
//       </div>

//       <div>
//         <Label htmlFor="additionalNotes">Additional Notes</Label>
//         <Textarea
//           id="additionalNotes"
//           {...register('additionalNotes')}
//           placeholder="Enter any additional notes or comments"
//           rows={4}
//         />
//       </div>
//     </div>
//   )
// }

import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-6 bg-white shadow-md">
      <h2 className="text-2xl font-semibold text-blue-900">Welcome Back!</h2>
      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition">
        Add Lead
      </button>
    </div>
  );
};

export default Header;
