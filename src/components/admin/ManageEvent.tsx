"use client";

import { useState } from "react";
import { PackageSearch, Pencil, Sparkles, Trash2, Loader2,X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Event } from "@/store/getEvent";
import { fetchEvents } from "@/store/getEvent";


const EventManage = () => {
  const { data: events = [], refetch, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  const [editEvent, setEditEvent] = useState<Event| null>(null);
  const [deleteEvent, setDeleteEvent] = useState<Event| null>(null);
  const [form, setForm] = useState<Event| null>(null);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const openEditDialog = (event: Event) => {
    setEditEvent(event);
    setForm(event);
    setExistingImages(event.images);
    setNewImages([]);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const files = Array.from(e.target.files)
    const totalImages = existingImages.length + newImages.length + files.length

    if (totalImages > 4) {
      toast.error("Maximum 4 images allowed", {
        description: `You can upload only max 4 images`,
      })

      e.target.value = "" // reset input
      return
    }

    setNewImages((prev) => [...prev, ...files])
  }

  const removeExistingImage = (i: number) =>
    setExistingImages((p) => p.filter((_, idx) => idx !== i));

  const removeNewImage = (i: number) =>
    setNewImages((p) => p.filter((_, idx) => idx !== i));

  const handleUpdate = async () => {
    if (!form) return

    try {
      setIsUpdating(true)

      const formData = new FormData()
      formData.append("name", form.name)
      formData.append("category", form.category)
      formData.append("address", form.address)
      formData.append("date", form.date)
      formData.append("time", form.time)

      existingImages.forEach((img) =>
        formData.append("existingImages", img)
      )

      newImages.forEach((file) =>
      formData.append("newImages", file)
    )

      const res = await fetch(`/api/event/${form._id}`, {
        method: "PUT",
        body: formData,
      })

      if (!res.ok) {
        throw new Error("Update failed")
      }

      toast.success("Event Updated successfully")

      setEditEvent(null)
      refetch()
    } catch (error) {
      toast.error("Failed to update event")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true)
      const res = await fetch(`/api/event/${id}`, {
        method: "DELETE",
      })


      if (!res.ok) {
        throw new Error("Delete failed")
      }

      toast.success("Event Deleted successfully")

      setDeleteEvent(null)
      refetch()
    } catch (error) {
      toast.error("Failed to delete event")
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-[10vh] flex flex-col items-center justify-center bg-[#D7CEBC] text-[#2F3523]">
        <div className="relative">
          {/* Pulsing artisan-style loader */}
          <div className="w-24 h-24 rounded-[2rem] bg-[#2F3523]/5 flex items-center justify-center border border-[#2F3523]/10 animate-pulse">
            <Loader2 className="animate-spin opacity-40" size={40} strokeWidth={1} />
          </div>
        </div>
        <div className="mt-8 text-center">
          <h2 className="text-3xl font-black tracking-tighter italic mb-2">Curating <span className="opacity-40">Events</span></h2>
        </div>
      </div>
    );
  }

  // 2. Refined Empty State
  if (events.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#D7CEBC] text-[#2F3523] px-6 text-center">
       
        <div className="max-w-md">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40 block mb-4">Event Search</span>
          <h2 className="text-2xl font-black tracking-tighter leading-none mb-6 italic">
            No Event <span className="opacity-40">Listed</span>
          </h2>
          <p className="text-sm font-medium italic opacity-70 leading-relaxed mb-10 border-l-2 border-[#2F3523]/20 pl-6">
            "Every handmade piece is currently finding its new home. Our artisans are hard at work crafting fresh traditions."
          </p>

        </div>
      </div>
    );
  }

  return (
  <div className="w-full px-4 py-6">
    {/* TABLE CONTAINER */}
    {/* Added overflow-x-auto to handle small screens and removed fixed max-width */}
    <div className="rounded-2xl max-w-[300] md:max-w-6xl w-full bg-[#D7CEBC] border border-black/20 shadow-sm">
      <div className="">
        <Table className="">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-bold">Event</TableHead>
              <TableHead className="font-bold">Category</TableHead>
              <TableHead className="font-bold">Address</TableHead>
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="font-bold">Timing</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {events.map((event) => (
              <TableRow key={event._id} className="border-black/5">
                <TableCell className="max-w-[150px] truncate font-medium">
                  {event.name}
                </TableCell>
                <TableCell className="max-w-[120px] truncate">
                  {event.category}
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {event.address}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {event.date}
                </TableCell>
                <TableCell>{event.time}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEditDialog(event)}
                      className="p-2 rounded-lg cursor-pointer bg-[#E6DFCF] border border-black/10 hover:bg-[#AEB69A]/40 transition-colors"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteEvent(event)}
                      className="p-2 rounded-lg bg-[#E6DFCF] cursor-pointer border border-black/10 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>

    {/* EDIT MODAL */}
    <Dialog open={!!editEvent} onOpenChange={() => setEditEvent(null)}>
      {/* Changed max-w-3xl to w-[95vw] for mobile and md:max-w-2xl for desktop */}
      <DialogContent className="w-[95vw] md:max-w-2xl max-h-[90vh] overflow-y-auto bg-[#E6DFCF] rounded-2xl border border-black/20 p-4 md:p-6 hide-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Event</DialogTitle>
        </DialogHeader>

        {form && (
          <div className="space-y-6 mt-4">
            {/* Images Grid: 2 cols on mobile, 4 on desktop */}
            <div className="p-4 bg-[#DED6C4] rounded-2xl border border-black/10">
              <p className="text-sm font-semibold mb-3 opacity-70">
                Event Image
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {existingImages.map((img, i) => (
                  <div key={i} className="relative aspect-square">
                    <img
                      src={img}
                      className="h-full w-full object-cover rounded-xl border border-black/20"
                      alt="Event preview"
                    />
                    <button
                      onClick={() => removeExistingImage(i)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
              <Input
                type="file"
                multiple
                onChange={handleImageChange}
                className="mt-4 bg-[#DED6C4] border-dashed border-black/20 cursor-pointer"
              />
            </div>

            {/* Form Fields: Stacked on mobile, 2 columns on tablet+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase opacity-60">Name</label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="bg-[#DED6C4] border-black/10 rounded-xl px-4 py-3"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase opacity-60">Category</label>
                <Input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="bg-[#DED6C4] border-black/10 rounded-xl px-4 py-3"
                />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-bold uppercase opacity-60">Address</label>
                <Input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="bg-[#DED6C4] border-black/10 rounded-xl px-4 py-3"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase opacity-60">Date</label>
                <Input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="bg-[#DED6C4] border-black/10 rounded-xl px-4 py-3"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase opacity-60">Time</label>
                <Input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  className="bg-[#DED6C4] border-black/10 rounded-xl px-4 py-3"
                />
              </div>
            </div>

            <Button 
              disabled={isUpdating} 
              className="w-full bg-[#2F3523] cursor-pointer hover:bg-[#3F4A2C] text-white py-6 rounded-xl font-bold text-lg shadow-lg active:scale-[0.98] transition-all" 
              onClick={handleUpdate}
            >
              {isUpdating ? "Updating..." : "Update Event"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>

    {/* DELETE MODAL */}
    <Dialog open={!!deleteEvent} onOpenChange={() => setDeleteEvent(null)}>
      <DialogContent className="w-[90vw] max-w-md bg-[#E6DFCF] rounded-2xl border border-black/20 p-6">
        <DialogHeader>
          <DialogTitle className="text-red-600 font-bold">Delete Event</DialogTitle>
        </DialogHeader>

        {deleteEvent && (
          <div className="space-y-6 mt-2">
            <p className="text-sm md:text-base leading-relaxed">
              Are you sure you want to delete <b>{deleteEvent.name}</b>? This action cannot be undone.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handleDelete(deleteEvent._id)}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 cursor-pointer text-white rounded-xl py-3 font-semibold"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
              <Button
                disabled={isDeleting}
                onClick={() => setDeleteEvent(null)}
                className="bg-brand-secondary hover:bg-brand-secondary/90 cursor-pointer text-brand-primary rounded-xl py-3 font-semibold"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  </div>
);
};

export default EventManage;