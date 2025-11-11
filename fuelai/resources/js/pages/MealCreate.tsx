import { Head, Link, router } from "@inertiajs/react";
import NavbarTop from "@/components/navbar";
import NutrientField from "@/components/nutrient-field";
import { useState, ChangeEvent } from "react";

export default function MealCreate() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  
  const [fields, setFields] = useState({
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    fiber: "",
    sugar: "",
    sodium: "",
    other_nutrients: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImage(file);
  };

  const handleFieldChange = (field: string, val: string) => {
    setFields((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    // Append each field exactly as Laravel expects
    Object.entries(fields).forEach(([key, val]) => {
      formData.append(key, val);
    });

    if (image) formData.append("image", image);

    router.post("/meals", formData, {
      forceFormData: true,
      onSuccess: () => {
        setName("");
        setDescription("");
        setImage(null);
        setFields({
          calories: "",
          protein: "",
          carbs: "",
          fat: "",
          fiber: "",
          sugar: "",
          sodium: "",
          other_nutrients: "",
        });
      },
      onError: (errs) => setErrors(errs),
      onFinish: () => setIsSubmitting(false),
    });
  };

  return (
    <>
      <Head title="Create Meal" />
      <NavbarTop />

      <div className="min-h-screen bg-base-200 pt-32">
        <div className="container mx-auto p-4 max-w-3xl">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center gap-4 mb-6">
                <Link href="/meal_list" className="btn btn-ghost btn-sm">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back
                </Link>
                <h1 className="text-3xl font-bold">Create New Meal</h1>
              </div>

              {/* Fields */}
              <div className="space-y-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Meal Name</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Description</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="textarea textarea-bordered w-full h-24"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Upload Image</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input file-input-bordered w-full"
                  />
                  {image && <img src={URL.createObjectURL(image)} alt="Preview" className="max-w-xs mt-3 rounded shadow" />}
                </div>

                {/* Dynamic Nutrient Fields (auto labels) */}
                <div className="grid grid-cols-2 gap-4">
                  {Object.keys(fields)
                    .filter((k) => k !== "other_nutrients")
                    .map((field) => (
                      <NutrientField
                        key={field}
                        field={field}
                        value={fields[field as keyof typeof fields]}
                        onChange={handleFieldChange}
                      />
                    ))}
                </div>

                {/* Other Nutrients */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Other Nutrients</span>
                  </label>
                  <textarea
                    value={fields.other_nutrients}
                    onChange={(e) => handleFieldChange("other_nutrients", e.target.value)}
                    className="textarea textarea-bordered w-full h-24"
                  />
                </div>

                <div className="flex gap-3 justify-end pt-4">
                  <Link href="/meal_list" className="btn btn-ghost">
                    Cancel
                  </Link>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !name.trim()}
                    className="btn btn-primary"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Creating...
                      </>
                    ) : (
                      "Create Meal"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
