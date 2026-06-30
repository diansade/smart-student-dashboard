import { useState, useEffect } from "react";
import { X } from "lucide-react";

const Resources = () => {
  const [showModal, setShowModal] = useState(false);

  const [resourceTitle, setResourceTitle] = useState("");

  const [resourceLink, setResourceLink] = useState("");

  const [resourceTitleError, setResourceTitleError] = useState("");

  const [resourceLinkError, setResourceLinkError] = useState("");

  const [resources, setResources] = useState(() => {
    const saved = localStorage.getItem("resources");

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("resources", JSON.stringify(resources));
  }, [resources]);

  const addResource = () => {
    setResourceTitleError("");
    setResourceLinkError("");

    let valid = true;

    if (!resourceTitle.trim()) {
      setResourceTitleError("Enter Resource Title");
      valid = false;
    }

    if (!resourceLink.trim()) {
      setResourceLinkError("Enter Resource Link");
      valid = false;
    }

    if (!valid) return;

    const newResource = {
      id: Date.now(),
      title: resourceTitle.trim(),
      link: resourceLink.trim(),
    };

    setResources((prev) => [...prev, newResource]);

    resetForm();
  };

  const deleteResource = (id) => {
    setResources((prev) => prev.filter((resource) => resource.id !== id));
  };

  const resetForm = () => {
    setResourceTitleError("");
    setResourceLinkError("");
    setResourceTitle("");
    setResourceLink("");
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-800">Resources</h1>

          <p className="mt-1 text-zinc-500">Organize your Resources</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="
  rounded-2xl
  bg-emerald-500
  px-5 py-3
  font-medium
  text-white
  hover:bg-emerald-600
  transition
"
        >
          + Add Resource
        </button>
      </div>

      {/* Resources */}
      <section
        className="
        rounded-[2rem]
        border border-stone-200
        bg-stone-50
        p-6
        min-h-[450px]
      "
      >
        <div className="mt-6 space-y-4">
          {resources.length === 0 ? (
            <div className="text-center text-zinc-500 py-10">
              No resources added yet
            </div>
          ) : (
            resources.map((resource) => (
              <div
                key={resource.id}
                className="
                  rounded-3xl
                  border
                  border-stone-200
                  bg-white
                  p-5
                  flex
                  flex-col
                  gap-4
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div>
                  <h3 className="font-medium">{resource.title}</h3>

                  <p className="mt-1 text-sm text-zinc-500 break-all">
                    {resource.link.length > 45
                      ? resource.link.slice(0, 45) + "..."
                      : resource.link}
                  </p>
                </div>

                <div className="flex justify-end gap-3">
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noreferrer"
                    className="
        rounded-xl
        bg-emerald-500
        px-4 py-2
        text-white
        hover:bg-emerald-600
        "
                  >
                    Open
                  </a>

                  <button
                    onClick={() => {
                      const confirmDelete = window.confirm(
                        "Are you sure you want to delete this resource?",
                      );

                      if (confirmDelete) {
                        deleteResource(resource.id);
                      }
                    }}
                    className="
        rounded-xl
        bg-red-100
        px-4 py-2
        text-red-600
        "
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div
          className="
    fixed inset-0
    bg-black/30
    backdrop-blur-sm
    flex items-center justify-center
    z-50
  "
        >
          <div
            className="
      w-[95%] max-w-lg
      rounded-[2rem]
      bg-white
      p-8
      shadow-xl
    "
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Add New Resource</h2>

              <button
                onClick={resetForm}
                className="p-2 rounded-full hover:bg-stone-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Resource Title
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  value={resourceTitle}
                  onChange={(e) => setResourceTitle(e.target.value)}
                  className="
          w-full
          rounded-2xl
          border
          border-stone-200
          px-4 py-3
          "
                />
                {resourceTitleError && (
                  <p className="mt-2 text-sm text-red-500">
                    {resourceTitleError}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-zinc-700">
                  Resource Link
                </label>
                <input
                  type="url"
                  placeholder="Link"
                  value={resourceLink}
                  onChange={(e) => setResourceLink(e.target.value)}
                  className="
            rounded-2xl
            border
            w-full
            border-stone-200
            px-4 py-3
            "
                />
                {resourceLinkError && (
                  <p className="mt-2 text-sm text-red-500">
                    {resourceLinkError}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={resetForm}
                className="
          rounded-2xl
          bg-stone-100
          hover:bg-stone-200
          px-5 py-3
          "
              >
                Cancel
              </button>

              <button
                onClick={addResource}
                className="
          rounded-2xl
          hover:bg-emerald-600
          bg-emerald-500
          px-5 py-3
          text-white
          "
              >
                Add Resource
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources;
