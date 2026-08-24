"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, UploadCloud, CheckCircle2 } from "lucide-react";

interface ApplyModalProps {
  jobTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ApplyModal({ jobTitle, isOpen, onClose }: ApplyModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "", coverLetter: "" });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!file) {
      setError("Please attach your resume.");
      setLoading(false);
      return;
    }

    try {
      const form = new FormData();
      form.append("jobTitle", jobTitle);
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("coverLetter", formData.coverLetter);
      form.append("resume", file);

      const response = await fetch("/api/apply", {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        throw new Error("Failed to submit application.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-background border border-foreground/10 p-8 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-12">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-display mb-4">Application Sent!</h2>
            <p className="text-muted-foreground mb-8">
              Thanks for applying to the {jobTitle} role. We'll review your application and get back to you soon.
            </p>
            <Button onClick={onClose} className="rounded-full px-8">Close</Button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-display mb-2">Apply for {jobTitle}</h2>
            <p className="text-muted-foreground mb-8">Fill out the form below to submit your application.</p>
            
            {error && <div className="p-4 mb-6 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  required 
                  className="rounded-xl h-12 bg-foreground/5 border-transparent focus-visible:bg-transparent"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})} 
                  required 
                  className="rounded-xl h-12 bg-foreground/5 border-transparent focus-visible:bg-transparent"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
                <textarea 
                  id="coverLetter" 
                  rows={4}
                  value={formData.coverLetter} 
                  onChange={e => setFormData({...formData, coverLetter: e.target.value})} 
                  className="w-full rounded-xl bg-foreground/5 border-transparent p-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:bg-transparent transition-all"
                  placeholder="Tell us why you're a great fit..."
                />
              </div>
              
              <div className="space-y-2">
                <Label>Resume (PDF)</Label>
                <div className="relative">
                  <Input 
                    type="file" 
                    accept=".pdf"
                    onChange={e => setFile(e.target.files?.[0] || null)}
                    required
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className={`flex items-center justify-center gap-2 h-14 rounded-xl border border-dashed transition-colors ${file ? 'border-foreground/30 bg-foreground/5 text-foreground' : 'border-foreground/20 text-muted-foreground hover:bg-foreground/5 hover:text-foreground'}`}>
                    <UploadCloud className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      {file ? file.name : "Click to upload resume"}
                    </span>
                  </div>
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl text-base mt-4">
                {loading ? "Sending Application..." : "Submit Application"}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
