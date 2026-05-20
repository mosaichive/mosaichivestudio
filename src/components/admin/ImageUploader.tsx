import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Loader2, X } from 'lucide-react';
import { uploadStudioAsset } from '@/lib/uploadStudioAsset';
import { useToast } from '@/hooks/use-toast';

interface Props {
  value: string | null | undefined;
  onChange: (url: string | null) => void;
  folder: string;
  label?: string;
  aspect?: string; // e.g. 'aspect-[4/5]'
}

const ImageUploader: React.FC<Props> = ({ value, onChange, folder, label = 'Image', aspect = 'aspect-[4/5]' }) => {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadStudioAsset(file, folder);
      onChange(url);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      toast({ title: 'Upload error', description: message, variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className={`relative ${aspect} w-full rounded-xl overflow-hidden bg-muted border border-border`}>
        {value ? (
          <>
            <img src={value} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onChange(null)}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/90 text-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors flex items-center justify-center"
              aria-label="Remove"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-foreground/50">
            <Upload size={24} />
            <span className="text-xs">No image</span>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = '';
        }}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="w-full"
      >
        {uploading ? <Loader2 className="animate-spin" size={14} /> : <Upload size={14} />}
        {value ? 'Replace image' : 'Upload image'}
      </Button>
    </div>
  );
};

export default ImageUploader;
